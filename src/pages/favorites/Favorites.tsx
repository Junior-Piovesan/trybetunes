import { useState, useEffect } from 'react';
import MusicCard from '../../components/musicCard/MusicCard';
import { SongType } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading/Loading';

export default function Favorites() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favoriteList, setFavoriteList] = useState<SongType[]>([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    setIsLoading(true);
    setFavoriteList(await getFavoriteSongs());
    setIsLoading(false);
  };

  const handleChange = (trackId:number):void => {
    const newMusicList:SongType[] = favoriteList
      .filter((music) => music.trackId !== trackId);
    setFavoriteList(newMusicList);
  };

  const isFavorite = (id:number) => {
    return favoriteList.some(({ trackId }) => trackId === id);
  };

  return (
    <div>

      {isLoading ? <Loading /> : (
        <MusicCard
          handleChange={ handleChange }
          album={ favoriteList }
          isFavorite={ isFavorite }
        />
      )}
    </div>

  );
}
