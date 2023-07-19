import { MusicsType, SongType } from '../../types';
import full_heart from '../../images/checked_heart.png';
import empty_heart from '../../images/empty_heart.png';

type PropsType = {
  album: SongType[];
};

export default function MusicsList({ album }:PropsType) {
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
              <img src={ empty_heart } alt="favorite" />
              <input type="checkbox" name={ trackName } id={ trackName } />
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
