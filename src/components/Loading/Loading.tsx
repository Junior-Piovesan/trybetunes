import { ScaleLoader } from 'react-spinners';
import './loading.css';

export default function Loading() {
  return (
    <div className="loading-container">

      <h2 className="loading-text">Carregando...</h2>
      <ScaleLoader
        color="#36d7b7"
        height={ 40 }
        width={ 4 }
      />
    </div>
  );
}
