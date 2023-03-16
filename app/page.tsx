import { Banners } from '@/components';

import styles from './page.module.css';

const Home = () => (
  <main className={styles.main}>
    <Banners.WelcomeBanner />
  </main>
);

export default Home;
