import Image from 'next/image';

import { Typography } from '@/components';

import styles from './AnimeCard.module.scss';
import {Media} from "@/graphql/generated";

interface CharacterCardProps {
  anime?: Partial<Media> | null;
}

export const AnimeCard: React.FC<CharacterCardProps> = ({ anime }) => (
  <div className={styles.container}>
    <div className={styles.image_container}>
      <Image src={anime?.coverImage?.large || ''} alt={anime?.title?.english || ''} fill />
    </div>
    <div className={styles.info}>
      <Typography tag='h2' variant='title-2'>
          { anime?.title?.english }
      </Typography>
      <Typography tag='span' variant='sub-title-2'>
        Episodes: {anime?.episodes}
      </Typography>
      <Typography tag='span' variant='sub-title-2'>
        Type: {anime?.type}
      </Typography>
      <Typography tag='span' variant='sub-title-2'>
        Genres: {anime?.genres?.join(',')}
      </Typography>
    </div>
  </div>
);
