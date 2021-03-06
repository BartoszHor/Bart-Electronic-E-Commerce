/* selectors */
export const getAll = ({ products }) => products;

export const getProductById = ({ products }, productId) => {
  const filtered = products.filter(product => product.id === productId);
  return filtered.length ? filtered[0] : { error: true };
};

export const getProductByManufacturer = ({ products }) =>
  products.map(product => product.manufacturer);

export const getProductByPrice = ({ products }) =>
  products.map(product => product.price);

export const getPromoCategory = ({ products }) =>
  products.filter(category => category.promoCategory === true);

export const getPromo = ({ promoProducts }) => promoProducts;

export const getHotDeal = ({ products }) =>
  products.filter(product => product.hotDeal === true || product.hotDeal === false);

export const getNew = ({ products }) =>
  products.filter(item => item.newFurniture === true);

export const getCompared = ({ products }) =>
  products.filter(product => product.compare === false);

/* action name */
const createActionName = name => `products/${name}`;

/* action type */
export const ADD_TO_CART_HANDLER = createActionName('ADD_TO_CART_HANDLER');
export const CHANGE_HOTDEAL = createActionName('CHANGE_HOTDEAL');
export const SHINING_STAR = createActionName('SHINING_STAR');
export const CHANGE_STYLE = createActionName('CHANGE_STYLE');
export const COMPARE_HANDLER = createActionName('COMPARE_HANDLER');
export const COMPARE_RESET = createActionName('COMPARE_RESET');
export const REMOVE_HANDLER = createActionName('REMOVE_HANDLER');
export const HANDLE_CART_COUNTER = createActionName('HANDLE_CART_COUNTER');
export const RESET_COUNTER = createActionName('RESET_COUNTER');
export const RESET_ALL_COUNTERS = createActionName('RESET_ALL_COUNTERS');

/* action creator */
export const handleStar = payload => ({ payload, type: SHINING_STAR });
export const handleStyle = payload => ({ payload, type: CHANGE_STYLE });
export const handleCompare = payload => ({ payload, type: COMPARE_HANDLER });
export const changeHotDeal = payload => ({ payload, type: CHANGE_HOTDEAL });
export const handleRemove = payload => ({ payload, type: REMOVE_HANDLER });
export const handleAddToCart = payload => ({ payload, type: ADD_TO_CART_HANDLER });
export const compareReset = payload => ({ payload, type: COMPARE_RESET });
export const handleCartCounterChange = (value, id) => ({
  value,
  id,
  type: HANDLE_CART_COUNTER,
});
export const resetCounter = payload => ({ payload, type: RESET_COUNTER });
export const resetAllCounters = payload => ({ payload, type: RESET_ALL_COUNTERS });

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_STYLE: {
      const newStatePart = statePart.map(product => {
        if (product.id === action.payload.id) {
          product.starChange = true;
          return product;
        } else {
          return product;
        }
      });
      return newStatePart;
    }
    case HANDLE_CART_COUNTER: {
      const newStatePart = statePart.map(product => {
        if (product.id === action.id) {
          product.cartCounter = action.value;
          return product;
        } else {
          return product;
        }
      });
      return newStatePart;
    }
    case RESET_ALL_COUNTERS: {
      const newStatePart = statePart.map(product => {
        if (product.cartCounter > 0) {
          product.cartCounter = 0;
          return product;
        } else {
          return product;
        }
      });
      return newStatePart;
    }
    case RESET_COUNTER: {
      const newStatePart = statePart.map(product => {
        if (product.id === action.payload) {
          product.cartCounter = 0;
          return product;
        } else {
          return product;
        }
      });
      return newStatePart;
    }
    case SHINING_STAR: {
      const newStatePart = statePart.map(product => {
        if (product.id === action.payload.id) {
          product.stars = action.payload.ratingValue;
          return product;
        } else {
          return product;
        }
      });
      return newStatePart;
    }
    case ADD_TO_CART_HANDLER: {
      const newStatePart = statePart.map(product => {
        if (product.id === action.payload) {
          product.cartCounter = product.cartCounter + 1;
          return product;
        } else {
          return product;
        }
      });
      return newStatePart;
    }
    case CHANGE_HOTDEAL: {
      const newStatePart = statePart.map(product => {
        product.hotDeal = false;
        if (product.id === action.payload) {
          product.hotDeal = !product.hotDeal;
          return product;
        } else {
          return product;
        }
      });
      return newStatePart;
    }
    case COMPARE_HANDLER: {
      const newStatePart = statePart.filter(product => product.id === action.payload);
      newStatePart.map(product => {
        product.compare = true;
      });
      return statePart;
    }
    case COMPARE_RESET: {
      const newStatePart = statePart.filter(product => product.compare === true);
      newStatePart.map(product => {
        product.compare = false;
      });
      return statePart;
    }
    case REMOVE_HANDLER: {
      const newStatePart = statePart.map(product => {
        if (product.id === action.payload) {
          product.compare = false;
        }
        return product;
      });
      return newStatePart;
    }
    default:
      return statePart;
  }
}
