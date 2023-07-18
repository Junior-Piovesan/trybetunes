import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';

export default function Album() {
  const [musics, setMusics] = useState<SongType []>([]);
  const params = useParams<{ id:string }>();

  useEffect(() => {
    getListMusics();
  }, []);

  const getListMusics = async () => {
    const musicsList: any = await getMusics(params.id || '');
    setMusics(musicsList);

    console.log(await getMusics(params.id || ''));

    setMusics(musicsList);
  };

  return (
    <div>Album</div>
  );
}
