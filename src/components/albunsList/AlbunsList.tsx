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
        <div className="album-card-container">
          <div className="title-album-card-box">
            <h1 className="title-album-card">{`Resultado de álbuns de: ${artist}`}</h1>
          </div>
          {listAlbuns.map((album) => (
            <div
              className="card-album-box"
              key={ album.collectionId }
            >
              <Link
                className="link-album"
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >

                <img className="img-album-card" src={ album.artworkUrl100 } alt="" />

                <p className="album-name">{ album.collectionName }</p>
                <p className="artist-name">{ album.artistName }</p>

              </Link>
            </div>
          ))}

        </div>
      )}
    </section>
  );
}
