import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import full_heart from '../../images/checked_heart.png';
import empty_heart from '../../images/empty_heart.png';
import './musicCard.css';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';

type PropsType = {
  album: SongType[];
};

type ListFavoriteType = {
  trackId:number,
  trackName:string,
  previewUrl:string
};

export default function MusicsList({ album }:PropsType) {
  const [favoriteList, setFavoriteList] = useState<ListFavoriteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getFavoritesList();
  }, []);

  const getFavoritesList = async () => {
    setIsLoading(true);
    setFavoriteList(await getFavoriteSongs());
    setIsLoading(false);
  };

  const isFavorite = (id:number) => {
    return favoriteList.some(({ trackId }) => trackId === id);
  };

  const hancdleChange = async (trackId:number, trackName:string, previewUrl:string) => {
    if (!isFavorite(trackId)) {
      const favorite:ListFavoriteType[] = [...favoriteList,
        {
          trackId,
          trackName,
          previewUrl,
        }];
      setFavoriteList(favorite);
      await addSong({ trackId, trackName, previewUrl });
    }
    if (isFavorite(trackId)) {
      const favorite = favoriteList.filter((music) => music.trackId !== trackId);
      setFavoriteList(favorite);
      await removeSong({ trackId, trackName, previewUrl });
    }
  };
  return (

    <div>
      {isLoading ? <Loading /> : (
        album.map(({ trackId, trackName, previewUrl }) => (
          <div
            key={ trackId }
          >
            <div>
              <p>
                {trackName}
              </p>

              <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackName }>
                <img
                  src={ isFavorite(trackId) ? full_heart : empty_heart }
                  alt="favorite"
                />
                <input
                  onChange={ () => {
                    hancdleChange(trackId, trackName, previewUrl);
                  } }
                  type="checkbox"
                  name={ trackId.toString() }
                  id={ trackName }
                  checked={ isFavorite(trackId) }
                  className="input__favorites"
                />
              </label>

            </div>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </div>
        ))
      )}
    </div>

  );
}
