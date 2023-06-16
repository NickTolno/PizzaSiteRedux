import debounce from 'lodash.debounce';
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

const Search: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setSearchValue(''));
  }, []);

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 250),
    [],
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <input
      className={styles.search}
      value={inputValue}
      onChange={onChangeInput}
      type="text"
      placeholder={t('search')}
    />
  );
};

export default Search;
