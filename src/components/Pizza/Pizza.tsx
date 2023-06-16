import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ICartItem } from '../../@types/cartSliceTypes';
import { EPizzaSliceStatus } from '../../@types/pizzaSliceTypes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { fetchPizza } from '../../redux/slices/pizzaItemSlice';
import { TypeItem } from '../PizzaBlock/PizzaBlock';

import styles from './Pizza.module.scss';

const Pizza: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pizza, status } = useAppSelector((state) => state.pizzaItem);
  const currentLanguage = useAppSelector((state) => state.filter.currentLanguage);
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item: ICartItem) => item.id === id),
  );
  const { t } = useTranslation();

  const typesList: TypeItem[] = [
    { id: 0, name: t('typesList0') },
    { id: 1, name: t('typesList1') },
  ];

  const addToCart = () => {
    dispatch(
      addItemToCart({
        id: pizza.id,
        imageUrl: pizza.imageUrl,
        title: pizza.title,
        type: typesList[pizza.type].name,
        size: pizza.size,
        price: pizza.price,
        count: 1,
      }),
    );
  };
  const count = cartItem ? cartItem.count : 0;

  useEffect(() => {
    if (id) {
      dispatch(fetchPizza({ id, currentLanguage }));
    }
  }, []);

  if (status === EPizzaSliceStatus.Error) {
    navigate('/');
  }

  if (status === EPizzaSliceStatus.Loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={pizza.imageUrl} alt="" />
      </div>
      <div className={styles.info}>
        <h1>{pizza.title}</h1>

        <div>
          {typesList[pizza.type].name} {t('dough')}
        </div>
        <div>
          {t('pizzaSize')}: {pizza.size} {t('pizzaSizeCm')}
        </div>
        <p className={styles.price}>
          {t('price')} {pizza.price} ₽
        </p>
        <button onClick={addToCart} className={styles.button}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>{t('addButton')}</span>
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
};

export default Pizza;
