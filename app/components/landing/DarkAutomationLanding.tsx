'use client';

import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle,
  Cpu,
  Database,
  Gauge,
  Globe2,
  Layers,
  Lock,
  MessageSquare,
  Plug,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import {
  LandingChromeReset,
  LandingFooter,
  LandingNav,
  LandingSection,
  SectionHeading,
} from './LandingPrimitives';
import type { Testimonial } from '../../lib/content';

const navLinks = [
  { href: '#assistant', label: 'Assistant' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#pricing', label: 'Pricing' },
];

const assistantMessages = [
  { role: 'Ops lead', text: 'New enterprise lead from website. Qualify, score, and route to sales.' },
  { role: 'Flxware AI', text: 'Intent detected. CRM matched. Lead score 91. Proposal workflow prepared.' },
  { role: 'System', text: 'HubSpot updated, Slack notified, calendar link sent, follow-up scheduled.' },
];

const workflows = [
  { icon: Globe2, title: 'Capture', desc: 'Inbound forms, chat, email, CRM events' },
  { icon: BrainCircuit, title: 'Reason', desc: 'Intent, priority, sentiment, enrichment' },
  { icon: Zap, title: 'Act', desc: 'Trigger tools, route tasks, send updates' },
  { icon: ShieldCheck, title: 'Verify', desc: 'Approval gates, audit trails, retries' },
  { icon: BarChart3, title: 'Report', desc: 'Revenue impact and automation health' },
];

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Bot, title: 'Autonomous agents', desc: 'Deploy assistants that understand context, execute workflows, and escalate with full traceability.' },
  { icon: Lock, title: 'Governed execution', desc: 'Role controls, approvals, secrets handling, and audit logs keep automation enterprise-ready.' },
  { icon: Plug, title: 'Native integrations', desc: 'Connect sales, support, finance, engineering, and analytics systems without brittle glue code.' },
  { icon: Gauge, title: 'Realtime observability', desc: 'Monitor queue health, token usage, run outcomes, latency, and recovery paths in one cockpit.' },
  { icon: MessageSquare, title: 'Human handoff', desc: 'Let AI prepare the work, then bring in the right person only when judgment is required.' },
  { icon: Sparkles, title: 'Adaptive prompts', desc: 'Version, test, and tune AI behavior as business rules and customer journeys evolve.' },
];

const integrations = ['OpenAI', 'Vercel', 'Linear', 'Slack', 'HubSpot', 'Stripe', 'GitHub', 'Notion', 'Zapier', 'Google Cloud'];

const architecture = [
  { title: 'Experience Layer', desc: 'Chat, voice, forms, portals, internal dashboards' },
  { title: 'Agent Runtime', desc: 'Prompt routing, memory, tools, policies, retries' },
  { title: 'Automation Bus', desc: 'Events, queues, approvals, webhooks, schedules' },
  { title: 'Data Plane', desc: 'CRM, documents, analytics, warehouse, vector search' },
];

const dashboardRows = [
  ['Lead qualification', 'Live', '98.4%', '1.2s'],
  ['Invoice reconciliation', 'Running', '94.7%', '4.8s'],
  ['Support triage', 'Live', '96.1%', '0.9s'],
  ['Churn alerts', 'Queued', '91.8%', '2.6s'],
];

// Headline KPIs for the dashboard preview. Only add real, verifiable figures here.
const verifiedMetrics: [value: string, label: string][] = [];

// Use client router redirection inside DarkAutomationLanding
/** Testimonials are the published entries from Admin → Testimonials; the section is hidden when empty. */
export default function DarkAutomationLanding({ testimonials = [] }: { testimonials?: Testimonial[] }) {

  return (
    <div data-theme="dark" className="min-h-screen bg-black text-white">
      <LandingChromeReset />
      <LandingNav
        mode="dark"
        product="Flxware AI"
        links={navLinks}
        ctaHref="/contact"
        ctaLabel="Book a demo"
      />
      <main>
        <DarkHero />
        <AssistantShowcase />
        <WorkflowVisualization />
        <FeaturesSection />
        <IntegrationsSection />
        <ArchitectureSection />
        <DashboardPreview />
        <TestimonialsSection testimonials={testimonials} />
        <PricingCta />
      </main>
      <LandingFooter
        mode="dark"
        product="Flxware AI"
        description="AI automation systems for teams that need intelligence, control, and measurable operational leverage."
      />
    </div>
  );
}

