import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';

type PropsType = {
  listAlbuns: AlbumType[],
  artist:string
};

export default function AlbunsList({ listAlbuns, artist }:PropsType) {
  const renderAlbuns = () => listAlbuns.length > 0;

  return (
    <section>
      {!renderAlbuns() && <h2>Nenhum álbum foi encontrado</h2>}

      {renderAlbuns() && (
        <div>
          <h1>{`Resultado de álbuns de: ${artist}`}</h1>
          {listAlbuns.map((album) => (
            <div
              key={ album.collectionId }
            >
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <div>
                  <img src={ album.artworkUrl100 } alt="" />
                </div>
                <div>
                  <p>{ album.collectionName }</p>
                  <p>{ album.artistName }</p>
                </div>
              </Link>
            </div>
          ))}

        </div>
      )}
    </section>
  );
}
