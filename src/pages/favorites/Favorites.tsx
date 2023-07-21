import { useState, useEffect } from 'react';
import MusicCard from '../../components/musicCard/MusicCard';
import { SongType } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
// import full_heart from '../../images/checked_heart.png';
// import empty_heart from '../../images/empty_heart.png';
import Loading from '../../components/Loading/Loading';

export default function Favorites() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favoriteList, setFavoriteList] = useState<SongType[]>([]);

  useEffect(() => {
    getFavorites();

    // const getFavorites = async () => {
    //   setIsLoading(true);
    //   const musicsList = await getFavoriteSongs();
    //   setFavoriteList(musicsList);
    //   setIsLoading(true);
    // };
  }, []);

  const getFavorites = async () => {
    setIsLoading(true);
    setFavoriteList(await getFavoriteSongs());
    setIsLoading(false);
  };

  const handleChange = (trackId:number):void => {
    const newMusicList:SongType[] = favoriteList
      .filter((music) => music.trackId !== trackId);
    setFavoriteList(newMusicList);
  };

  const isFavorite = (id:number) => {
    return favoriteList.some(({ trackId }) => trackId === id);
  };

  return (
    <div>

      {isLoading ? <Loading /> : (
        <MusicCard
          handleChange={ handleChange }
          album={ favoriteList }
          isFavorite={ isFavorite }
        />
      // favoriteList.map(({ trackId, trackName, previewUrl }) => (
      //   <div
      //     key={ trackId }
      //   >
      //     <div>
      //       <p>
      //         {trackName}
      //       </p>

      //       <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackName }>
      //         <img
      //           src={ isFavorite(trackId) ? full_heart : empty_heart }
      //           alt="favorite"
      //         />
      //         <input
      //           onChange={ () => {
      //             handleChange(trackId);
      //           } }
      //           type="checkbox"
      //           name={ trackId.toString() }
      //           id={ trackName }
      //           checked={ isFavorite(trackId) }
      //           className="input__favorites"
      //         />
      //       </label>

      //     </div>
      //     <audio data-testid="audio-component" src={ previewUrl } controls>
      //       <track kind="captions" />
      //       O seu navegador não suporta o elemento
      //       <code>audio</code>
      //       .
      //     </audio>
      //   </div>
      // ))
      )}

      {/* {favoriteList.map(({ trackId, trackName, previewUrl }) => (
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
                onChange={ () => {
                  handleChange(trackId);
                } }
                type="checkbox"
                name={ trackId.toString() }
                id={ trackName }
                checked={ isFavorite(trackId) }
                className="input__favorites"
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
      ))} */}
      {/* <MusicsList handleClick={ handleChange } album={ favoriteList } /> */}
      {/* {isLoading ? <Loading /> : <MusicsList album={ favoriteList } />} */}
    </div>

  );
}
