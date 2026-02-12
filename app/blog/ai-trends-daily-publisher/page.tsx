import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Building an AI Trends Daily Publisher with n8n | vim-automations',
  description:
    'How I built an automated daily AI content pipeline that researches trends, generates images, and publishes to Facebook — for $1.40/month.',
};

export default function AITrendsDailyBlog() {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
        How I Built a Daily AI Trends Publisher That Runs for $1.40/Month
      </h1>
      <p className="text-muted-foreground mb-12 text-sm">February 2026</p>

      {/* The Idea */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Idea</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Keeping up with AI news is a full-time job. New models, research papers, product launches, regulatory changes — the landscape moves daily. I wanted a system that would automatically research the latest AI trends, write an engaging social media post, generate a matching image, and publish it to Facebook. Every single day. Without me lifting a finger.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The twist: I wanted a human-in-the-loop approval gate. The system does the heavy lifting, but I get to review and approve before anything goes live. Full automation with a safety net.
        </p>
      </section>

      {/* The Stack */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Stack</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li><span className="font-medium text-foreground">n8n</span> — workflow orchestration engine, self-hosted on Railway</li>
          <li><span className="font-medium text-foreground">Claude Sonnet 4.5</span> — AI content generation (Anthropic API)</li>
          <li><span className="font-medium text-foreground">Claude Haiku 3.5</span> — lightweight formatting tasks</li>
          <li><span className="font-medium text-foreground">Tavily Search API</span> — real-time web research for trending AI topics</li>
          <li><span className="font-medium text-foreground">Pollinations.ai</span> — free AI image generation</li>
          <li><span className="font-medium text-foreground">imgbb</span> — image hosting</li>
          <li><span className="font-medium text-foreground">Gmail</span> — approval gate via OAuth (Send & Wait)</li>
          <li><span className="font-medium text-foreground">IFTTT</span> — bridge to Facebook posting</li>
        </ul>
      </section>

      {/* The Workflow Architecture */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Workflow Architecture</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The workflow runs 14 functional nodes in a linear pipeline, triggered daily at 6AM (Asia/Manila timezone):
        </p>

        <div className="p-4 rounded-lg border border-border bg-card font-mono text-sm text-muted-foreground space-y-1 mb-4">
          <p>Daily 6AM Trigger</p>
          <p className="pl-4">&#x2192; Social Media Content Factory (Claude Sonnet 4.5 + Tavily Search)</p>
          <p className="pl-4">&#x2192; Keep First Result</p>
          <p className="pl-4">&#x2192; Generate Post Image (Pollinations API)</p>
          <p className="pl-4">&#x2192; Upload to imgbb</p>
          <p className="pl-4">&#x2192; Collect Post Data</p>
          <p className="pl-4">&#x2192; Prepare Content Review Email</p>
          <p className="pl-4">&#x2192; Gmail: Send Approval Email (12hr timeout)</p>
          <p className="pl-4">&#x2192; Is Content Approved?</p>
          <p className="pl-4">&#x2192; Merge Approval with Data</p>
          <p className="pl-4">&#x2192; Sanitize Text for IFTTT</p>
          <p className="pl-4">&#x2192; IFTTT Facebook Post (HTTP Request)</p>
          <p className="pl-4">&#x2192; Prepare Results Email</p>
          <p className="pl-4">&#x2192; Gmail: Send Results Summary</p>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          The &quot;Social Media Content Factory&quot; is an n8n AI Agent node that uses Claude Sonnet 4.5 with a Tavily Search tool and a Structured Output Parser. It searches the web for the day&apos;s biggest AI story, then generates a structured JSON response with the post content, hashtags, and a call-to-action — all in one shot.
        </p>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">Key Features</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">AI-Powered Research</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tavily Search API (advanced depth mode) scans the web for the latest AI developments. The AI agent picks the most compelling story and writes a hook-style post — short, punchy, optimized for social media engagement. The structured output parser ensures consistent JSON format every time.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Automated Image Generation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Each post gets a unique AI-generated image from Pollinations.ai. The image prompt is derived from the post content, creating visually relevant artwork. Images are uploaded to imgbb for persistent hosting with a stable URL.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Human-in-the-Loop Approval</h3>
            <p className="text-muted-foreground leading-relaxed">
              Before anything publishes, I get an email with the full post preview — text, image, hashtags, and CTA. I can approve or reject with a single click. The workflow waits up to 12 hours for a response. This ensures quality control while keeping the process nearly hands-free.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Facebook Publishing via IFTTT</h3>
            <p className="text-muted-foreground leading-relaxed">
              Once approved, a Code node sanitizes the text (escaping special characters for IFTTT&apos;s webhook format), then triggers an IFTTT applet that posts to a Facebook page. A results summary email confirms the publish status.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Analysis */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">Cost Analysis</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          One of the most surprising aspects: the entire pipeline costs about <span className="font-semibold text-[#e0ff4f]">$1.40/month</span> to run daily.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-foreground font-semibold">Component</th>
                <th className="text-right py-2 pr-4 text-foreground font-semibold">Per Run</th>
                <th className="text-right py-2 text-foreground font-semibold">Monthly</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Content Factory (Claude Sonnet 4.5)</td>
                <td className="text-right py-2 pr-4">~$0.02</td>
                <td className="text-right py-2">~$0.60</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Email Formatter (Claude Sonnet 4.5)</td>
                <td className="text-right py-2 pr-4">~$0.014</td>
                <td className="text-right py-2">~$0.42</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Results Formatter (Claude Haiku 3.5)</td>
                <td className="text-right py-2 pr-4">~$0.003</td>
                <td className="text-right py-2">~$0.08</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Tavily Search (advanced)</td>
                <td className="text-right py-2 pr-4">~$0.01</td>
                <td className="text-right py-2">~$0.30</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Pollinations / imgbb / IFTTT</td>
                <td className="text-right py-2 pr-4">Free</td>
                <td className="text-right py-2">$0</td>
              </tr>
              <tr className="font-semibold text-foreground">
                <td className="py-2 pr-4">Total</td>
                <td className="text-right py-2 pr-4">~$0.047</td>
                <td className="text-right py-2 text-[#e0ff4f]">~$1.40</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          With optimization (replacing LLM email formatters with Code nodes, downgrading to Haiku for content generation, switching to basic Tavily search), this could drop to <span className="font-semibold text-foreground">~$0.30/month</span> — a 79% reduction.
        </p>
      </section>

      {/* Problems & Solutions */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Problems & Solutions
        </h2>
        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">No Rejection Handling</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> If content was rejected or the 12-hour approval timeout expired, the workflow silently died. No notification, no logging, no retry.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Connected the FALSE output of the approval check to a notification node that emails a rejection/timeout summary with the original content for reference.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">API Keys Hardcoded in Workflow</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> Tavily, imgbb, Pollinations, and IFTTT keys were hardcoded directly in node parameters — visible in exports and workflow JSON.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Migrated all keys to n8n credentials and environment variables. Redacted keys from snapshot files.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">Gmail OAuth Token Expiry</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> OAuth tokens expire periodically. When they do, both the approval gate AND results notification break silently. The workflow fails every day until manually refreshed.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Added error handling around Gmail nodes with alerting on auth failures.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">Image Generation Has No Fallback</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> Pollinations is a free service with no SLA. If it fails, the imgbb upload gets empty data, which breaks the entire downstream chain.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Added an IF node after image generation to check for binary data. On failure, it falls back to a static placeholder image URL.
            </p>
          </div>
        </div>
      </section>

      {/* Optimization Opportunities */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">Optimization Opportunities</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The workflow works, but there&apos;s significant room for optimization:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">1.</span>
            <span><span className="font-medium text-foreground">Replace LLM email formatters with Code nodes</span> — the email templates are deterministic HTML. Using Claude Sonnet for string interpolation is wasteful ($0.50/month saved).</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">2.</span>
            <span><span className="font-medium text-foreground">Downgrade Content Factory to Haiku</span> — writing a 50-80 word hook post doesn&apos;t require Sonnet-level reasoning ($0.45/month saved).</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">3.</span>
            <span><span className="font-medium text-foreground">Switch Tavily to basic search</span> — advanced depth is overkill for finding trending AI news ($0.15/month saved).</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">4.</span>
            <span><span className="font-medium text-foreground">Cap max tokens</span> — the content factory has a 4,096 token limit but outputs ~150 tokens. Reducing prevents runaway costs if the LLM goes off-script.</span>
          </li>
        </ul>
      </section>

      {/* What I Learned */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">What I Learned</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Human-in-the-loop is non-negotiable for public content</span> — AI-generated posts can be subtly wrong, tone-deaf, or reference outdated information. The approval gate catches these before they go live.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Free-tier services need fallbacks</span> — Pollinations and imgbb have no SLA. Build your pipeline assuming they&apos;ll fail sometimes.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">LLMs are overkill for deterministic tasks</span> — if the output format is always the same, use a Code node. LLMs add cost, latency, and non-determinism where none is needed.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Token costs are predictable</span> — once you measure a few runs, monthly costs become very accurate. This workflow costs less than a cup of coffee per month.</span>
          </li>
        </ul>
      </section>

      {/* The Takeaway */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Takeaway</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This project shows that <span className="font-semibold text-[#e0ff4f]">sophisticated content automation doesn&apos;t have to be expensive or complex</span>. A 14-node n8n workflow, a few API integrations, and a human approval gate create a daily content machine that runs for less than the cost of a monthly parking meter.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The n8n + AI combination is powerful: you get visual workflow design, built-in error handling, credential management, and seamless LLM integration — all without writing a traditional backend. This is automation that feels like building with Lego blocks.
        </p>
      </section>

      <hr className="border-border mb-6" />
      <p className="text-sm text-muted-foreground italic">
        Built with n8n, Claude AI (Anthropic API), Tavily, Pollinations.ai, and IFTTT. Orchestrated by Claude Code.
      </p>
    </>
  );
}
