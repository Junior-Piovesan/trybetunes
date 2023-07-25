import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';
import errorCircle from '../../images/🦆 icon _circle error_.svg';
import './albumList.css';

type PropsType = {
  listAlbuns: AlbumType[],
  artist:string
};

export default function AlbunsList({ listAlbuns, artist }:PropsType) {
  const renderAlbuns = () => listAlbuns.length > 0;

  return (
    <section className="albumList-container">
      {!renderAlbuns() && (
        <div className="error-box">
          <img className="error-icone" src={ errorCircle } alt="icone de erro" />
          <h2 className="no-album-title">Nenhum álbum foi encontrado</h2>
        </div>
      )}

      {renderAlbuns() && (
        <div>
          <div>
            <h1>{`Resultado de álbuns de: ${artist}`}</h1>
          </div>
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
