import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Categories from '../Categories/Categories';
import PizzaItems from '../PizzaItems/PizzaItems';
import Sort from '../Sort/Sort';
import styles from './Catalog.module.scss';

const Catalog: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.top}>
        <Categories />
        <Sort />
      </div>
      <h2 className={styles.title}>{t('catalogPageTitle')}</h2>
      <PizzaItems />
    </>
  );
};

export default Catalog;
