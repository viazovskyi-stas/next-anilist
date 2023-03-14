'use client';
import styles from './page.module.css';

import React, { useState } from 'react';
import { useGetAnimeListQuery, MediaSort } from '@/graphql/generated';
import {Skeletons, Anime, Typography} from '@/components';
import { genres } from '@/src/utils';
import {
  TextField,
  Button,
  Chip,
  Box,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
  Select
} from '@mui/material';

export default function AnimeList() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState(false);
  const [genre, setGenre] = useState([]);

  // TODO add error handle
  const { data, isLoading, error } = useGetAnimeListQuery({
    perPage: 10,
    search: searchQuery,
    genreIn: genre.length ? genre : null,
    sort: [sort ? MediaSort.Popularity : MediaSort.PopularityDesc]
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchQueryChange = () => {
    setSearchQuery(searchText || null);
  };

  const handleChangeGenre = (event: SelectChangeEvent<any>) => {
    const {
      target: { value }
    } = event;
    setGenre(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeSort = () => {
    setSort((prev) => !prev);
  };

  return (
    <main className={styles.main}>
      <Typography variant='title-1' tag='h2'>
        🚀 Anime list app
      </Typography>
      <div className={styles.filterGroup}>
        <div>
          <TextField
            name="search"
            value={searchText}
            onChange={handleSearchChange}
            label='Search'
            color='primary'
            focused
            sx={{ color: 'white' }}
          />
          <Button
            id="search-submit-button"
            onClick={handleSearchQueryChange}
            variant='contained'
            sx={{ height: '100%', marginLeft: 1 }}
          >
            Search
          </Button>
        </div>
        <div>
          <FormControl sx={{ ml: 1, width: 200, height: 40 }}>
            <InputLabel id='demo-multiple-chip-label' sx={{ color: '#1976d2' }}>
              Genre
            </InputLabel>
            <Select
              multiple
              value={genre}
              onChange={handleChangeGenre}
              input={<OutlinedInput id='select-multiple-chip' label='Genre' />}
              renderValue={(selected: string[]) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.length && (
                    <Chip key={selected[0]} label={selected[0]} color='primary' size='small' />
                  )}
                  {selected.length > 1 && (
                    <Chip
                      key={'more'}
                      label={`+${selected.length - 1}`}
                      color='primary'
                      size='small'
                    />
                  )}
                </Box>
              )}
            >
              {genres.map(({ id, name }) => (
                <MenuItem key={id} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button
            onClick={handleChangeSort}
            variant='contained'
            sx={{ height: '100%', marginLeft: 1 }}
          >
            Sort by popularity {sort ? 'ASC' : 'DESK'}
          </Button>
        </Box>
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
