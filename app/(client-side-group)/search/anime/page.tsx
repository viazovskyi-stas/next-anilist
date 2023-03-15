'use client';
import styles from './page.module.css';

import React from 'react';
import { MediaSort, useGetAnimeListQuery } from '@/graphql/generated';
import { Skeletons, Anime, Typography } from '@/components';
import Filter from './Filter/Filter';
import { useSearchParams } from 'next/navigation';

export default function AnimePage() {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') as MediaSort;
  const genres = searchParams.getAll('genres');

  // TODO add error handle
  const { data, isLoading, error } = useGetAnimeListQuery({
    perPage: 10,
    search: searchParams.get('search'),
    genreIn: genres.length ? genres : null,
    sort: sort && [sort]
  });

  return (
    <main className={styles.main}>
      <Typography variant='title-1' tag='h2'>
        🚀 Anime list app
      </Typography>
      <Filter />
      <div className='search-results-container'>
        <Typography variant='title-1' tag='h2'>
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
}
