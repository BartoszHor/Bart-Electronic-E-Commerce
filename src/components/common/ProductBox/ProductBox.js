import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ProductBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import Stars from '../Stars/StarsContainer';
import { handleAddToCart } from '../../../redux/productsRedux';

const ProductBox = ({
  image,
  name,
  price,
  promo,
  heart,
  stars,
  olderPrice,
  handleAddToCart,
  id,
  handleStar,
  handleStyle,
  starChange,
  handleCompare,
  compare,
  manufacturer,
  handleCompareValue,
}) => {
  const addToCart = () => {
    handleAddToCart(id);
  };

  const compareHandler = e => {
    e.preventDefault();
    handleCompare(id);
    handleCompareValue();
  };

  return (
    <div className={styles.root}>
      <Link to={{ pathname: `/product/${id}`, state: { id } }}>
        <div className={styles.photo}>
          <img
            src={
              process.env.NODE_ENV === 'production'
                ? `https://bartoszhor.github.io/Bart-Electronic-E-Commerce/${image}`
                : `../${image}`
            }
            alt=''
          />
          {promo && <div className={styles.sale}>{promo}</div>}
          <div className={styles.buttons}>
            <div to='/' className={styles.quickView}>
              <Button variant='small' className={styles.quickView}>
                Quick View
              </Button>
            </div>
            <div to='/' className={styles.quickView}>
              <Button variant='small' className={styles.quickView}>
                <FontAwesomeIcon icon={faShoppingBasket}> </FontAwesomeIcon> ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.content}>
        <Link to={{ pathname: `/product/${id}`, state: { id } }}>
          <h5>{name}</h5>
        </Link>
        <p className={styles.manufacturer}>by {manufacturer}</p>
        <Stars
          rate={stars}
          handleStar={handleStar}
          id={id}
          handleStyle={handleStyle}
          starChange={starChange}
        />
      </div>
      <div className={styles.line}> </div>
      <div className={styles.actions}>
        <div className={styles.outline}>
          <Button className={styles.basket} variant='outline' onClick={addToCart}>
            <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon>
          </Button>
        </div>
        <div className={styles.outline}>
          <Button
            className={compare ? styles.compare : ' '}
            variant='outline'
            onClick={compareHandler}
          >
            <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
          </Button>
        </div>
        <div className={styles.price}>
          <Button noHover className={styles.button} variant='small'>
            <h5>$ {price}</h5>
          </Button>
          <div className={styles.olderPrice}>
            <span className='text-right'>{olderPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductBox.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  name: PropTypes.string,
  price: PropTypes.number,
  olderPrice: PropTypes.number,
  promo: PropTypes.string,
  stars: PropTypes.number,
  image: PropTypes.node,
  handleFavourite: PropTypes.func,
  handleCompare: PropTypes.func,
  heart: PropTypes.bool,
  handleStar: PropTypes.func,
  handleStyle: PropTypes.func,
  starChange: PropTypes.bool,
  compare: PropTypes.bool,
  arrow: PropTypes.bool,
  manufacturer: PropTypes.string,
  handleCompareValue: PropTypes.func,
  handleAddToCart: PropTypes.func,
};

export default ProductBox;
