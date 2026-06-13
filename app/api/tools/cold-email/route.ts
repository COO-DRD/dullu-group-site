import { NextRequest, NextResponse } from "next/server";
import { scoreEmail, type ScorerResult } from "@/lib/tools/cold-email-scorer";
import { rateLimit, getIp } from "@/lib/rate-limit";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// Fallback issue/fix copy keyed by flag — used when Groq is unavailable
const FALLBACKS: Record<string, { issue: string; fix: string }> = {
  no_subject:                  { issue: "No subject line detected.", fix: 'Add one. Keep it under 9 words — a question works well: "Quick question about [Company]?"' },
  subject_too_long:            { issue: "Subject is over 15 words — most clients truncate it and open rates drop.", fix: "Cut to 5–9 words. Lead with the most interesting part, remove filler." },
  subject_slightly_long:       { issue: "Subject is over 9 words — past the sweet spot.", fix: "Trim to under 9 words. Boomerang data shows this lifts open rates 36%." },
  subject_too_short:           { issue: "Very short subject lines can feel cryptic or spammy.", fix: "Aim for 3–9 words to give context without revealing everything." },
  subject_all_caps:            { issue: "All-caps triggers spam filters and looks like a scam.", fix: "Use sentence case or title case." },
  subject_spam_words:          { issue: "Contains words that trigger spam filters.", fix: 'Remove sales-y words ("free", "guaranteed", etc.). Write it like a colleague would.' },
  subject_unfilled_placeholder:{ issue: "Has unfilled template placeholders — looks careless.", fix: "Fill in all {{variables}} before sending. Check twice." },
  subject_excessive_punctuation:{ issue: "Multiple exclamation marks in the subject reduce B2B credibility.", fix: "Use one at most, or none." },
  subject_looks_good:          { issue: "Subject line looks solid.", fix: "Try A/B testing a question variant for even higher open rates." },
  unfilled_placeholders:       { issue: "Email contains unfilled template placeholders — an instant trust-killer.", fix: "Replace all {{variables}} with real, specific information before sending." },
  generic_opener:              { issue: 'Opens with a phrase everyone uses ("Hope this finds you well", "I wanted to reach out"). Signals mass outreach immediately.', fix: "Cut the opener. Your second sentence is almost always better — start there." },
  starts_with_i:               { issue: '"I" as the first word makes the email about you before you\'ve earned attention. Yesware: "I"-first emails get 20% fewer replies.', fix: 'Lead with something about them or a relevant observation: "Saw you just hired a sales team..." beats "I help sales teams..."' },
  broadcast_language:          { issue: '"Companies like yours" reveals it\'s a blast, not a 1:1 message.', fix: "Name their company specifically. Write to one person." },
  specific_observation:        { issue: "Good — you referenced something specific.", fix: "Tie the observation directly to the problem you solve." },
  company_reference:           { issue: "Good — you mentioned their company or team.", fix: "Go one level deeper: reference a specific challenge that company likely faces." },
  personalization_looks_good:  { issue: "Personalization is solid.", fix: "Add one more specific detail — a recent hire, launch, or post they published." },
  too_sender_focused:          { issue: 'Too many "I/we" sentences — the email is about you, not them.', fix: 'Flip the ratio. Change "We help companies..." to "You\'ll be able to..." For every sentence about you, write two about them.' },
  recipient_focused:           { issue: "Good — focused on them, not you.", fix: "Strengthen it with a specific outcome and a number if you have one." },
  benefit_language:            { issue: "Good — talking about benefits, not just features.", fix: "Add a specific metric or proof point to make the benefit credible." },
  specific_metric:             { issue: "Good — you included a specific number.", fix: "Make sure the metric is relevant to their role. A VP Sales cares about pipeline, not feature counts." },
  vague_language:              { issue: 'Buzzwords like "innovative solutions" say nothing and erode trust.', fix: "Replace every buzzword with a concrete claim. 'Innovative' → 'Used by 200 sales teams to close 30% faster'." },
  no_clear_value:              { issue: "No clear answer to 'what's in it for me?' — the only question your prospect is asking.", fix: "Add one sentence that completes: 'If you [action], you'll [specific outcome] in [timeframe]'." },
  no_cta:                      { issue: "No clear call to action — the prospect doesn't know what to do next.", fix: 'End with one specific question: "Would you be open to a 15-minute call this week?"' },
  cta_not_question:            { issue: "Has an action but not framed as a question — harder to respond to.", fix: 'Turn it into a question. "Book a call here" → "Would you be open to a 15-minute call?"' },
  single_question_cta:         { issue: "Good — single clear ask.", fix: "Make sure it's easy to say yes or no to. Avoid open-ended questions as CTAs." },
  multiple_asks:               { issue: "Two asks split the prospect's attention.", fix: "Pick one. The second ask goes in a follow-up." },
  too_many_asks:               { issue: "Multiple asks usually get zero response.", fix: "Delete everything except your single best ask. One CTA doubles reply rates." },
  weak_cta:                    { issue: '"Let me know if you\'re interested" is a passive CTA that rarely gets a reply.', fix: 'Ask a direct yes/no question: "Would you be open to a 15-minute call this week?"' },
  specific_time_ask:           { issue: "Good — you asked for a specific, low-commitment time.", fix: "Consider adding a Calendly link to remove scheduling back-and-forth." },
  ends_with_question:          { issue: "Good — ends with a question.", fix: "Make sure it's a yes/no question, not an open-ended one." },
  too_short:                   { issue: "Too short — doesn't give the prospect enough context to make a decision.", fix: "Add one sentence on why you're reaching out to them specifically, and one on the outcome they'd get." },
  slightly_short:              { issue: "Slightly short — may feel abrupt.", fix: "Add 1–2 sentences of context. Not more." },
  optimal_length:              { issue: "Length is in the optimal 50–125 word range.", fix: "Keep it here. Resist the urge to add more." },
  slightly_long:               { issue: "Slightly over the 125-word sweet spot.", fix: "Cut 20–30 words. Remove any sentence that's about you rather than them." },
  too_long:                    { issue: "Over 200 words. Most prospects won't finish reading it.", fix: "Aim for under 125 words. Cut the backstory. Every sentence should earn its place." },
  way_too_long:                { issue: "Way too long for a cold email.", fix: "Rewrite targeting 75–100 words. Keep: hook, value prop, one CTA. Cut everything else." },
  long_sentences:              { issue: "Sentences are too long — reduces scannability on mobile.", fix: "Break any sentence over 25 words into two. Short sentences get read." },
  wall_of_text:                { issue: "One big block of text — hard to scan.", fix: "Add a line break every 2–3 sentences. White space makes emails feel shorter." },
  too_many_exclamations:       { issue: "Multiple exclamation marks lower B2B credibility.", fix: "Use one at most, or none. Let the words carry the energy." },
};

