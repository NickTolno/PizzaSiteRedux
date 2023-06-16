import React, { FC, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import CartButton from '../CartButton/CartButton';
import Languages from '../Languages/Languages';

import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import styles from './Header.module.scss';

const Header: FC = () => {
  const location = useLocation();
  const { items, totalCount, totalPrice } = useAppSelector((state) => state.cart);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const cartItemsString = JSON.stringify(items);
      const totalCountString = totalCount.toString();
      const totalPriceString = totalPrice.toString();
      localStorage.setItem('cartItems', cartItemsString);
      localStorage.setItem('cartTotalCount', totalCountString);
      localStorage.setItem('cartTotalPrice', totalPriceString);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        {location.pathname === '/' && <Search />}
        <Languages />
        <CartButton />
      </div>
    </header>
  );
};

export default Header;
