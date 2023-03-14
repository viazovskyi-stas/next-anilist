import ReactQueryWrapper from './ReactQueryWrapper';
import Layout from '@/components/layout';

export const metadata = {
  title: 'Anime List',
  description: 'Anime list cards'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ReactQueryWrapper>{children}</ReactQueryWrapper>;
}
