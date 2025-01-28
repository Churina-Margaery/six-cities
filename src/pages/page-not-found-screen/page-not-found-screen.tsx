import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './page-not-found-screen.module.css';

function PageNotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Helmet>
        <title>6 sities. Page not found</title>
      </Helmet>
      <h1 className={`page page--favorites-empty ${styles.title}`}>404</h1>
      <p className={`page place-card__name ${styles.text}`}>Page does not exist</p>
      <h2 className={`page page--favorites-empty ${styles.link} ${styles.text}`}><Link to="/">Back to main page</Link></h2>
    </div>
  );
}

export default PageNotFoundScreen;
