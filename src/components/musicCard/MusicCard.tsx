import { SongType } from '../../types';

type PropsType = {
  album: SongType[]
};

export default function MusicsList({ album }:PropsType) {
  return (
    <div>
      <div>
        {album.map(({ trackId, trackName, previewUrl }) => (
          <div
            key={ trackId }
          >
            <p>
              {trackName}
            </p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </div>
        ))}
      </div>
      {/* {album.map(({ collectionName, artworkUrl100, artistName, artistId }) => (
        <div key={ artistId }>
          <img
            src={ artworkUrl100 }
            alt={ `Capa do album da banda ${artistName}` }
          />

          <h2 data-testid="artist-name">{artistName}</h2>
          <p data-testid="album-name">{collectionName}</p>
        </div>
      )).filter((music, index:number) => index === 0)} */}

    </div>
  );
}
