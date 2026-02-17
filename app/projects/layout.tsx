import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | vim-automations',
  description: 'All automation projects, apps, and experiments by vim-automations.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
