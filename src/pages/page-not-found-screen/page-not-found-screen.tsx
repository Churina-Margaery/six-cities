import { Link } from 'react-router-dom';

function PageNotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <h1 className="places__found">404</h1>
      <p className="places__found">Page does not exist</p>
      <h2 className="place-card__name"><Link to="/">Вернуться на главную</Link></h2>
    </div>
  );
}

export default PageNotFoundScreen;
