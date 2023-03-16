import ReactQueryWrapper from './ReactQueryWrapper';

export const metadata = {
  title: 'Search Anime · AniList',
  description:
    'Search over tens of thousands of anime on AniList, the most comprehensive anime database. Find the exact anime you are looking for.'
};

export default ({ children }: { children: React.ReactNode }) => (
  <ReactQueryWrapper>{children}</ReactQueryWrapper>
);
