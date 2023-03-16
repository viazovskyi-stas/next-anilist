import Link from 'next/link';

import { Typography } from '@/components';
import { Logo } from '@/components/icons';
import { ROUTES } from '@/utils/constants';

import styles from './Header.module.scss';

export const Header: React.FC = () => (
  <header className={styles.header}>
    <Link href={ROUTES.ROOT} prefetch={false}>
      <Logo className={styles.logo} />
    </Link>
    <nav>
      <ul className={styles.links}>
        <li>
          <Typography variant='sub-title-2'>
            <Link href={ROUTES.SEARCH_ANIME} prefetch={false}>
              Search
            </Link>
          </Typography>
        </li>
      </ul>
    </nav>
  </header>
);
