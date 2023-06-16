// @ts-nocheck
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCategoryId } from '../../redux/slices/filterSlice';

import styles from './Categories.module.scss';

type CategoryItem = {
  id: number;
  name: string;
};

const Categories: FC = () => {
  const activeCategory = useAppSelector((state) => state.filter.categoryId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const categoriesList: CategoryItem[] = [
    { id: 0, name: t('categories0') },
    { id: 1, name: t('categories1') },
    { id: 2, name: t('categories2') },
    { id: 3, name: t('categories3') },
    { id: 4, name: t('categories4') },
    { id: 5, name: t('categories5') },
  ];

  return (
    <div className={styles.categories}>
      <ul>
        {categoriesList.map((cat) => (
          <li
            key={cat.id}
            className={activeCategory === cat.id ? styles.active : ''}
            onClick={() => dispatch(setCategoryId(cat.id))}>
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
