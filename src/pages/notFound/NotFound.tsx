import gr5 from '../../images/Group 5.svg';
import gr6 from '../../images/Group 6.svg';
import './notFound.css';

export default function NotFound() {
  return (
    <div className="notFound-container">

      <div className="big-circle-not-found"> </div>
      <div className="small-circle-not-found"> </div>

      <img className="gp5-not-found" src={ gr5 } alt="Grupo 5 icon" />
      <img className="gp6-not-found" src={ gr6 } alt="Grupo 6 icon" />

      <h2 className="title-not-found">Ops!</h2>
      <p className="phrase-not-found">
        A página que você está procurando não foi encontrada.
      </p>
    </div>
  );
}
