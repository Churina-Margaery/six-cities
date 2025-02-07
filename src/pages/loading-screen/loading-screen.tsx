import { CircleLoader } from 'react-spinners';

function LoadingScreen(): JSX.Element {
  return (

    <div className="page page--gray page--main">

      <main className="page__main page__main--index page__main--index-empty">
        <div className="spinner-container">

          <b className="places__found">Loading...</b>
          <CircleLoader color="#808080" size={40} />
        </div>
      </main>
    </div>
  );
}

export default LoadingScreen;
