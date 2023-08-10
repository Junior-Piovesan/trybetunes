import { useState, useEffect } from 'react';
import MusicCard from '../../components/musicCard/MusicCard';
import { SongType } from '../../types';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading/Loading';
import './favorites.css';

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

  const handleChange = (trackId :number, trackName:string, previewUrl:string):void => {
    const newMusicList:SongType[] = favoriteList
      .filter((music) => music.trackId !== trackId);
    setFavoriteList(newMusicList);
    removeSong({ trackId, trackName, previewUrl });
  };

  const isFavorite = (id:number) => {
    return favoriteList.some(({ trackId }) => trackId === id);
  };

  return (
    <div className="favorites-container">

      {isLoading ? <Loading /> : (
        <>
          <div className="title_box">
            <h2 className="title-favorites">Músicas Favoritas</h2>
          </div>
          {favoriteList.length > 0 ? (
            <MusicCard
              handleChange={ handleChange }
              album={ favoriteList }
              isFavorite={ isFavorite }
            />) : (
              <h2 className="no-favorites-musics">Você não tem músicas favoritas!</h2>
          ) }

        </>
      )}
    </div>

  );
}
