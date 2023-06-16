import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
};

const Pagination: FC<PaginationProps> = ({ currentPage, pageCount }) => {
  const pageList = Array.from(Array(pageCount).keys()).map((page) => page + 1);
  const dispatch = useAppDispatch();

  return (
    <ul className={styles.root}>
      <li
        className={styles.prev}
        onClick={() => {
          if (currentPage - 1 > 0) {
            dispatch(setCurrentPage(currentPage - 1));
          }
        }}>
        &laquo;
      </li>
      {pageList.map((pageNumber) => (
        <li
          onClick={() => {
            dispatch(setCurrentPage(pageNumber));
          }}
          key={pageNumber}
          className={pageNumber === currentPage ? styles.active : ''}>
          {pageNumber}
        </li>
      ))}
      <li
        className={styles.next}
        onClick={() => {
          if (currentPage + 1 <= pageCount) {
            dispatch(setCurrentPage(currentPage + 1));
          }
        }}>
        &raquo;
      </li>
    </ul>
  );
};

export default Pagination;