type FinalResult = {
  score: number;
  grade: string;
  summary: string;
  categories: Array<{ name: string; score: number; max: number; issue: string; fix: string }>;
  quick_wins: string[];
};

function buildFallbackResult(scored: ScorerResult): FinalResult {
  const categories = scored.categories.map(cat => {
    const primaryFlag = cat.flags.find(f => FALLBACKS[f] && !f.includes("_good") && !f.includes("looks_good") && !f.includes("reference") && !f.includes("observation") && !f.includes("recipient_focused") && !f.includes("benefit_language") && !f.includes("specific_metric") && !f.includes("single_question") && !f.includes("specific_time") && !f.includes("ends_with") && !f.includes("optimal"));
    const flag = primaryFlag ?? cat.flags[0];
    const fb = (flag && FALLBACKS[flag]) ? FALLBACKS[flag] : { issue: "Review this section.", fix: "See general cold email best practices." };
    return { name: cat.name, score: cat.score, max: cat.max, ...fb };
  });

  const quick_wins: string[] = [];
  for (const cat of scored.categories) {
    if (cat.score < 12 && quick_wins.length < 3) {
      const flag = cat.flags.find(f => FALLBACKS[f] && !f.includes("_good") && !f.includes("looks_good"));
      if (flag && FALLBACKS[flag]) {
        quick_wins.push(FALLBACKS[flag].fix.split(".")[0].trim());
      }
    }
  }

  const summary =
    scored.totalScore >= 80 ? "Solid email — a few tweaks will push the reply rate up." :
    scored.totalScore >= 60 ? "Decent foundation, but key issues are hurting your reply rate." :
    scored.totalScore >= 45 ? "Several problems are costing you replies — worth a significant rewrite." :
    "High risk of being ignored. Needs a full rethink.";

  return { score: scored.totalScore, grade: scored.grade, summary, categories, quick_wins: quick_wins.slice(0, 3) };
}

