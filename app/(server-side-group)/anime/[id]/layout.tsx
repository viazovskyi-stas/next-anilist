export const metadata = {
  title: 'Anime List',
  description: 'Anime list cards'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