function DarkHero() {
  return (
    <section className="relative isolate overflow-hidden bg-black px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-90"
        style={{
          background:
            'linear-gradient(120deg, rgba(2, 6, 23, 1), rgba(15, 23, 42, 0.98), rgba(17, 24, 39, 1))',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-gradient opacity-80"
        style={{
          background:
            'radial-gradient(circle at 25% 15%, rgba(34, 211, 238, 0.18), transparent 28%), radial-gradient(circle at 75% 25%, rgba(99, 102, 241, 0.18), transparent 30%), linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(168, 85, 247, 0.10), rgba(6, 182, 212, 0.08))',
          backgroundSize: '220% 220%',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px, 96px 96px, 96px 96px',
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            AI automation platform for technical teams
          </div>
          <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl">
            Automate work with intelligent AI systems
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            Build agentic workflows that qualify leads, route operations, update systems, and surface decisions with enterprise-grade control.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-xl shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-gray-200">
              Start automation plan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/10">
              See dashboard preview
              <Activity className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
          <div className="border-b border-white/10 bg-zinc-950/70 px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-200">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Autopilot run 48A7</p>
                  <p className="text-xs text-gray-400">Lead-to-proposal workflow</p>
                </div>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                Example workflow
              </span>
            </div>
          </div>
          <div className="grid gap-px bg-white/10 lg:grid-cols-4">
            {['Intent detected', 'CRM enriched', 'Proposal drafted', 'Sales routed'].map((item, index) => (
              <div key={item} className="bg-zinc-950/80 p-5">
                <p className="text-xs text-gray-400">Step 0{index + 1}</p>
                <p className="mt-2 text-sm font-semibold text-white">{item}</p>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500" style={{ width: `${84 + index * 4}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AssistantShowcase() {
  return (
    <LandingSection id="assistant" className="bg-zinc-950">
      <SectionHeading
        mode="dark"
        eyebrow="AI assistant showcase"
        title="A front-line AI operator for your business"
        description="Give every workflow an assistant that can understand requests, pull context, trigger tools, and keep humans in control."
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Flxware AI Agent</p>
                <p className="text-sm text-gray-400">Qualification and routing assistant</p>
              </div>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">Example conversation</span>
          </div>
          <div className="mt-6 space-y-4">
            {assistantMessages.map((message) => (
              <div key={message.text} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs font-semibold text-cyan-200">{message.role}</p>
                <p className="mt-2 text-sm leading-6 text-gray-200">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {[
            ['91', 'Lead score', 'Priority routing enabled'],
            ['12m', 'Saved today', 'Across sales and support'],
            ['4', 'Systems updated', 'CRM, Slack, docs, calendar'],
          ].map(([value, label, detail]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/10">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">Example output</p>
              <p className="text-4xl font-semibold text-white">{value}</p>
              <p className="mt-2 font-medium text-gray-200">{label}</p>
              <p className="mt-1 text-sm text-gray-400">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </LandingSection>
  );
}

function WorkflowVisualization() {
  return (
    <LandingSection id="workflow" className="bg-black">
      <SectionHeading
        mode="dark"
        eyebrow="Automation workflow"
        title="From signal to action in one governed pipeline"
        description="Design AI workflows as connected stages, each with data, reasoning, tool execution, and verification built in."
      />
      <div className="grid gap-4 md:grid-cols-5">
        {workflows.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              {index < workflows.length - 1 && (
                <div className="absolute left-1/2 top-full hidden h-px w-full bg-gradient-to-r from-cyan-400/60 to-transparent md:left-full md:top-10 md:block" />
              )}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-gray-400">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </LandingSection>
  );
}

function FeaturesSection() {
  return (
    <LandingSection id="features" className="bg-zinc-950">
      <SectionHeading
        mode="dark"
        eyebrow="Platform features"
        title="Built for advanced AI operations"
        description="Everything required to move beyond demos: integrations, controls, observability, and reusable automation patterns."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-300/30 hover:shadow-xl hover:shadow-blue-950/30">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-200">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">{feature.desc}</p>
            </article>
          );
        })}
      </div>
    </LandingSection>
  );
}

function IntegrationsSection() {
  return (
    <LandingSection id="integrations" className="bg-black">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionHeading
          mode="dark"
          align="left"
          eyebrow="AI integrations"
          title="Connect AI to the systems that run the company"
          description="Unify context across product, sales, support, finance, and engineering tools so every automation has the data it needs."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {integrations.map((name) => (
            <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm font-semibold text-gray-200 backdrop-blur-xl transition hover:border-cyan-300/40 hover:text-white">
              {name}
            </div>
          ))}
        </div>
      </div>
    </LandingSection>
  );
}

function ArchitectureSection() {
  return (
    <LandingSection id="architecture" className="bg-zinc-950">
      <SectionHeading
        mode="dark"
        eyebrow="System architecture"
        title="A technical foundation for reliable AI automation"
        description="The platform separates interfaces, reasoning, execution, and data so automation can scale without losing control."
      />
      <div className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="grid gap-4">
          {architecture.map((layer, index) => (
            <div key={layer.title} className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-[220px_1fr_auto] md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                  {index === 0 && <Layers className="h-5 w-5" />}
                  {index === 1 && <Cpu className="h-5 w-5" />}
                  {index === 2 && <Server className="h-5 w-5" />}
                  {index === 3 && <Database className="h-5 w-5" />}
                </div>
                <p className="font-semibold text-white">{layer.title}</p>
              </div>
              <p className="text-sm leading-6 text-gray-400">{layer.desc}</p>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                Layer {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </LandingSection>
  );
}

function DashboardPreview() {
  return (
    <LandingSection id="dashboard" className="bg-black">
      <SectionHeading
        mode="dark"
        eyebrow="Dashboard preview"
        title="Monitor automations like production infrastructure"
        description="Track every workflow run, confidence score, human handoff, queue delay, and revenue impact from one control room. Figures below are illustrative sample data."
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        {verifiedMetrics.length > 0 && (
        <div className="grid gap-px bg-white/10 md:grid-cols-4">
          {verifiedMetrics.map(([value, label]) => (
            <div key={label} className="bg-zinc-950/90 p-6">
              <p className="text-3xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="sr-only">Sample workflow runs (illustrative data)</caption>
            <thead className="border-b border-white/10 text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Workflow</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Confidence</th>
                <th className="px-6 py-4 font-medium">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-200">
              {dashboardRows.map(([name, status, confidence, latency]) => (
                <tr key={name} className="transition hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">{name}</td>
                  <td className="px-6 py-4">{status}</td>
                  <td className="px-6 py-4">{confidence}</td>
                  <td className="px-6 py-4">{latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LandingSection>
  );
}

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <LandingSection className="bg-zinc-950">
      <SectionHeading
        mode="dark"
        eyebrow="Testimonials"
        title="Automation teams can defend"
        description="Built for companies that need AI to produce measurable operational results with architecture the technical team can trust."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <blockquote className="text-sm leading-7 text-gray-300">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-5">
              <p className="font-semibold text-white">{testimonial.name}</p>
              <p className="mt-1 text-sm text-gray-400">{testimonial.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </LandingSection>
  );
}

function PricingCta() {
  return (
    <LandingSection id="pricing" className="bg-black">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
        <div className="grid gap-px bg-white/10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-zinc-950/95 p-8 md:p-12">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              Engagement models
            </span>
            <h2 className="mt-6 text-3xl font-semibold leading-tight text-white md:text-5xl">
              Launch your first AI automation stack in weeks
            </h2>
            <p className="mt-5 text-base leading-8 text-gray-300">
              Start with one high-value workflow, prove the economics, then scale into a governed automation platform.
            </p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-gray-200">
              Get implementation plan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-2">
            {[
              ['Launch', 'For one priority workflow', ['Discovery sprint', 'Agent prototype', 'Core integrations', 'Dashboard baseline']],
              ['Scale', 'For multi-team automation', ['Governance model', 'Workflow library', 'Observability cockpit', 'Ongoing optimization']],
            ].map(([plan, detail, items]) => (
              <div key={plan as string} className="bg-zinc-950/95 p-8">
                <p className="text-xl font-semibold text-white">{plan as string}</p>
                <p className="mt-2 text-sm text-gray-400">{detail as string}</p>
                <ul className="mt-6 space-y-3">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 text-cyan-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
