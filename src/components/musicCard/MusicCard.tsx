import { useState } from 'react';
import { SongType } from '../../types';
import full_heart from '../../images/checked_heart.png';
import empty_heart from '../../images/empty_heart.png';

type PropsType = {
  album: SongType[];
};

type EventType = {
  target: { name:string, checked:boolean }
};

export default function MusicsList({ album }:PropsType) {
  const [favoriteList, setIsfavorite] = useState([]);

  const isFavorite = (id:number) => {
    return favoriteList.some((favorite) => favorite === id.toString());
  };

  const hancdleChange = ({ target: { name, checked } }:EventType) => {
    if (!isFavorite(Number(name))) {
      const favorite = [...favoriteList, name];
      setIsfavorite(favorite);
    }
    if (isFavorite(Number(name))) {
      const favorite = favoriteList.filter((music) => music !== name);
      setIsfavorite(favorite);
    }
  };

  return (

    <div>
      {album.map(({ trackId, trackName, previewUrl }) => (
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
                onChange={ hancdleChange }
                type="checkbox"
                name={ trackId.toString() }
                id={ trackName }
                checked={ isFavorite(trackId) }
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
      ))}
    </div>

  );
}
