import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CloudUpload, Lock, Server } from 'lucide-react'
import Reveal from '@/app/components/Reveal'

// Copy here only restates capabilities already described on the home and services pages.
// Linked from the homepage infrastructure section ("How we deliver").
export const metadata: Metadata = {
  title: 'How we deliver',
  description:
    'How Flxware ships software: automated deployments, secure defaults, and reliable data protection built into every project.',
}

const practices = [
  {
    icon: CloudUpload,
    title: 'Push to deploy.',
    body: 'Automated CI/CD pipelines take every change from commit to production with consistent checks, so releases are routine rather than risky.',
  },
  {
    icon: Lock,
    title: 'SSL certificates.',
    body: 'Encryption in transit and certificate management are configured from the first deployment, not added at the end.',
  },
  {
    icon: Server,
    title: 'Database backups.',
    body: 'Scheduled backups and a tested recovery path protect your data, with redundancy planned to match the needs of the product.',
  },
]

export default function WorkflowPage() {
  return (
    <div className="relative bg-background">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-72 overflow-hidden sm:h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=1600&q=70"
              className="absolute inset-0 size-full bg-surface object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/30" />
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:contents">
          <div className="mx-auto max-w-2xl pb-20 pt-14 sm:pb-28 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-28 xl:w-1/2">
            <Reveal>
              <p className="eyebrow">Deploy faster</p>
              <h1 className="text-display mt-5 text-foreground">A better workflow</h1>
              <p className="mt-6 text-lg leading-8 text-muted sm:text-xl">
                Great software depends on how it is delivered as much as how it is designed. We bring a dependable
                delivery process to every engagement, so your team can focus on the product instead of the plumbing.
              </p>
            </Reveal>
            <div className="mt-10 max-w-xl text-base leading-7 text-muted lg:max-w-none">
              <Reveal as="p">
                From the first sprint, each project runs on a production-ready foundation: version control, automated
                testing, repeatable deployments, and monitoring. That foundation shortens feedback loops, reduces
                release risk, and makes it easier to grow the product over time.
              </Reveal>
              <ul className="mt-8 space-y-6">
                {practices.map((item, i) => (
                  <Reveal as="li" key={item.title} index={i} className="flex gap-x-3">
                    <item.icon aria-hidden="true" className="mt-1 size-5 flex-none text-primary" />
                    <span>
                      <strong className="font-semibold text-foreground">{item.title}</strong> {item.body}
                    </span>
                  </Reveal>
                ))}
              </ul>
              <Reveal as="p" className="mt-8">
                These practices are part of how we work, not optional extras. They keep projects predictable for your
                stakeholders and maintainable for the engineers who inherit them.
              </Reveal>
              <Reveal>
                <h2 className="mt-14 text-2xl font-bold tracking-tight text-foreground">No server? No problem.</h2>
                <p className="mt-5">
                  We handle infrastructure so you can focus on building. Whether you are launching a first version or
                  modernizing an existing platform, we set up hosting, environments, and operations that scale with
                  your needs.
                </p>
                <Link href="/contact" className="btn btn-primary group mt-8">
                  Talk to us about your project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
