import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cinematic Experience | Sri Shreya Danda',
  description:
    'An immersive cinematic scrollytelling portfolio experience by Sri Shreya Danda — Data Analyst & Business Analyst.',
};

export default function CinematicLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
