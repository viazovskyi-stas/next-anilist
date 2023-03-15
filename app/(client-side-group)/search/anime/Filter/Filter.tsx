'use client';
import React, { useRef, useState } from 'react';
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
import styles from './Filter.module.scss';
import { genres as genresMock } from '@/src/utils';
import { useRouter } from 'next/navigation';
import { MediaSort } from '@/graphql/generated';
import { useUpdateEffect } from 'usehooks-ts';

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
    // shallow url set not working

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
          inputRef={searchRef}
          name='search'
          label='Search'
          color='primary'
          focused
          sx={{ color: 'white' }}
        />
        <Button
          id='search-submit-button'
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
            multiple
            value={genres}
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
          onClick={handleChangeSort}
          variant='contained'
          sx={{ height: '100%', marginLeft: 1 }}
        >
          Sort by popularity {sort ? 'ASC' : 'DESK'}
        </Button>
      </Box>
    </div>
  );
};

export default Filter;
