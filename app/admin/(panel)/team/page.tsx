import type { Metadata } from 'next';
import CollectionPage from '../../components/CollectionPage';

export const metadata: Metadata = { title: 'Team' };

export default function Page() {
  return <CollectionPage name="team" />;
}
