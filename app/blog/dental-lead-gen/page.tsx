import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How I Built an AI Dental Receptionist with n8n | vim-automations',
  description:
    'A deep dive into building a 3-workflow AI receptionist that qualifies dental leads, scores them, books appointments to Google Calendar, and sends automated emails — no human receptionist needed.',
};

export default function DentalLeadGenBlog() {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#e0ff4f] to-[#a0c830] bg-clip-text text-transparent">
        AI Dental Receptionist: Qualify Leads, Book Appointments, and Send Emails — Fully Automated
      </h1>
      <p className="text-muted-foreground mb-12 text-sm">February 2026</p>

      {/* The Idea */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Idea</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Dental clinics lose leads every day — not because the service is bad, but because
          nobody responds fast enough. A potential patient fills out a form or starts a chat
          at 9PM on a Sunday, and by Monday morning they&apos;ve already booked with a competitor.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The solution: an AI receptionist that&apos;s available 24/7. It chats with the patient,
          qualifies their intent, scores the lead on a 1–10 scale, and based on that score —
          either auto-books a calendar appointment, alerts staff for follow-up, or quietly logs
          them for later. No human required until it&apos;s time to actually see the patient.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I built this entirely in n8n using 3 interconnected workflows. From first chat message
          to confirmed appointment in Google Calendar, with a CRM row logged in Google Sheets
          and confirmation emails sent — all automated.
        </p>
      </section>

      {/* The Stack */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Stack</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li><span className="font-medium text-foreground">n8n</span> — workflow orchestration, self-hosted on Railway</li>
          <li><span className="font-medium text-foreground">Claude Sonnet 4.6</span> — AI receptionist brain (Anthropic API)</li>
          <li><span className="font-medium text-foreground">Google Calendar</span> — availability checking and appointment creation</li>
          <li><span className="font-medium text-foreground">Google Sheets</span> — CRM with 18-column lead tracking</li>
          <li><span className="font-medium text-foreground">Gmail</span> — patient confirmation emails + staff alert emails</li>
          <li><span className="font-medium text-foreground">Google Cloud Console</span> — OAuth 2.0 client for Calendar/Sheets/Gmail</li>
        </ul>
      </section>

      {/* Architecture */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">The 3-Workflow Architecture</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Rather than one monolithic workflow, I split the system into 3 focused workflows
          that call each other. This keeps each workflow readable, testable, and independently
          deployable.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Workflow 1 — AI Receptionist (Chat)</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The patient-facing interface. Uses n8n&apos;s Chat Trigger so it can be embedded
              on any website. A Claude Sonnet 4.6 AI Agent node plays the role of a friendly
              dental receptionist — collecting the patient&apos;s name, contact details, treatment
              interest, insurance status, and urgency. Once enough information is gathered, it
              calls Workflow 2 to check availability or book. A memory buffer keeps 10 messages
              of context so the conversation feels natural.
            </p>
            <div className="p-4 rounded-lg border border-border bg-card font-mono text-sm text-muted-foreground space-y-1">
              <p>Chat Trigger</p>
              <p className="pl-4">&#x2192; AI Receptionist (Claude Sonnet 4.6 + memory)</p>
              <p className="pl-4">&#x2192; Execute Sub-workflow (check availability / book)</p>
              <p className="pl-4">&#x2192; Respond to Chat</p>
              <p className="pl-4">&#x2192; Format Chat Error (fallback)</p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Workflow 2 — Booking & Notifications (Sub-workflow)</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The operations engine. Called by both the chat and form workflows. A Route Action
              switch directs the flow to one of three paths: check calendar availability, create
              a booking, or send warm-lead notifications. This workflow handles all the Google
              integrations and email sending in one place.
            </p>
            <div className="p-4 rounded-lg border border-border bg-card font-mono text-sm text-muted-foreground space-y-1">
              <p>When Called &#x2192; Config &#x2192; Route Action</p>
              <p className="pl-4">&#x2192; [check] Get Calendar Events &#x2192; Format Available Slots</p>
              <p className="pl-4">&#x2192; [book]  Book Appointment &#x2192; Log to CRM &#x2192; Email Patient + Email Staff</p>
              <p className="pl-4">&#x2192; [warm]  Email Patient Acknowledgment + Email Staff Warm Lead</p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Workflow 3 — Form Intake (Webhook)</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The website form handler. Catches POST submissions from a contact form, runs them
              through anti-abuse checks, sanitizes the input, scores the lead, and routes them
              appropriately — auto-booking hot leads, alerting staff for warm leads, and silently
              logging cold leads.
            </p>
            <div className="p-4 rounded-lg border border-border bg-card font-mono text-sm text-muted-foreground space-y-1">
              <p>Form Submission &#x2192; Anti-Abuse Check &#x2192; Config</p>
              <p className="pl-4">&#x2192; Normalize Form Data &#x2192; Validate &amp; Sanitize</p>
              <p className="pl-4">&#x2192; Lead Score &#x2192; Route by Score</p>
              <p className="pl-4">&#x2192; [Hot 7+]   Execute Booking Sub-workflow</p>
              <p className="pl-4">&#x2192; [Warm 4-6] Log to CRM + Execute Notification Sub-workflow</p>
              <p className="pl-4">&#x2192; [Cold 1-3] Log to CRM only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">Key Features</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">AI Lead Scoring (1–10)</h3>
            <p className="text-muted-foreground leading-relaxed">
              A JavaScript Code node scores every lead across five dimensions: new vs. returning
              patient, treatment value (cosmetic scores higher than checkup), insurance coverage,
              urgency (emergency = maximum score), and contact completeness. The composite score
              drives all routing decisions — hot leads (7+) book automatically, warm leads (4–6)
              get a staff alert for manual follow-up, cold leads (1–3) are logged quietly.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Google Calendar Integration</h3>
            <p className="text-muted-foreground leading-relaxed">
              The availability check fetches calendar events for the next 7 days and calculates
              open 1-hour slots between 9AM and 5PM (Asia/Manila timezone), skipping lunch
              (12–1PM) and existing bookings. The AI presents these slots to the patient in
              natural language. On confirmation, a calendar event is created with the patient&apos;s
              name, email, and treatment details — and the event ID is logged to the CRM for
              cross-referencing.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Google Sheets CRM</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every lead — whether from chat or form — gets a row in the CRM spreadsheet with
              18 columns: timestamp, source channel, UTM parameters, patient name, phone, email,
              insurance, treatment interest, new patient flag, urgency, lead score, status,
              appointment date/time, calendar event ID, and notes. This gives the dental practice
              a complete picture of every inbound lead with zero manual data entry.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Automated Email Notifications</h3>
            <p className="text-muted-foreground leading-relaxed">
              Four email templates cover every scenario. Booked patients get a confirmation with
              their appointment date and time in Philippine Time (PHT). Staff get an alert for
              every hot booking with the patient&apos;s full details. Warm leads trigger a separate
              staff alert and a patient acknowledgment (&quot;we&apos;ll be in touch&quot; message). All
              sent via Gmail OAuth — no third-party email service needed.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Security & Anti-Abuse</h3>
            <p className="text-muted-foreground leading-relaxed">
              The form intake workflow runs three layers of protection before any data reaches
              the AI or calendar. An Anti-Abuse Check node validates Content-Type, rejects empty
              bodies, checks for honeypot fields, and enforces a 10KB payload size limit.
              A Validate &amp; Sanitize node strips HTML tags, truncates fields to 200 characters,
              validates email format with regex, enforces phone number length (7–15 digits), and
              checks required fields. A Config node centralizes secrets (spreadsheet IDs, staff
              email) so they&apos;re never hardcoded in individual nodes.
            </p>
          </div>
        </div>
      </section>

      {/* Problems & Solutions */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">Problems & Solutions</h2>
        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">Empty Calendar Broke the Workflow</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> When the Google Calendar had zero events, n8n skipped every node downstream of the Calendar fetch — including the Format Available Slots node. The sub-workflow returned nothing.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Added <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">alwaysOutputData: true</code> on the Get Calendar Events node. This forces n8n to pass an empty item downstream so the Format Slots node always runs and can return &quot;no existing bookings — all slots open.&quot;
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">Google Calendar Rejected Attendees</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> The Book Appointment node was failing with a type error. The Google Calendar node expects <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">attendees</code> as an array, but the expression was passing a plain string (the email address).
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Wrapped the email in an array: <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">{'={{ [$json.email] }}'}</code>. Also added the required <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">summary</code> field (event title) which the node needs but doesn&apos;t shout about.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">CRM Rows Were Empty</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> After a successful booking, the Google Sheets Log to CRM node was configured with <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">mappingMode: &quot;defineBelow&quot;</code> but an empty <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">value: {'{}'}</code>. Every row was blank.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Added the full 17-column mapping explicitly, pulling patient data from the originating trigger node and the calendar event ID from the booking response.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">Timezone Confusion</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> Calendar slots were showing in UTC. Patients would see &quot;2:00 AM&quot; when the actual appointment was 10:00 AM in the Philippines.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Set workflow timezone to <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">Asia/Manila</code> in all 3 workflows. Rewrote all date/time Code nodes to use n8n&apos;s built-in <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">$now</code> DateTime object (avoiding the word &quot;luxon&quot; in code — Railway does a string scan that blocks nodes containing it). All time displays now show &quot;(PHT)&quot; explicitly.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-base font-semibold text-foreground mb-2">n8n Validator Blocking Active Workflow Updates</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Problem:</span> Using <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">n8n_update_partial_workflow</code> on an active workflow triggered strict publish validation, which failed on pre-existing false-positive errors (JS <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">{'}}'}</code> parsed as expression syntax, Google nodes with &quot;Invalid operation&quot; due to typeVersion).
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Fix:</span> Switched to <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">n8n_update_full_workflow</code> with the <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">name</code> param — bypasses strict publish validation while still saving the workflow correctly.
            </p>
          </div>
        </div>
      </section>

      {/* Error Handling Strategy */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">Error Handling Strategy</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Production workflows need to fail gracefully. Here&apos;s how errors are handled
          at each critical point:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">AI Agent error</span> — <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">onError: continueErrorOutput</code> routes to a &quot;Format Chat Error&quot; node that returns a friendly message to the patient instead of a raw crash.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Calendar API failure</span> — Calendar Error Response Set node returns a structured error so the AI can tell the patient &quot;I couldn&apos;t check availability right now, please try again.&quot;</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Booking failure</span> — Booking Error Response Set node catches it so the AI can ask the patient to pick a different time.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">CRM write failure</span> — CRM Log Error node silently logs the issue and still lets the staff alert email go through — no appointment data is lost.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Gmail failures</span> — All 4 email nodes have <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">continueOnFail</code> so an email error doesn&apos;t cancel an already-booked appointment.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Sheets nodes</span> — Use <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">continueRegularOutput</code> so downstream processing continues even if logging fails.</span>
          </li>
        </ul>
      </section>

      {/* What I Learned */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">What I Learned</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Sub-workflows are worth the setup cost</span> — splitting booking logic into a sub-workflow means both the chat and form can reuse the same calendar/email code. Any fix in one place fixes both channels.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Google OAuth is the hardest part</span> — setting up the OAuth client in Google Cloud Console, wiring the correct redirect URIs, and getting Calendar + Sheets + Gmail all under one credential took longer than building the actual workflow logic.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">n8n skips nodes on empty data by default</span> — this catches you off guard with external APIs. Any node calling a service that could return zero results needs <code className="text-[#e0ff4f] text-xs bg-[#e0ff4f]/10 px-1 rounded">alwaysOutputData: true</code> or an explicit fallback.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Lead scoring is business logic, not AI logic</span> — the scoring is deterministic JavaScript, not an LLM call. Using AI for scoring would add latency and cost for a task that&apos;s actually just a set of rules.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#e0ff4f] font-bold shrink-0">-</span>
            <span><span className="font-medium text-foreground">Always test with a real calendar</span> — the schema differences between a brand-new calendar (zero events) and an active one exposed the empty data bug immediately. Simulate both states before going live.</span>
          </li>
        </ul>
      </section>

      {/* How This Scales */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">How This Scales</h2>

        <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Short-Term</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li>Persistent conversation memory — upgrade from buffer window to Postgres chat memory</li>
          <li>Webhook Header Auth on the form intake for extra security</li>
          <li>Multi-practitioner support — route bookings to different calendars by treatment type</li>
        </ul>

        <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Medium-Term</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
          <li>SMS notifications via Twilio for appointment reminders</li>
          <li>Automated follow-up sequences for warm leads</li>
          <li>No-show handling — detect missed appointments and trigger a re-booking workflow</li>
          <li>Patient portal — a simple Next.js frontend for patients to view and reschedule</li>
        </ul>

        <h3 className="text-base font-semibold text-[#e0ff4f] mb-2">Long-Term</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>White-label template for any service-based business (legal, accounting, physio)</li>
          <li>CRM dashboard — replace Google Sheets with a proper Supabase + Next.js admin panel</li>
          <li>AI follow-up calls — outbound voice AI for warm lead nurturing</li>
        </ul>
      </section>

      {/* The Takeaway */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">The Takeaway</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          This project demonstrates a pattern that applies far beyond dental clinics:{' '}
          <span className="font-semibold text-[#e0ff4f]">any service business that qualifies leads and books appointments can be automated with this exact architecture</span>. The AI handles the conversation, the scoring logic handles routing, and n8n handles every integration.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The 3-workflow split — receptionist, operations, intake — keeps complexity manageable.
          Each workflow has a single responsibility and a clear interface. It&apos;s maintainable,
          extensible, and the kind of system a small clinic can actually rely on.
        </p>
      </section>

      <hr className="border-border mb-6" />
      <p className="text-sm text-muted-foreground italic">
        Built with n8n, Claude Sonnet 4.6 (Anthropic API), Google Calendar, Google Sheets, Gmail, and Railway. Orchestrated by Claude Code.
      </p>
    </>
  );
}
