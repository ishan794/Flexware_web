import type { Metadata } from 'next';
import CollectionPage from '../../components/CollectionPage';

export const metadata: Metadata = { title: 'Testimonials' };

export default function Page() {
  return <CollectionPage name="testimonials" />;
}
