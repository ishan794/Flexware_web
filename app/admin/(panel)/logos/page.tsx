import type { Metadata } from 'next';
import CollectionPage from '../../components/CollectionPage';

export const metadata: Metadata = { title: 'Client logos' };

export default function Page() {
  return <CollectionPage name="logos" />;
}
