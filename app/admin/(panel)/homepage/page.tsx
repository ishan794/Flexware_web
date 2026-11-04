import type { Metadata } from 'next';
import HomepageEditor from './HomepageEditor';

export const metadata: Metadata = { title: 'Homepage' };

export default function Page() {
  return <HomepageEditor />;
}
