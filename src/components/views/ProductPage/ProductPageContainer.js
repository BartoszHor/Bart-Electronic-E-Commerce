import { connect } from 'react-redux';
import ProductPage from './ProductPage';
import {
  getProductById,
  getAll,
  handleAddToCart,
  handleCompare,
} from '../../../redux/productsRedux';
import { handleCompareValue } from '../../../redux/compareRedux';

const imageName = image => {
  if (image.startsWith('http')) {
    return image;
  } else {
    return '../' + image;
  }
};

const mapStateToProps = (state, props) => {
  const product = getProductById(state, props.match.params.productId);

  return {
    ...product,
    image: imageName(product.image),
    products: getAll(state),
  };
};

const mapDispatchToProps = dispatch => ({
  handleAddToCart: value => dispatch(handleAddToCart(value)),
  handleCompare: value => dispatch(handleCompare(value)),
  handleCompareValue: value => dispatch(handleCompareValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
