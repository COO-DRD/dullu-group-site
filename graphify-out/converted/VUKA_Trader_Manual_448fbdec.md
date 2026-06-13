<!-- converted from VUKA_Trader_Manual.docx -->

VUKA TRADER
Operations Manual
NAS100 · M5 · Session Sweep + Inverse FVG Strategy

Version 1.0  |  June 2026

1. SYSTEM OVERVIEW

VUKA Trader is a fully automated trading bot for NAS100 (USTEC) on the 5-minute timeframe. It runs on your Linux machine and communicates with MetaTrader 5 through shared files — no MT5 Python API required.

How it works

2. STRATEGY LOGIC

The bot trades one setup: a session liquidity sweep followed by an inverse Fair Value Gap (FVG) re-entry, filtered by a 100-period 4-hour EMA for trend direction.

Step 1 — Session Levels
At the start of each NY session, the bot records the Asian session High and Low (03:00–12:00 UTC+3). These become the liquidity targets.
Step 2 — Sweep Detection
A valid sweep requires a candle wick to exceed the session level by at least 10 points and close back inside. This filters noise and identifies genuine liquidity grabs.
Step 3 — Inverse FVG Entry
After a sweep, the bot scans the last 20 bars for a Fair Value Gap (3-candle imbalance) in the expected direction. When price retraces into the FVG zone and prints a directional confirmation candle (body ≥ 25% of range), the entry fires.
Step 4 — HTF Trend Filter
Before placing the order, the bot checks the 100-period 4H EMA. Bullish trades only when price is above the EMA. Bearish trades only when price is below. Counter-trend setups are skipped automatically.
Step 5 — Trade Management

3. DAILY STARTUP

Requirements before starting
- MT5 is open, logged into your demo account
- USTEC M5 chart is open with bridge_ea attached (smiley face visible top-right)
- Algo Trading is enabled in MT5 toolbar

Start the bot
Open a terminal in the vuka-trader directory and run:
cd /home/dullz/vuka-trader
python main.py

Or to run in the background (bot survives if you close the terminal):
cd /home/dullz/vuka-trader
nohup python main.py > bot.log 2>&1 &
echo $!   # note the PID — you need it to stop the bot later

On startup you should see in trade_log.csv:
STATUS   VUKA Bot live | USTEC M5 | Bridge EA connected
STATUS   New trading day: YYYY-MM-DD
If you see 'Bridge EA not found' instead, the MT5 EA is not writing files — check that bridge_ea is attached and Algo Trading is on.

4. MONITORING

Watch the live log
tail -f /home/dullz/vuka-trader/trade_log.csv

Log event reference

Check bot is still running
ps aux | grep main.py | grep -v grep
If no output, the bot has stopped — restart it using the startup commands above.

Check bridge files are fresh
ls -la ~/.mt5/drive_c/users/dullz/AppData/Roaming/MetaQuotes/Terminal/Common/Files/vuka_tick.json
The timestamp should be within the last 5 seconds during market hours. If it's stale, the MT5 EA has stopped writing — re-attach it to the chart.

5. STOPPING THE BOT

If running in the foreground
Press Ctrl+C in the terminal. The bot logs 'Bot stopped by user' and exits cleanly.
If running in the background
kill <PID>
Replace <PID> with the number printed when you started with nohup. If you lost the PID:
ps aux | grep main.py | grep -v grep
Use the number in the second column.

6. CONFIGURATION REFERENCE

All settings live in config.json. Edit and restart the bot for changes to take effect.


7. MT5 SETUP REFERENCE

Bridge EA location
~/.mt5/drive_c/Program Files/MetaTrader 5/MQL5/Experts/bridge_ea.ex5

Attaching the EA to a chart
- Open MetaTrader 5
- Open a USTEC M5 chart
- In the Navigator panel, expand Expert Advisors
- Double-click bridge_ea (or drag it onto the chart)
- Click OK on the settings dialog — leave InpSymbol = USTEC, InpBars = 5000
- Enable Algo Trading in the top toolbar (the button must be active/highlighted)
- Confirm the EA is running: the chart title changes to 'USTEC,M5: bridge_ea'

Bridge files written by the EA

8. TROUBLESHOOTING


9. KEY PERFORMANCE NUMBERS

From the full 18-month backtest on live broker data (Oct 2024 – May 2026):


Note: past backtest results do not guarantee future performance. Run on demo until you have at least 20 live trades before considering a funded account.


