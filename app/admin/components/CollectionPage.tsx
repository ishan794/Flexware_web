'use client';

import CollectionManager from './CollectionManager';
import { collections } from '../collections';

export default function CollectionPage({ name }: { name: keyof typeof collections }) {
  return <CollectionManager config={collections[name]} />;
}
