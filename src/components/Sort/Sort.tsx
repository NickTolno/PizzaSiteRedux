import Cookies from 'js-cookie';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setSortType } from '../../redux/slices/filterSlice';

import styles from './Sort.module.scss';

const Sort: FC = () => {
  const currentSort = useAppSelector((state) => state.filter.sortType);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sortList = [
    { name: t('sortList0'), sort: 'rating' },
    { name: t('sortList1'), sort: 'price' },
    { name: t('sortList2'), sort: 'title' },
  ];
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const selectSort = (sortIndex: number) => {
    dispatch(setSortType(sortList[sortIndex]));
    setOpen(false);
  };
  useEffect(() => {
    dispatch(setSortType({ name: t('sortList0'), sort: 'rating' }));
  }, [Cookies.get('i18next')]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.label}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <p>{t('sortBy')}:</p>
        <span onClick={() => setOpen(!open)}>{currentSort.name}</span>
      </div>
      {open && (
        <div className={styles.popup}>
          <ul>
            {sortList.map((sort, i) => (
              <li
                key={i}
                className={sort.name === currentSort.name ? styles.active : ''}
                onClick={() => selectSort(i)}>
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
