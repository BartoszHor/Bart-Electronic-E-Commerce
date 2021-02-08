import { connect } from 'react-redux';

import Electronics from './Electronics';

import { getAll } from '../../../redux/categoriesRedux.js';
import { getNew } from '../../../redux/productsRedux.js';
import { getAllBrands } from '../../../redux/brandsRedux.js';

const mapStateToProps = state => ({
  categories: getAll(state),
  products: getNew(state),
  brands: getAllBrands(state),
});

export default connect(mapStateToProps)(Electronics);
