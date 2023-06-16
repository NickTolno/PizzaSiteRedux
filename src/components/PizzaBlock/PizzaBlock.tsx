import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ICartItem } from '../../@types/cartSliceTypes';
import { useAppSelector } from '../../hooks';
import { addItemToCart } from '../../redux/slices/cartSlice';

import styles from './PizzaBlock.module.scss';

export type TypeItem = {
  id: number;
  name: string;
};

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  type: number;
  size: number;
  price: number;
};

const PizzaBlock: FC<PizzaBlockProps> = ({ id, imageUrl, title, type, size, price }) => {
  const dispatch = useDispatch();
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
        id,
        imageUrl,
        title,
        type: typesList[type].name,
        size,
        price,
        count: 1,
      }),
    );
  };
  const count = cartItem ? cartItem.count : 0;

  return (
    <div className={styles.pizzaBlock}>
      <Link to={`/pizza/` + id}>
        <img className={styles.image} src={imageUrl} alt={title} />
        <h4 className={styles.title}>{title}</h4>
      </Link>
      <div className={styles.selector}>
        <div>
          {typesList[type].name} {t('dough')}
        </div>
        <div>
          {t('pizzaSize')}: {size} {t('pizzaSizeCm')}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>{price} ₽</div>
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

export default PizzaBlock;
