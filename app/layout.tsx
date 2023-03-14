import '@/styles/globals.scss';
import Layout from '@/components/layout';

const seo = {
  title: 'Anilist next',
  description: 'Omg its anime?'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
    <head>
      <title>{seo.title}</title>
      <meta name='description' content={seo.description} />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
    </head>
      <body>
          <Layout.Header />
          {children}
          {/*<Layout.Footer />*/}
      </body>
    </html>
  );
}
