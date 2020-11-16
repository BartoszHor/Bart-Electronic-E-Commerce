import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './ProductBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import Stars from '../Stars/StarsContainer';

const ProductBox = ({
  name,
  price,
  promo,
  heart,
  arrow,
  stars,
  olderPrice,
  handleFavourite,
  id,
  handleStar,
  handleStyle,
  starChange,
  handleCompare,
  compare,
}) => {
  const favouriteHandler = e => {
    e.preventDefault();
    handleFavourite(id);
  };
  const compareHandler = e => {
    e.preventDefault();
    handleCompare(id);
  };
  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        {promo && <div className={styles.sale}>{promo}</div>}
        <div className={styles.buttons}>
          <Button variant='small'>Quick View</Button>
          <Button variant='small'>
            <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon> ADD TO CART
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <Link to={`/product/${id}`}>
          <h5>{name}</h5>
        </Link>
        <Stars
          rate={stars}
          handleStar={handleStar}
          id={id}
          handleStyle={handleStyle}
          starChange={starChange}
        />
      </div>
      <div className={styles.line}></div>
      <div className={styles.actions}>
        <div className={styles.outlines}>
          <Button variant='outline' className={heart ? styles.heart : ''}>
            <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
          </Button>
          <Button
            className={compare ? styles.compare : ' '}
            variant='outline'
            onClick={compareHandler}
          >
            <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
          </Button>
        </div>
        <div className={styles.line}></div>
        <div className={styles.actions}>
          <div className={styles.outlines}>
            <Button
              className={heart ? styles.heart : ' '}
              variant='outline'
              onClick={favouriteHandler}
            >
              <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
            </Button>
            <Button variant='outline'>
              <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
            </Button>
          </div>
          <div className={styles.olderPrice}>{olderPrice}</div>
          <div className={styles.price}>
            <Button noHover variant='small'>
              $ {price}
            </Button>
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
  handleFavourite: PropTypes.func.isRequired,
  handleCompare: PropTypes.func.isRequired,
  heart: PropTypes.bool,
  handleStar: PropTypes.func,
  handleStyle: PropTypes.func,
  starChange: PropTypes.bool,
  compare: PropTypes.bool,
  arrow: PropTypes.bool,
};

export default ProductBox;
