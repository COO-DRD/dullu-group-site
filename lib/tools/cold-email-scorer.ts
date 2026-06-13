// Deterministic cold email scorer.
// Scoring benchmarks: Boomerang (word count, subject length), Yesware ("I"-first penalty),
// Outreach (personalization lift), Close.io (single CTA lift).

const SPAM_WORDS = [
  "free", "guaranteed", "risk-free", "no obligation", "winner", "cash prize",
  "make money", "earn money", "double your", "act now", "click here",
  "limited time offer", "special offer", "save big", "order now",
  "urgent", "important message", "congratulations", "once in a lifetime",
  "while supplies last", "100% free", "no credit card required",
];

const WEAK_OPENERS = [
  "i hope this email finds you well",
  "i hope this finds you well",
  "i wanted to reach out",
  "i am reaching out",
  "i'm reaching out",
  "my name is",
  "i am writing to",
  "i'm writing to",
  "just following up",
  "following up on",
  "i just wanted",
  "i am emailing",
  "i'm emailing",
];

const WEAK_CTAS = [
  "let me know if you're interested",
  "let me know if this is something",
  "let me know your thoughts",
  "feel free to reach out",
  "don't hesitate to contact",
  "would love to connect",
  "hope to hear from you",
  "looking forward to hearing from you",
];

export interface CategoryScore {
  name: string;
  score: number;
  max: number;
  flags: string[];
}

