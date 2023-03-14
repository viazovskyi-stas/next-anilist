import Link from 'next/link';

import { Typography } from '@/components';
import { Logo } from '@/components/icons';
import { ROUTES } from '@/utils/constants';

import styles from './Header.module.scss';

export const Header: React.FC = () => (
  <header className={styles.header}>
    <Link prefetch={false} href={ROUTES.ROOT}>
      <Logo className={styles.logo} />
    </Link>
    <nav>
      <ul className={styles.links}>
        <li>
          <Typography variant='sub-title-2'>
            <Link prefetch={false} href={ROUTES.ANIME_LIST}>
              Anime list
            </Link>
          </Typography>
        </li>
      </ul>
    </nav>
  </header>
);
