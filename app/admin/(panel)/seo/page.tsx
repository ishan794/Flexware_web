import type { Metadata } from 'next';
import SeoEditor from './SeoEditor';

export const metadata: Metadata = { title: 'SEO' };

export default function Page() {
  return <SeoEditor />;
}
