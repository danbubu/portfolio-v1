# Portfolio Redesign — Cursor Prompt

**Site:** danielmawuena.me (SvelteKit + Tailwind + GSAP + Firebase)

## Context

This is a working portfolio site with a Home/Work/Experience/Contact structure and a Builder/Thinker toggle on the Work section (Builder = project + tech stack view, Thinker = engineering philosophy view). The redesign below adds four things: a name animation, a real multi-project showcase, deeper Thinker-mode content, and one new Experience entry. I want you to treat this as a creative brief, not a spec — where I've left something open, use your judgment and make it feel premium and cohesive with the existing dark navy / electric blue aesthetic.

---

## 1. Name scramble/decode animation ("Daniel Bubu Mawuena")

On load (or on a scroll/hover trigger — your call on what feels best), the name in the top-left nav should decode itself letter by letter, like a hacker/matrix decrypt effect:

- Each letter position rapidly cycles through random characters (letters + numbers)
- While cycling, the character is rendered in **blue** (accent color already used on the site)
- Once a letter locks into its correct final character, it snaps to **white** and stops cycling
- Letters resolve **in sequence, left to right** — D locks first, then A, then N, then I, then E, then L, and so on through the full name — not all at once
- Keep it snappy (roughly under 1.5–2s total), not a slow crawl

You have creative freedom on: the exact scramble character set, timing/easing curve, whether it replays on route change, and whether it's built with GSAP text-scramble utilities or a custom implementation.

## 2. Work section — real multi-project showcase

Right now the featured "Builder" card only shows one project (the Airdrop Tracker / "The UX Architect", DeFi wallet tracker, 100+ active users). I've actually shipped three more since then, and all four are live. Replace the single static card with a **carousel or bento-style rotation** (you decide which reads better with the existing card layout) covering:

1. **Airdrop Tracker** — "The UX Architect." Full-stack crypto tracking solution abstracting multi-wallet complexity for easy payment/subscription models. DeFi, 140+ active users.
2. **Intervue-AI** — rigorous mock-interview simulator built to KNUST academic standard. Practice aloud, get scored in real time, know what to sharpen before an NSS or internship interview counts. Live: https://intervue-ai-gilt.vercel.app/
3. **NabbyCare+** — private mental-health self-screening tool built on clinically validated screening instruments. Not diagnostic — gives clear feedback and a visual "CareMap" of responses; a thoughtful first conversation with yourself. Live: https://nabby-care-7ymj.vercel.app/
4. **The Control Room** — invite-only esports tournament management platform. Positioning leans into a "precision / legacy / order" system-protocol voice — it tracks match results, scores, and championship history with zero tolerance for disputed records. Live: https://thecontrolroom.vercel.app/

Each card should carry a **"View Live Project"** link out to its URL (matching the existing link style already used on the Airdrop Tracker card). Mark all four as "Live" status rather than "Building."

You have creative freedom on: carousel mechanics (swipe/dots/arrows), how much copy to show per card at rest vs. expanded, and whether to pull in short tech-stack chips per project.

## 3. Thinker mode — per-project depth

Right now flipping to "Thinker" swaps in two static boxes: Philosophy and Engineering Approach. Turn this into a **carousel synced to (or independent of, your call) the Work carousel**, where each project gets its own short reflection covering:

- **Inspiration** — why this project exists / what problem or itch prompted it
- **Engineering approach** — the core technical decision or tradeoff that defined how it was built

I haven't drafted this copy yet — for now, use the project descriptions above as raw material and draft a first pass per project; I'll refine the actual wording after. The goal is that Thinker mode stops feeling like a generic philosophy statement and starts feeling like a per-project engineering journal.

## 4. Experience section — new entry

Add a new entry (most recent, so likely at the top of the timeline) for current work:

- **Role:** QA / Frontend Development
- **Company:** RPL Technologies
- **What it covers:** QA testing on an Expense Automation solution built for Fidelity Bank Ghana, plus frontend development work on a project called **Kemy**

Match the existing Experience card format (role, company, location if relevant, bullet points, tech tags) used for the other entries like the Adroit 360 internships.

---

## Open to your judgment

Anywhere this brief is vague — animation timing, carousel UX pattern, exact copy, how Thinker-mode transitions relate to Work-mode carousel position — take the creative lead. The bar is: it should feel like an intentional, cohesive upgrade to an already sharp site, not a bolted-on feature.
