import React, { useState, useEffect } from 'react';
import styles from './Cart.module.scss';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Button from '../../common/Button/Button';
import PropTypes from 'prop-types';

const Cart = ({
  products,
  handleCartCounterChange,
  resetCounter,
  resetAllCounters,
}) => {
  const [allProducts, setAllProducts] = useState(products);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const filteredCartProducts = allProducts.filter(product => product.cartCounter > 0);
    setCartProducts(filteredCartProducts);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  const buildOptions = () => {
    const arr = [];

    for (let i = 1; i <= 10; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return arr;
  };

  const handleRemove = id => {
    const newProducts = cartProducts.filter(product => product.id !== id);
    setCartProducts(newProducts);
    resetCounter(id);
  };

  const deleteProducts = () => {
    setCartProducts([]);
    resetAllCounters();
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>
          <h5 className={styles.cartHeader}> Cart </h5>
        </div>
        <div>
          <Button onClick={deleteProducts} className={styles.productRemover}>
            <RiDeleteBin6Fill className={styles.closeIcon} />
            <span>Remove Items</span>
          </Button>
        </div>
      </div>
      <div className={styles.productContainer}>
        {cartProducts.length === 0 && (
          <div className={styles.emptyCart}>Your Cart is empty!</div>
        )}
        {cartProducts.map((product, id) => {
          const sumPrice = product.price * product.cartCounter;
          return (
            <div key={id} className={styles.option}>
              <img className={styles.image} src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <span className={styles.price}>{sumPrice}$</span>
              <form>
                <select
                  onChange={e => {
                    handleCartCounterChange(parseInt(e.target.value), product.id);
                  }}
                  value={product.cartCounter}
                >
                  {buildOptions()}
                </select>
              </form>
              <Button
                onClick={() => {
                  handleRemove(product.id);
                }}
              >
                <RiDeleteBin6Fill className={styles.closeIcon} />
              </Button>
            </div>
          );
        })}
        <div className={styles.summaryWrapper}>
          <div className={styles.summary}>
            <div className={styles.total}>
              Total:{' '}
              <span>
                {cartProducts.length > 0
                  ? cartProducts
                      .map(product => product.price * product.cartCounter)
                      .reduce((a, b) => a + b)
                  : 0}{' '}
              </span>
            </div>
            <Button variant='outlineYellow'> Confirm Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.array,
  handleCartCounterChange: PropTypes.func,
  resetAllCounters: PropTypes.func,
  resetCounter: PropTypes.func,
};

export default Cart;
