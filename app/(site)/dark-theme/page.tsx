import type { Metadata } from 'next'
import DarkAutomationLanding from '@/app/components/landing/DarkAutomationLanding'
import { getPublished } from '@/app/lib/server/content'

// Standalone concept landing page (hides the global chrome). Not linked from navigation.
export const metadata: Metadata = {
  title: 'AI Automation — Concept',
  robots: { index: false, follow: false },
}

export default async function DarkThemePage() {
  return <DarkAutomationLanding testimonials={await getPublished('testimonials')} />
}
