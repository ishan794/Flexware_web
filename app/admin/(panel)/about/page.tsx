import type { Metadata } from 'next';
import AboutEditor from './AboutEditor';

export const metadata: Metadata = { title: 'About' };

export default function Page() {
  return <AboutEditor />;
}