async function callGroq(scored: ScorerResult, emailText: string): Promise<FinalResult | null> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;

  const categoryContext = scored.categories.map(cat => {
    const bad = cat.flags.filter(f => !f.includes("_good") && !f.includes("looks_good") && !f.includes("_reference") && !f.includes("_observation") && !f.includes("recipient_focused") && !f.includes("benefit_language") && !f.includes("specific_metric") && !f.includes("single_question") && !f.includes("specific_time") && !f.includes("ends_with") && !f.includes("optimal"));
    const good = cat.flags.filter(f => !bad.includes(f));
    return `${cat.name} (${cat.score}/${cat.max})${bad.length ? " — issues: " + bad.join(", ") : ""}${good.length ? " — positives: " + good.join(", ") : ""}`;
  }).join("\n");

  const system = `You are a cold email coach. Give direct, specific, actionable feedback on this email.

Return ONLY valid JSON in this exact structure:
{
  "summary": "<one brutal honest sentence, max 12 words>",
  "categories": {
    "Subject Line": { "issue": "<1-2 sentences specific to this email>", "fix": "<1-2 sentences, concrete action>" },
    "Personalization": { "issue": "...", "fix": "..." },
    "Value Proposition": { "issue": "...", "fix": "..." },
    "Call to Action": { "issue": "...", "fix": "..." },
    "Length & Tone": { "issue": "...", "fix": "..." }
  },
  "quick_wins": ["<under 12 words, do-in-5-minutes fix>", "<fix>", "<fix>"]
}

Rules: Be specific to this email, not generic. Never say "consider" — say what to do. If a category scores 15+/20, acknowledge what works. Quick wins must be fixable in under 5 minutes.`;

  const userMsg = `Email:\n"""\n${emailText.slice(0, 1500)}\n"""\n\nAnalysis:\n${categoryContext}`;

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userMsg },
        ],
        response_format: { type: "json_object" },
        max_tokens: 900,
        temperature: 0.3,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content) as {
      summary?: string;
      categories?: Record<string, { issue?: string; fix?: string }>;
      quick_wins?: string[];
    };

    return {
      score: scored.totalScore,
      grade: scored.grade,
      summary: parsed.summary ?? buildFallbackResult(scored).summary,
      categories: scored.categories.map(cat => ({
        name: cat.name,
        score: cat.score,
        max: cat.max,
        issue: parsed.categories?.[cat.name]?.issue ?? "",
        fix:   parsed.categories?.[cat.name]?.fix   ?? "",
      })),
      quick_wins: Array.isArray(parsed.quick_wins) ? parsed.quick_wins.slice(0, 3) : [],
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { ok } = rateLimit(`cold-email:${ip}`, 5, 60 * 60 * 1000);
  if (!ok) {
    return NextResponse.json({ error: "Too many checks. Try again in an hour." }, { status: 429 });
  }

  const body = await req.json().catch(() => null) as { email?: unknown; audience?: unknown } | null;
  if (!body?.email || typeof body.email !== "string") {
    return NextResponse.json({ error: "Email text is required." }, { status: 400 });
  }

  const emailText = body.email.trim();
  if (emailText.length < 20)   return NextResponse.json({ error: "Email is too short to analyse." }, { status: 400 });
  if (emailText.length > 5000) return NextResponse.json({ error: "Email is too long. Paste just the cold email body." }, { status: 400 });

  const scored = scoreEmail(emailText);
  const result = (await callGroq(scored, emailText)) ?? buildFallbackResult(scored);

  return NextResponse.json(result);
}
