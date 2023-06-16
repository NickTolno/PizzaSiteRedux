import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={599}
    viewBox="0 0 280 599"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="130" r="130" />
    <rect x="10" y="270" rx="10" ry="10" width="260" height="30" />
    <rect x="10" y="320" rx="0" ry="0" width="260" height="90" />
    <rect x="10" y="435" rx="0" ry="0" width="105" height="32" />
    <rect x="135" y="430" rx="0" ry="0" width="134" height="50" />
  </ContentLoader>
);

export default Skeleton;
