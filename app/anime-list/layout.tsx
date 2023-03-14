import ReactQueryWrapper from './ReactQueryWrapper';
import MuiWrapper from './MuiWrapper';

export const metadata = {
  title: 'Anime List',
  description: 'Anime list cards'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MuiWrapper>
      <ReactQueryWrapper>{children}</ReactQueryWrapper>
    </MuiWrapper>
  );
}
