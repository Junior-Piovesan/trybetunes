import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/musicCard/MusicCard';

export default function Album() {
  const [album, setAlbum] = useState<[AlbumType, ...SongType[]]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams<{ id:string }>();

  useEffect(() => {
    getListMusics();
  }, []);

  const getListMusics = async () => {
    const musicsList:[AlbumType, ...SongType[]] = await getMusics(params.id || '');
    setAlbum(musicsList);

    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <section>

          {album.map(({ collectionName, artworkUrl100, artistName, artistId }) => (
            <div key={ artistId }>
              <img
                src={ artworkUrl100 }
                alt={ `Capa do album da banda ${artistName}` }
              />

              <h2 data-testid="artist-name">{artistName}</h2>
              <p data-testid="album-name">{collectionName}</p>
            </div>
          )).filter((music, index:number) => index === 0)}

          <MusicCard album={ album.filter((music, index) => index !== 0) } />
          {/* <MusicCard album={ album } /> */}
        </section>
      )}
    </div>
  );
}
