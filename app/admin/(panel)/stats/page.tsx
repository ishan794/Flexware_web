import type { Metadata } from 'next';
import CollectionPage from '../../components/CollectionPage';

export const metadata: Metadata = { title: 'Stats' };

export default function Page() {
  return <CollectionPage name="stats" />;
}