export interface ScorerResult {
  totalScore: number;
  grade: string;
  categories: CategoryScore[];
  meta: {
    wordCount: number;
    hasSubject: boolean;
    subjectWordCount: number;
  };
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function getGrade(score: number): string {
  if (score >= 85) return "A";
  if (score >= 72) return "B";
  if (score >= 58) return "C";
  if (score >= 45) return "D";
  return "F";
}

function parseEmail(raw: string): { subject: string; body: string } {
  const trimmed = raw.trim();
  const subjectMatch = trimmed.match(/^subject:\s*(.+?)(?:\r?\n)/i);
  if (subjectMatch) {
    return {
      subject: subjectMatch[1].trim(),
      body: trimmed.slice(subjectMatch[0].length).trim(),
    };
  }
  const lines = trimmed.split(/\r?\n/);
  if (lines.length > 2 && lines[0].length < 100 && !/[.!?]$/.test(lines[0].trim())) {
    return { subject: lines[0].trim(), body: lines.slice(1).join("\n").trim() };
  }
  return { subject: "", body: trimmed };
}

function scoreSubjectLine(subject: string): CategoryScore {
  const flags: string[] = [];
  let score = 20;
  const lower = subject.toLowerCase();

  if (!subject) {
    return { name: "Subject Line", score: 4, max: 20, flags: ["no_subject"] };
  }

  const words = countWords(subject);
  if (words > 15)       { score -= 8; flags.push("subject_too_long"); }
  else if (words > 9)   { score -= 4; flags.push("subject_slightly_long"); }
  else if (words < 2)   { score -= 3; flags.push("subject_too_short"); }

  const upperCount = (subject.match(/[A-Z]/g) || []).length;
  const alphaCount = (subject.match(/[a-zA-Z]/g) || []).length;
  if (alphaCount > 4 && upperCount / alphaCount > 0.6) {
    score -= 5; flags.push("subject_all_caps");
  }

  const foundSpam = SPAM_WORDS.filter(w => lower.includes(w));
  if (foundSpam.length > 0) { score -= Math.min(8, foundSpam.length * 3); flags.push("subject_spam_words"); }

  if ((subject.match(/!/g) || []).length > 1) { score -= 3; flags.push("subject_excessive_punctuation"); }

  if (/\{\{|\[.*?\]/.test(subject)) { score -= 6; flags.push("subject_unfilled_placeholder"); }

  if (flags.length === 0) flags.push("subject_looks_good");

  return { name: "Subject Line", score: clamp(score, 0, 20), max: 20, flags };
}

function scorePersonalization(body: string): CategoryScore {
  const flags: string[] = [];
  let score = 12;
  const lower = body.toLowerCase().trim();

  if (/\{\{|\[name\]|\[first.?name\]|\[company\]/.test(body)) {
    score -= 8; flags.push("unfilled_placeholders");
  }

  const weakOpener = WEAK_OPENERS.find(o => lower.includes(o));
  if (weakOpener) { score -= 4; flags.push("generic_opener"); }

  if (lower.startsWith("i ") || lower.startsWith("i'm ") || lower.startsWith("i am ")) {
    score -= 4; flags.push("starts_with_i");
  }

  if (/\bcompanies like yours\b|\bbusinesses like yours\b/i.test(body)) {
    score -= 3; flags.push("broadcast_language");
  }

  if (/\bi (noticed|saw|read|came across|found|loved|checked out)\b/i.test(body)) {
    score += 3; flags.push("specific_observation");
  }
  if (/\bat\s+[A-Z][a-zA-Z]{2,}|\byour (company|team|product|startup|business|platform|app)\b/i.test(body)) {
    score += 3; flags.push("company_reference");
  }
  if (/recently\s+(launched|raised|hired|published|announced|expanded)/i.test(body)) {
    score += 2; flags.push("timely_reference");
  }

  if (flags.length === 0) flags.push("personalization_looks_good");

  return { name: "Personalization", score: clamp(score, 0, 20), max: 20, flags };
}

function scoreValueProp(body: string): CategoryScore {
  const flags: string[] = [];
  let score = 12;
  const lower = body.toLowerCase();

  const iWeCount = (body.match(/\b(i|we|our|my|i'm|we're|i've|we've)\b/gi) || []).length;
  const youCount = (body.match(/\b(you|your|you're|you've)\b/gi) || []).length;

  if (iWeCount > youCount * 2 && iWeCount > 4) {
    score -= 5; flags.push("too_sender_focused");
  } else if (youCount >= iWeCount) {
    score += 2; flags.push("recipient_focused");
  }

  const benefitWords = ["save", "increase", "reduce", "grow", "improve", "boost", "cut", "generate", "help you", "get more"];
  if (benefitWords.some(w => lower.includes(w))) {
    score += 3; flags.push("benefit_language");
  }

  if (/\d+\s*(%|x\b|hours?|days?|minutes?|clients?|deals?|weeks?)/.test(lower)) {
    score += 2; flags.push("specific_metric");
  }

  const vagueWords = ["solutions", "synergies", "leverage", "innovative", "cutting-edge", "world-class", "best-in-class", "state-of-the-art"];
  if (vagueWords.filter(w => lower.includes(w)).length >= 2) {
    score -= 3; flags.push("vague_language");
  }

  if (!benefitWords.some(w => lower.includes(w)) && iWeCount > youCount) {
    score -= 3; flags.push("no_clear_value");
  }

  return { name: "Value Proposition", score: clamp(score, 0, 20), max: 20, flags };
}

function scoreCTA(body: string): CategoryScore {
  const flags: string[] = [];
  let score = 12;
  const lower = body.toLowerCase();

  const questionCount = (body.match(/\?/g) || []).length;

  if (questionCount === 0) {
    const hasCTA = /\b(reply|respond|book|schedule|sign up|visit|click|download|join|try)\b/i.test(body);
    if (!hasCTA) { score -= 7; flags.push("no_cta"); }
    else          { score -= 2; flags.push("cta_not_question"); }
  } else if (questionCount === 1) {
    score += 4; flags.push("single_question_cta");
  } else if (questionCount === 2) {
    score -= 2; flags.push("multiple_asks");
  } else {
    score -= 5; flags.push("too_many_asks");
  }

  if (WEAK_CTAS.some(c => lower.includes(c))) {
    score -= 4; flags.push("weak_cta");
  }

  if (/\b(15[- ]min|15[- ]minute|30[- ]min|quick call|brief call)\b/i.test(body)) {
    score += 2; flags.push("specific_time_ask");
  }

  const lastChunk = body.trim().slice(-120);
  if (lastChunk.includes("?")) { score += 2; flags.push("ends_with_question"); }

  return { name: "Call to Action", score: clamp(score, 0, 20), max: 20, flags };
}

function scoreLengthTone(body: string): CategoryScore {
  const flags: string[] = [];
  let score = 14;
  const words = countWords(body);

  if (words < 30)       { score -= 6; flags.push("too_short"); }
  else if (words < 50)  { score -= 3; flags.push("slightly_short"); }
  else if (words <= 125){ flags.push("optimal_length"); }
  else if (words <= 200){ score -= 3; flags.push("slightly_long"); }
  else if (words <= 300){ score -= 6; flags.push("too_long"); }
  else                  { score -= 8; flags.push("way_too_long"); }

  const sentences = body.split(/[.!?]+/).filter(s => s.trim().length > 5);
  if (sentences.length > 0) {
    const avgLen = words / sentences.length;
    if (avgLen > 30) { score -= 3; flags.push("long_sentences"); }
  }

  if ((body.match(/!/g) || []).length > 2) { score -= 2; flags.push("too_many_exclamations"); }

  const paragraphs = body.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  if (paragraphs.length === 1 && words > 80) { score -= 2; flags.push("wall_of_text"); }

  return { name: "Length & Tone", score: clamp(score, 0, 20), max: 20, flags };
}

export function scoreEmail(raw: string): ScorerResult {
  const { subject, body } = parseEmail(raw);
  const workingBody = body || raw;

  const categories = [
    scoreSubjectLine(subject),
    scorePersonalization(workingBody),
    scoreValueProp(workingBody),
    scoreCTA(workingBody),
    scoreLengthTone(workingBody),
  ];

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);

  return {
    totalScore,
    grade: getGrade(totalScore),
    categories,
    meta: {
      wordCount: countWords(workingBody),
      hasSubject: !!subject,
      subjectWordCount: subject ? countWords(subject) : 0,
    },
  };
}
