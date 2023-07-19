import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import { InfoAlbumType, SongType } from '../../types';
import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/musicCard/MusicCard';

const initialAlbumInfo:InfoAlbumType = {
  collectionName: '',
  artworkUrl100: '',
  artistName: '',

};

export default function Album() {
  const [album, setAlbum] = useState<SongType[]>([]);

  const [albumInfo, setAlbumInfo] = useState<InfoAlbumType>(initialAlbumInfo);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useParams<{ id:string }>();

  useEffect(() => {
    getListMusics();
  }, []);

  const getListMusics = async () => {
    const [info, ...musics] = await getMusics(params.id || '');

    setAlbumInfo(info);
    setAlbum(musics);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <section>
          <div>

            <img
              src={ albumInfo.artworkUrl100 }
              alt={ `Capa do album da banda ${albumInfo.artistName}` }
            />

            <h2 data-testid="artist-name">{albumInfo.artistName}</h2>
            <p data-testid="album-name">{ albumInfo.collectionName}</p>
          </div>

          <MusicCard album={ album } />
        </section>
      )}
    </div>
  );
}
