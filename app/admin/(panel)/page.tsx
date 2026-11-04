import type { Metadata } from 'next';
import Dashboard from './Dashboard';

// Sits beside the panel layout, so its title template doesn't apply here
export const metadata: Metadata = { title: { absolute: 'Dashboard · Admin | Flxware' } };

export default function Page() {
  return <Dashboard />;
}
