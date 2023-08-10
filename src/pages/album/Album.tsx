import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import { InfoAlbumType, SongType } from '../../types';
import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/musicCard/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import './album.css';

const initialAlbumInfo:InfoAlbumType = {
  collectionName: '',
  artworkUrl100: '',
  artistName: '',

};

export default function Album() {
  const [album, setAlbum] = useState<SongType[]>([]);

  const [favoriteList, setFavoriteList] = useState<SongType[]>([]);

  const [albumInfo, setAlbumInfo] = useState<InfoAlbumType>(initialAlbumInfo);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useParams<{ id:string }>();

  useEffect(() => {
    getListMusicsFavoriteSongs();
  }, []);

  const getListMusicsFavoriteSongs = async () => {
    const [info, ...musics] = await getMusics(params.id || '');

    setAlbumInfo(info);
    setFavoriteList(await getFavoriteSongs());
    setAlbum(musics);
    setIsLoading(false);
  };

  const isFavorite = (id:number) => {
    return favoriteList.some(({ trackId }) => trackId === id);
  };

  const handleChange = async (trackId:number, trackName:string, previewUrl:string) => {
    if (!isFavorite(trackId)) {
      const favorite:SongType[] = [...favoriteList,
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
    <div className="album-box">
      {isLoading && <Loading />}
      {!isLoading && (
        <section>
          <div className="info-album_box">

            <img
              className="album-image"
              src={ albumInfo.artworkUrl100 }
              alt={ `Capa do album da banda ${albumInfo.artistName}` }
            />

            <div className="box-artist-name-album-name">
              <h2
                className="artist-name-album"
                data-testid="artist-name"
              >
                {albumInfo.artistName}

              </h2>
              <p
                className="album-name-album"
                data-testid="album-name"
              >
                { albumInfo.collectionName}

              </p>
            </div>

          </div>

          <MusicCard
            handleChange={ handleChange }
            album={ album }
            isFavorite={ isFavorite }
          />
        </section>

      )}
    </div>
  );
}
