import { SongType } from '../../types';
import full_heart from '../../images/checked_heart.png';
import empty_heart from '../../images/empty_heart.png';
import './musicCard.css';

type PropsType = {
  album: SongType[];
  handleChange: (trackId:number, trackName:string, previewUrl:string) => void
  isFavorite:(id:number) => boolean
};

export default function MusicsList({ album, isFavorite, handleChange }:PropsType) {
  return (

    <div className="music-card-container">

      { album.map(({ trackId, trackName, previewUrl }) => (
        <div
          className="music-card"
          key={ trackId }
        >
          <div className="box-music-name">
            <p className="music-name">
              {trackName}
            </p>
          </div>

          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>

          <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackName }>
            <img
              className="img-heart"
              src={ isFavorite(trackId) ? full_heart : empty_heart }
              alt="favorite"
            />
            <input
              onChange={ () => {
                handleChange(trackId, trackName, previewUrl);
              } }
              type="checkbox"
              name={ trackId.toString() }
              id={ trackName }
              checked={ isFavorite(trackId) }
              className="input__favorites"
            />
          </label>

        </div>
      ))}
    </div>

  );
}
