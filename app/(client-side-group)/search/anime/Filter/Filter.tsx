'use client';

import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';

import { MediaSort } from '@/graphql/generated';
import { genres as genresMock } from '@/src/utils';

import styles from './Filter.module.scss';

const Filter = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [sort, setSort] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);

  const handleSearchQueryChange = () => {
    setSearchQuery(searchRef.current?.value || null);
  };

  const handleChangeGenre = (event: SelectChangeEvent<typeof genres>) => {
    const {
      target: { value }
    } = event;
    setGenres(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeSort = () => {
    setSort((prev) => !prev);
  };

  useUpdateEffect(() => {
    // Todo optimise (next 13 router not finished so make it by myself
    // Todo shallow url set not working (next 13)

    const query: Record<string, string> = {
      sort: sort ? MediaSort.Popularity : MediaSort.PopularityDesc
    };
    if (searchQuery) {
      query.search = searchQuery;
    }
    const genresQuery = genres.length ? `&genres=${genres.join('&genres=')}` : '';
    const queryPart =
      Object.keys(query).length !== 0
        ? `?${new URLSearchParams(query).toString()}${genresQuery}`
        : '';
    router.replace(`/search/anime${queryPart}`);
  }, [sort, genres, searchQuery]);

  return (
    <div className={styles.filterGroup}>
      <div>
        <TextField
          focused
          color='primary'
          inputRef={searchRef}
          label='Search'
          name='search'
          sx={{ color: 'white' }}
        />
        <Button
          id='search-submit-button'
          sx={{ height: '100%', marginLeft: 1 }}
          variant='contained'
          onClick={handleSearchQueryChange}
        >
          Search
        </Button>
      </div>
      <div>
        <FormControl sx={{ ml: 1, height: 40, width: 200 }}>
          <InputLabel id='demo-multiple-chip-label' sx={{ color: '#1976d2' }}>
            Genres
          </InputLabel>
          <Select
            multiple
            input={<OutlinedInput id='select-multiple-chip' label='Genre' />}
            value={genres}
            MenuProps={{
              sx: {
                '&& .Mui-selected': {
                  backgroundColor: '#1976d2'
                },
                '&& .MuiMenuItem-root:hover': {
                  backgroundColor: '#669dd5'
                }
              }
            }}
            renderValue={(selected: string[]) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.length && (
                  <Chip key={selected[0]} color='primary' label={selected[0]} size='small' />
                )}
                {selected.length > 1 && (
                  <Chip key='more' color='primary' label={`+${selected.length - 1}`} size='small' />
                )}
              </Box>
            )}
            onChange={handleChangeGenre}
          >
            {genresMock.map(({ id, name }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Box sx={{ marginLeft: 'auto' }}>
        <Button
          sx={{ height: '100%', marginLeft: 1 }}
          variant='contained'
          onClick={handleChangeSort}
        >
          Sort by popularity {sort ? 'ASC' : 'DESK'}
        </Button>
      </Box>
    </div>
  );
};

export default Filter;
