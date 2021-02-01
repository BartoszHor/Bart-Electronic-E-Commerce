import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sale from '../../common/Sale/SaleContainer';
import Compare from '../../features/Compare/CompareContainer';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <Sale />
      <Compare />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
