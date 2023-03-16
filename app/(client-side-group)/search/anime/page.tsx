'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

import { Skeletons, Anime, Typography } from '@/components';
import { MediaSort, useGetAnimeListQuery } from '@/graphql/generated';

import Filter from './Filter/Filter';
import styles from './page.module.css';

const AnimePage = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') as MediaSort;
  const genres = searchParams.getAll('genres');

  // TODO add error handle
  const { data, isLoading } = useGetAnimeListQuery({
    perPage: 10,
    search: searchParams.get('search'),
    genreIn: genres.length ? genres : null,
    sort: sort && [sort]
  });

  return (
    <main className={styles.main}>
      <Typography tag='h2' variant='title-1'>
        🚀 Anime list app
      </Typography>
      <Filter />
      <div className='search-results-container'>
        <Typography tag='h2' variant='title-1'>
          Results: {data?.Page?.pageInfo?.total}
        </Typography>
      </div>
      <div className='list-container'>
        {isLoading ? (
          <ul className='entities_container'>
            {Array.from({ length: 8 }).map((_element, index) => (
              <Skeletons.Card key={index} />
            ))}
          </ul>
        ) : (
          <ul className='entities_container'>
            {data?.Page?.media?.map((anime) => (
              <li key={anime?.id}>
                <Anime.Card anime={anime} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default AnimePage;
