import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How I Built an AI Fitness Coach App | vim-automations',
  description:
    'A deep dive into building a full-stack AI fitness coaching app with n8n, Claude AI, Next.js, Supabase, and gamification.',
};

export default function FitnessCoachAIBlog() {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
        How I Built an AI Fitness Coach App Using n8n + Claude + Next.js
      </h1>
      <p className="text-muted-foreground mb-12 text-sm">February 2026</p>

      {/* The Idea */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Idea</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          What if you could take an automation workflow and turn it into a real,
          polished web app — complete with authentication, gamification,
          animations, and responsive design?
        </p>
        <p className="text-muted-foreground leading-relaxed">
          That&apos;s exactly what I did. I took a simple 5-node n8n workflow (a
          webhook connected to an AI agent) and turned it into a full-stack AI
          Fitness Coach app with a chat interface, a leveling system, daily
          streaks, 12 unlockable badges, animated celebrations, and mobile-first
          UX.
        </p>
      </section>

      {/* The Stack */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Stack</h2>

        <h3 className="text-base font-semibold text-[#e0ff4f] mb-3">
          Backend (n8n workflow on Railway)
        </h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>Webhook node — receives POST requests from the frontend</li>
          <li>LangChain AI Agent — powered by Claude 3.5 Haiku via the Anthropic API</li>
          <li>Response nodes — structured JSON back to the frontend</li>
          <li>Error handling path — graceful fallback when the AI fails</li>
        </ul>

        <h3 className="text-base font-semibold text-[#e0ff4f] mb-3">
          Frontend (Next.js on Vercel)
        </h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
          <li>Next.js 16 (App Router) + React 19</li>
          <li>Tailwind CSS 4 + shadcn/ui component library</li>
          <li>Supabase for authentication + user profiles + badge storage</li>
          <li>Motion.dev (Framer Motion v12) for animations</li>
          <li>Fully responsive — mobile-first with bottom sheets, FABs, and safe-area handling</li>
        </ul>

        <h3 className="text-base font-semibold text-[#e0ff4f] mb-3">
          AI-Powered Development
        </h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Claude Code (CLI agent) — wrote ~95% of the code through conversational development</li>
          <li>n8n MCP Server — inspected, modified, and validated the workflow directly from the IDE</li>
          <li>Custom Skills — n8n expression syntax, node configuration, workflow patterns, frontend design</li>
          <li>GitHub MCP — repo creation and code pushes without leaving the terminal</li>
        </ul>
      </section>

      {/* The Features */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Features</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">AI Chat Interface</h3>
            <p className="text-muted-foreground leading-relaxed">
              The core experience: a real-time chat with your AI fitness coach. You type a question about workouts, nutrition, recovery, or general fitness — and Claude 3.5 Haiku responds with personalized guidance. The AI has guardrails: it won&apos;t diagnose injuries, prescribe medication, or replace a medical professional. Behind the scenes: messages flow from the frontend to n8n webhook to LangChain AI Agent to formatted JSON response and back to the UI. There&apos;s a 30-second timeout with AbortController, client-side rate limiting (10 requests per minute), and a 2,000-character message limit.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Gamification System (V2)</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every message you send earns progress toward the next level. There are 6 Levels (Beginner to Champion), 12 Badges across 4 categories (Milestone, Volume, Consistency, Exploration), Daily Streaks that track consecutive active days, Streak Freezes you earn every 7 days, an XP Multiplier (1.5x at 7-day streak, 2x at 30-day), and Celebration Toasts — animated spring-physics toasts that pop up when you level up, earn a badge, or hit a streak milestone.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Suggestion Cards</h3>
            <p className="text-muted-foreground leading-relaxed">
              New users see 4 clickable cards instead of a blank chat: Workout Plan, Nutrition Tips, Health & Recovery, Getting Started. One tap sends a pre-written question and the conversation begins. Reduces the &quot;what do I even ask?&quot; friction to zero.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Usage Tracker</h3>
            <p className="text-muted-foreground leading-relaxed">
              A stats panel showing days as a member, total active days, and a consistency percentage. Simple, motivating, always visible.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Animations & Polish</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every interaction is animated: messages fade-slide in, progress rings spring-animate, level badges pop on change, celebration toasts bounce with spring physics, and suggestion cards enter with staggered delays. All powered by Motion.dev&apos;s LazyMotion (~4.6KB gzipped) — lightweight enough to not hurt performance.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Text-to-Speech</h3>
            <p className="text-muted-foreground leading-relaxed">
              A TTS button on each AI message lets you listen to the coach&apos;s response. Uses the browser&apos;s native Web Speech API — zero cost, decent quality, and prioritizes natural-sounding voices.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Authentication</h3>
            <p className="text-muted-foreground leading-relaxed">
              Full signup/login flow with Supabase: email + password, email verification, protected routes via middleware, and graceful &quot;demo mode&quot; when Supabase isn&apos;t configured.
            </p>
          </div>
        </div>
      </section>

      {/* The Tools */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          The Tools That Made It Possible
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-1">Claude Code (The Developer)</h3>
            <p className="text-muted-foreground leading-relaxed">
              This was the real star. Claude Code — Anthropic&apos;s CLI agent — wrote virtually all of the code through back-and-forth conversation. I&apos;d describe a feature, it would explore the codebase, write a plan, and implement it across multiple files.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-1">n8n MCP Server (The Backend Bridge)</h3>
            <p className="text-muted-foreground leading-relaxed">
              The n8n MCP server let Claude Code directly inspect and modify the n8n workflow from inside the IDE. No switching tabs. No copy-pasting node configs. A massive time-saver.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-1">Custom Skills (Domain Expertise)</h3>
            <p className="text-muted-foreground leading-relaxed">
              Specialized skills for n8n expression syntax, node configuration patterns, workflow architecture, and frontend design gave Claude Code deep knowledge of n8n&apos;s quirks.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-1">GitHub MCP (Deployment Pipeline)</h3>
            <p className="text-muted-foreground leading-relaxed">
              Repo creation, file pushes, and branch management — all from the conversation. No context-switching to the browser.
            </p>
          </div>
        </div>
      </section>

      {/* The Problems */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          The Problems (And How We Solved Them)
        </h2>
        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">The Mobile Scroll Nightmare</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> On mobile, the chat messages wouldn&apos;t scroll. The page just grew infinitely.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Replaced <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">h-screen</code> with <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">h-dvh</code>, added <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">min-h-0</code> on every flex child in the scroll chain, and set <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">overflow-hidden</code> on the ScrollArea root.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">Tailwind v4 Specificity Gotcha</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">overflow: hidden</code> on html, body wasn&apos;t working — the page still scrolled on mobile.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Moved the rule outside <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">@layer base</code> into the regular stylesheet. Tailwind v4&apos;s layers have lower specificity than utility classes.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">Badge Schema Mismatch</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> Badges weren&apos;t loading from Supabase. The table used UUID IDs but badge IDs are strings like &quot;first_message&quot;.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Changed the column type from UUID to TEXT. Always match your schema to your data model before seeding.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">Stall Detection UX</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> AI responses sometimes take 5-15 seconds. Users thought the app was frozen.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Built a stall detection system — at 8 seconds: &quot;Still thinking...&quot; and at 20 seconds: &quot;Taking longer than usual...&quot;
            </p>
          </div>
        </div>
      </section>

      {/* What We Didn't See Coming */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What We Didn&apos;t See Coming
        </h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Mobile viewport is deceptively complex</span> — dvh vs vh vs svh, safe-area insets, browser chrome interaction. What works on desktop breaks on every phone differently.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Gamification is additive</span> — what started as &quot;show a level number&quot; snowballed into streaks, freezes, 12 badges, toast queues, XP multipliers, and usage analytics.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Animation budget matters</span> — Motion.dev&apos;s LazyMotion with tree-shaking was critical. A full animation library import would&apos;ve added 30KB+ to the bundle.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Demo mode is valuable</span> — making Supabase optional meant faster local development and easier demos. Accidental, but a great architectural choice.</span>
          </li>
        </ul>
      </section>

      {/* How This Scales */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">How This Scales</h2>

        <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Short-Term</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li>API Route Proxy — move the webhook URL server-side for security</li>
          <li>Conversation Memory — n8n&apos;s Window Buffer Memory node for context</li>
          <li>Dark/Light Theme Toggle</li>
        </ul>

        <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Medium-Term</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li>Workout Plan Generator with interactive cards</li>
          <li>Progress Photos & Body Metrics dashboard</li>
          <li>Push Notifications for streak reminders</li>
          <li>Multi-Language Support</li>
        </ul>

        <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Long-Term</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Voice Mode for hands-free gym coaching</li>
          <li>Wearable Integration (Apple Health / Google Fit)</li>
          <li>Community Features — leaderboards, shared badges, challenges</li>
          <li>Multiple AI Coaches with different specializations</li>
          <li>White-Label Template for any n8n-to-app conversion</li>
        </ul>
      </section>

      {/* The Takeaway */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Takeaway</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This project proved something powerful: <span className="font-semibold text-[#e0ff4f]">you can go from an automation workflow to a production web app in days, not months</span>. The combination of n8n for backend orchestration, Claude for AI intelligence, Supabase for persistence, and Claude Code for development created a pipeline where ideas become features almost as fast as you can describe them.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The AI Fitness Coach isn&apos;t just an app — it&apos;s a proof of concept for a new way to build software. Take a workflow. Give it a face. Ship it.
        </p>
      </section>

      <hr className="border-border mb-6" />
      <p className="text-sm text-muted-foreground italic">
        Built with Claude Code, n8n, Next.js, Supabase, and a lot of late-night debugging of CSS flexbox.
      </p>
    </>
  );
}
