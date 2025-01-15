import { Link } from 'react-router-dom';

function PageNotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <h1>404</h1>
      <p>Page does not exist</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

export default PageNotFoundScreen;
