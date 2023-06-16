import { Routes, Route } from 'react-router-dom';

import CatalogPage from './pages/CatalogPage';
import Header from './components/Header/Header';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFoundPage';
import PizzaPage from './pages/PizzaPage';
import styles from './scss/App.module.scss';

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/pizza/:id" element={<PizzaPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
