import { useState, useEffect } from 'react';
import MusicsList from '../../components/musicCard/MusicCard';
import { SongType } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading/Loading';
import getMusics from '../../services/musicsAPI';

export default function Favorites() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favoriteList, setFavoriteList] = useState<SongType[]>([]);

  useEffect(() => {
    getFavorites();

    // const getFavorites = async () => {
    //   setIsLoading(true);
    //   const musicsList = await getFavoriteSongs();
    //   setFavoriteList(musicsList);
    //   setIsLoading(true);
    // };
  }, []);

  const getFavorites = async () => {
    setIsLoading(true);
    setFavoriteList(await getFavoriteSongs());
    setIsLoading(false);
  };

  return (
    <div>
      <MusicsList album={ favoriteList } />
      {/* {isLoading ? <Loading /> : <MusicsList album={ favoriteList } />} */}
    </div>

  );
}
