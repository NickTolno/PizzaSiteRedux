import { t } from 'i18next';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1>{t('nothingFound')} :C</h1>
    </div>
  );
};

export default NotFoundBlock;