VUKA Trader — Internal Use Only
Dullu Group Digital  |  dr.dullu@outlook.com
| Component | Role |
| --- | --- |
| bridge_ea.mq5 | Runs inside MT5. Writes live bars, tick price, and account data to shared files every 2 seconds. Reads order signals from Python and executes them on the broker. |
| main.py | The Python brain. Reads the shared files, runs the strategy logic, and writes order signals when a valid setup is detected. |
| config.json | All tunable parameters in one place — symbol, risk, session times, EMA period, TP cap, and more. |
| trade_log.csv | Append-only log of every event: sweeps detected, FVGs found, trades entered, skips, and errors. |
| Parameter | Value | Notes |
| --- | --- | --- |
| Stop Loss | Swept level ± 20 pts | Below the Asian Low (bullish) or above the Asian High (bearish) |
| Take Profit | 2R | Capped at 2× the SL distance. No runners — exits cleanly. |
| Risk per trade | 1% | Of current account balance. Lot size auto-calculated. |
| Max trades/day | 1 | One trade per session day. Resets at 03:00 UTC+3. |
| Sessions traded | Asian sweep → NY entry | Sweep detected on Asian session, entry fires during NY. |
| Event | What it means |
| --- | --- |
| STATUS | Bot lifecycle message — startup, new day, shutdown. |
| SWEEP_DETECTED | A valid Asian session level has been swept. The bot is now looking for an FVG. |
| FVG_FOUND | A Fair Value Gap has formed in the expected direction. Watching for price to retrace into the zone. |
| TRADE_ENTERED | Order sent to MT5 and confirmed filled. Entry, SL, TP, and lot size are logged. |
| TRADE_SKIPPED | A setup was found but blocked — reason is logged (HTF filter, invalid SL, margin check, etc.). |
| ERROR | Something went wrong — bridge file missing, lot size failure, order rejected. Check the notes column. |
| Key | Current Value | What it controls |
| --- | --- | --- |
| risk_percent | 1.0 | Percentage of account balance risked per trade. |
| sweep_wick_min_points | 10 | Minimum wick size beyond session level to qualify as a sweep. Higher = fewer but stronger setups. |
| htf_ema_period | 100 | Period of the 4-hour EMA used as trend filter. Higher = slower, more conservative trend gate. |
| max_tp_r | 2.0 | Maximum Take Profit as a multiple of the SL distance. Capped to prevent unrealistic runners. |
| rr_target | 2.0 | Base Risk:Reward target before any extension. |
| sl_buffer_points | 20 | Points added beyond the swept level for the Stop Loss. |
| fvg_entry_buffer_points | 2 | Buffer around FVG zone edges to allow for minor price variation on entry. |
| disabled_sessions | ["london"] | Sessions excluded from sweep detection. London is off — 13% win rate in backtesting. |
| max_trades_per_day | 2 | Hard cap on orders per calendar day. |
| File | Contents | Update frequency |
| --- | --- | --- |
| vuka_bars.csv | Last 5000 M5 OHLC bars | Every new M5 candle (~5 min) |
| vuka_tick.json | Current bid/ask price | Every 2 seconds |
| vuka_account.json | Balance, equity, open positions | Every 5 seconds |
| vuka_signal.json | Order signal written by Python | On trade entry (deleted after EA reads it) |
| vuka_result.json | Order confirmation from EA | After each order attempt |
| Problem | Likely cause | Fix |
| --- | --- | --- |
| 'Bridge EA not found' on startup | EA not attached or Algo Trading off | Re-attach bridge_ea to the USTEC M5 chart and enable Algo Trading. |
| Bot starts but no trades ever | Market outside NY session, or HTF EMA filter rejecting all setups | Check trade_log.csv for TRADE_SKIPPED events and the reason. Normal — bot may go days without a valid setup. |
| 'SL invalid' skip messages | Entry price crossed the swept level before FVG entry | Expected and safe — the guard is working. No action needed. |
| 'HTF EMA filter' skip messages | Setup is counter-trend | Expected — the filter is doing its job. These would have been losing trades. |
| Order placed but not on MT5 | Algo Trading was disabled mid-session | Re-enable Algo Trading. Check vuka_result.json for the error code. |
| Bot crashes with KeyError | Bridge file format changed | Restart MT5, re-attach the EA, then restart the bot. |
| vuka_tick.json not updating | EA stopped (MT5 closed or chart changed) | Re-open USTEC M5 chart and re-attach bridge_ea. |
| Wrong lot size / margin error | Point value misconfigured for broker | Check broker's USTEC contract spec. Edit point_value in risk.py if needed (default: 1.0 per point per lot). |
| Metric | Value |
| --- | --- |
| Starting balance | $10,000 |
| Final balance | $13,846 |
| Total return | +38.5% |
| Total trades | 30  (≈ 2/month) |
| Win rate | 70.0% |
| Profit factor | 4.57 |
| Max drawdown | 2.0% |
| Avg R per trade | +1.10R |