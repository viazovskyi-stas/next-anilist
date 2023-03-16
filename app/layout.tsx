import '@/styles/globals.scss';
import Layout from '@/components/layout';

const seo = {
  title: 'Anilist next',
  description: 'Omg its anime?'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <head>
      <title>{seo.title}</title>
      <meta content={seo.description} name='description' />
      <meta content='width=device-width,initial-scale=1' name='viewport' />
    </head>
    <body>
      <Layout.Header />
      {children}
      {/* <Layout.Footer /> */}
    </body>
  </html>
);

export default RootLayout;
