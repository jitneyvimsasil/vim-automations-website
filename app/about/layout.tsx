import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Jitneyvim Sasil | vim-automations',
  description: 'About Jitneyvim Sasil — AI automation developer and builder.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
