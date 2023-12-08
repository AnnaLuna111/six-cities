import {Link} from 'react-router-dom';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

export const NotFoundPage = () => (
  <div className="page">
    <Header />
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">404. Page not found.</h1>
          <div className="favorites__status-wrapper">
            <p className="favorites__status-description">
              <Link to="/">To main page</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);
