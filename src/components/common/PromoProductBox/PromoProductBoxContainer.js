import { connect } from 'react-redux';
import PromoProductBox from './PromoProductBox';
import {
  getNew,
  getHotDeal,
  handleStar,
  handleStyle,
  handleCompare,
  handleAddToCart,
} from '../../../redux/productsRedux';
import { handleCompareValue } from '../../../redux/compareRedux';
import { getAll } from '../../../redux/categoriesRedux.js';

const mapStateToProps = state => ({
  categories: getAll(state),
  products: getNew(state),
  hotDeal: getHotDeal(state),
});

const mapDispatchToProps = dispatch => ({
  handleStar: value => dispatch(handleStar(value)),
  handleStyle: value => dispatch(handleStyle(value)),
  handleCompare: value => dispatch(handleCompare(value)),
  handleAddToCart: value => dispatch(handleAddToCart(value)),
  handleCompareValue: value => dispatch(handleCompareValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromoProductBox);
