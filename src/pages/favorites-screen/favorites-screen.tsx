import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesList from '../../components/favorites-list/favorites-list';


function FavoritesScreen(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <Header></Header>

      <main className="page__main page__main--favorites">
        <FavoritesList></FavoritesList>
      </main >
      <Footer></Footer>
    </div >
  );
}

export default FavoritesScreen;
