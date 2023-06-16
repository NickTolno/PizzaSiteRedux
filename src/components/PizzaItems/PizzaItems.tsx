import React, { FC, useEffect } from 'react';
import { fetchPizzas } from '../../redux/slices/pizzasSlice';
import Pagination from '../Pagination/Pagination';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import { EPizzaSliceStatus, IPizzaBlock } from '../../@types/pizzaSliceTypes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFoundBlock from '../NotFoundBlock/NotFoundBlock';

import styles from './PizzaItems.module.scss';

const PizzaItems: FC = () => {
  const { pizzasList, status } = useAppSelector((state) => state.pizzas);
  const { sortType, categoryId, searchValue, currentPage, currentLanguage } = useAppSelector(
    (state) => state.filter,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPizzas({ sortType, categoryId, searchValue, currentPage, currentLanguage }));

    window.scrollTo(0, 0);
  }, [sortType, categoryId, searchValue, currentPage, currentLanguage]);

  if (status === EPizzaSliceStatus.Error) {
    return <div>{status}</div>;
  }

  let pizzas;

  if (pizzasList.length) {
    pizzas = pizzasList.map((pizzaItem: IPizzaBlock) => (
      <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
    ));
  } else {
    pizzas = <NotFoundBlock />;
  }
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className={styles.items}>
        {status === EPizzaSliceStatus.Loading ? skeletons : pizzas}
      </div>
      <Pagination currentPage={currentPage} pageCount={3} />
    </>
  );
};

export default PizzaItems;
