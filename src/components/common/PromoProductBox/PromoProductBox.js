import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Stars from '../Stars/Stars';
import HappyHourAd from '../../features/HappyHourAd/HappyHourAd';
import styles from './PromoProductBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

class PromoProductBox extends React.Component {
  handleAddToCart(id) {
    this.props.handleAddToCart(id);
  }

  compareHandler(id) {
    this.props.handleCompare(id);
    this.props.handleCompareValue();
  }

  render() {
    const {
      id,
      name,
      price,
      olderPrice,
      image,
      imageAlt,
      handleStar,
      handleStyle,
      starChange,
      stars,
      handleAddToCart,
    } = this.props;

    return (
      <div className={styles.root}>
        <div className={`${styles.photo}`}>
          <img src={image} alt={imageAlt} />
        </div>
        <div className={styles.happyHour}>
          <HappyHourAd />
        </div>
        <div className={styles.content}>
          <h5>{name}</h5>
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
            <Button
              className={styles.basket}
              variant='outline'
              onClick={() => this.handleAddToCart(id)}
            >
              <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon>
            </Button>
            <Button variant='outline' onClick={() => this.compareHandler(id)}>
              <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
            </Button>
          </div>
          <div className={styles.olderPrice}>
            <span className='text-right'>{olderPrice}</span>
          </div>
          <div className={styles.price}>
            <Button noHover variant='small'>
              <h5>$ {price}</h5>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

PromoProductBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  olderPrice: PropTypes.number,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  handleStar: PropTypes.func,
  handleStyle: PropTypes.func,
  starChange: PropTypes.func,
  stars: PropTypes.number,
  handleAddToCart: PropTypes.func,
  handleCompare: PropTypes.func,
  handleCompareValue: PropTypes.func,
};

export default PromoProductBox;
