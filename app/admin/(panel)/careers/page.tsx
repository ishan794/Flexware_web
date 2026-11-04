import type { Metadata } from 'next';
import CollectionPage from '../../components/CollectionPage';

export const metadata: Metadata = { title: 'Careers' };

export default function Page() {
  return <CollectionPage name="jobs" />;
}
