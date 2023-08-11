import React, { useState } from 'react';
import { AlbumType, HandleType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading/Loading';
import AlbunsList from '../../components/albunsList/AlbunsList';
import gp5 from '../../images/Group 5.svg';
import gp6 from '../../images/Group 6.svg';
import './search.css';

export default function Search() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showListAlbuns, setShowListAlbuns] = useState<boolean>(false);

  const [ListAlbuns, setListAlbuns] = useState<AlbumType[]>([]);

  const [artistName, setArtistName] = useState<string>('');
  const [artist, setArtist] = useState<string>('');

  const handleChange = ({ target: { value } }:HandleType) => {
    setArtistName(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    setArtist(artistName);
    setArtistName('');
    const arrayAlbuns:AlbumType[] = await searchAlbumsAPI(artistName);
    setListAlbuns(arrayAlbuns);
    setIsLoading(false);
    setShowListAlbuns(true);
  };

  const disabledButton = () => artistName.length >= 2;

  return (
    <div className="search-container">
      <form
        className="form-search-box"
        onSubmit={ (event) => {
          handleSubmit(event);
        } }
      >
        <div className="big-circle-search"> </div>

        <div className="small-circle-search"> </div>

        <img className="gp-5-icon-search" src={ gp5 } alt="grupo 5 icone" />
        <img className="gp-6-icon-search" src={ gp6 } alt="grupo 6 icone" />

        <input
          className="input-search"
          onChange={ handleChange }
          name="artistName"
          value={ artistName }
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          type="text"
        />
        <button
          className="btn-search"
          disabled={ !disabledButton() }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>
      {isLoading && <Loading />}

      {showListAlbuns && <AlbunsList artist={ artist } listAlbuns={ ListAlbuns } />}

    </div>
  );
}
