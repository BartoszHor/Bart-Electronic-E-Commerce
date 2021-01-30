import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductPage.module.scss';
import Button from '../../common/Button/Button';
import Stars from '../../common/Stars/StarsContainer';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import {
  faChevronLeft,
  faChevronRight,
  faShoppingBasket,
  faExchangeAlt,
  faEnvelope,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
  faPinterestP,
} from '@fortawesome/free-brands-svg-icons';
import ProductMore from '../../common/ProductMore/ProductMoreContainer';
import { useEffect } from 'react';

const ProductPage = ({
  overview,
  quantity,
  category,
  products,
  handleAddToCart,
  handleCompareValue,
  handleCompare,
}) => {
  var availability = 'Unavailable';
  if (quantity > 0) {
    availability = `In Stock(${quantity})`;
  }

  const location = useLocation();
  const currentProduct = location.state.id;
  const [count, setCount] = useState(quantity);
  const [olderVisable, setOlderVisable] = useState(true);
  const [currentItem, setCurrentItem] = useState([]);
  const firstProduct = products.filter(product => {
    return product.id === 'bart-electronic-laptop-1';
  });
  const lastProduct = products.filter(product => {
    return product.id === 'bart-electronic-headphone-24';
  });
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const filteredProduct = products.filter(product => {
      return product.id === currentProduct;
    });
    setCurrentItem(filteredProduct);
  }, [currentProduct, products]);

  const handleIncrease = quantity => {
    setOlderVisable(false);
    if (quantity >= 0 && quantity < 10) {
      setCount(quantity + 1);
    }
  };

  const handleDecrease = quantity => {
    setOlderVisable(false);
    if (quantity > 0) {
      setCount(quantity - 1);
    }
  };

  const handleChange = value => {
    setOlderVisable(false);
    if (quantity > 0) {
      setCount(value);
    } else if (quantity === 0) {
      setCount(value);
    }
  };

  const nextProduct = () => {
    const index = products.indexOf(currentItem[0]);
    const nextItem = products[index + 1];
    if (nextItem === undefined) {
      setCurrentItem(lastProduct);
    } else {
      setActiveImage(0);
      setCurrentItem([nextItem]);
      setOlderVisable(true);
      setCount(1);
    }
  };

  const previousProduct = () => {
    const index = products.indexOf(currentItem[0]);
    const previousItem = products[index - 1];
    if (previousItem === undefined) {
      setCurrentItem(firstProduct);
    } else {
      setActiveImage(0);
      setCurrentItem([previousItem]);
      setOlderVisable(true);
      setCount(1);
    }
  };

  const previousPhoto = () => {
    if (activeImage === 0) {
      setActiveImage(2);
    } else {
      setActiveImage(activeImage - 1);
    }
  };

  const nextPhoto = () => {
    if (activeImage === 2) {
      setActiveImage(0);
    } else {
      setActiveImage(activeImage + 1);
    }
  };

  const addToCart = () => {
    handleAddToCart(currentItem[0].id);
  };

  const compareHandler = () => {
    handleCompare(currentItem[0].id);
    handleCompareValue();
  };

  return (
    <div className={styles.root}>
      {currentItem.map((product, index) => {
        return (
          <Grid key={index}>
            <Row className={styles.panelBar}>
              <Col className={styles.heading}>
                <h3 className={styles.categoryIdentyfier}>
                  Electronic {'> '} {product.category} {'> '} {product.name}
                </h3>
              </Col>
            </Row>
            <div className={styles.productBox}>
              <Row className={styles.mainRow}>
                <Col sm={12} md={6} className={styles.photoWrapper}>
                  <Row>
                    <Col sm={12}>
                      <p className={styles.activeImage}>Image {activeImage}</p>
                      <img
                        className={styles.mainPhoto}
                        src={`../${product.image}`}
                        alt={product.category}
                      ></img>
                    </Col>
                  </Row>
                  <Row className={styles.miniSliderWrapper}>
                    <Col sm={12} className={styles.miniSlider}>
                      <Button
                        onClick={() => {
                          previousPhoto();
                        }}
                        variant='outlineYellow'
                        className={styles.button}
                      >
                        <FontAwesomeIcon icon={faChevronLeft}>Favorite</FontAwesomeIcon>
                      </Button>
                      {[1, 2, 3].map((item, i) => {
                        const preparedClass =
                          i === activeImage ? styles.photoActive : '';
                        return (
                          <div key={i}>
                            <img
                              className={`${styles.photo} ${preparedClass}`}
                              src={`../${product.image}`}
                              alt={product.image}
                            ></img>
                          </div>
                        );
                      })}
                      <Button
                        onClick={() => {
                          nextPhoto();
                        }}
                        variant='outlineYellow'
                        className={styles.button}
                      >
                        <FontAwesomeIcon icon={faChevronRight}>
                          Favorite
                        </FontAwesomeIcon>
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} md={6}>
                  <div className={styles.productDetailsSection}>
                    <Row className={styles.headerRow}>
                      <Col>
                        <h5>{product.name}</h5>
                        <p>From {product.manufacturer}</p>
                      </Col>
                      <Col>
                        <Button
                          variant='outlineYellow'
                          onClick={() => {
                            previousProduct();
                          }}
                        >
                          <FontAwesomeIcon icon={faChevronLeft}>
                            Favorite
                          </FontAwesomeIcon>
                        </Button>
                        <Button
                          variant='outlineYellow'
                          onClick={() => {
                            nextProduct();
                          }}
                        >
                          <FontAwesomeIcon icon={faChevronRight}>
                            Favorite
                          </FontAwesomeIcon>
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className={styles.review}>
                          <Stars
                            rate={product.stars}
                            handleStar={() => {}}
                            handleStyle={() => {}}
                          />
                          <p>(0 reviews)</p>
                          <Link to={`/product/${product.id}/review`}>
                            <Button variant='outline'>Add your review</Button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.productDetailsSection}>
                    <Row>
                      <div className={styles.quantity}>
                        <p>Quantity</p>
                        <input
                          onChange={e => handleChange(parseInt(e.target.value))}
                          className={styles.inputSmall}
                          type='number'
                          value={count}
                        ></input>
                        <Button
                          variant='outlineYellow'
                          onClick={() => handleDecrease(count)}
                        >
                          <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                        </Button>
                        <Button
                          variant='outlineYellow'
                          onClick={() => handleIncrease(count)}
                        >
                          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </Button>
                      </div>
                      <div className={styles.priceWrapper}>
                        {product.olderPrice && olderVisable ? (
                          <div className={styles.olderPrice}>{product.olderPrice}$</div>
                        ) : (
                          ''
                        )}
                        <div className={styles.price}>
                          <span>
                            {count >= 0 ? count * product.price : setCount('')}$
                          </span>
                        </div>
                      </div>
                    </Row>
                  </div>
                  <div className={styles.productDetailsSection}>
                    <Row>
                      <div>
                        <div className={styles.buttons}>
                          <Button variant='outlineYellow' onClick={addToCart}>
                            <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon>{' '}
                            ADD TO CART
                          </Button>
                          <Button variant='outlineYellow' onClick={compareHandler}>
                            <FontAwesomeIcon icon={faExchangeAlt} />
                          </Button>
                          <Button variant='outlineYellow'>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </Button>
                        </div>
                      </div>
                    </Row>
                  </div>
                  <div className={styles.productDetailsSection}>
                    <Row>
                      <p>
                        <span>Quick Overview</span>
                        <br />
                        {overview}
                      </p>
                    </Row>
                  </div>
                  <div className={styles.productDetailsSection}>
                    <Row>
                      <p>
                        <span>
                          Availability:{' '}
                          <span className={styles.availability}>{availability}</span>{' '}
                        </span>
                      </p>
                    </Row>
                    <Row>
                      <p>
                        <span>
                          Category:{' '}
                          {product.category.charAt(0).toUpperCase() + category.slice(1)}{' '}
                        </span>
                      </p>
                    </Row>
                  </div>
                  <div className={styles.productDetailsSection}>
                    <Row>
                      <div>
                        <div className={styles.social}>
                          <Link
                            to='/'
                            onClick={e => {
                              e.preventDefault();
                              window.open('https://www.facebook.com/');
                            }}
                          >
                            <Button className={styles.media} variant='outlineFacebook'>
                              <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
                              Share
                            </Button>
                          </Link>
                          <Link
                            to='/'
                            onClick={e => {
                              e.preventDefault();
                              window.open('https://www.gmail.com/');
                            }}
                          >
                            <Button className={styles.media} variant='outlineGoogle'>
                              <FontAwesomeIcon
                                icon={faGooglePlusG}
                                className={styles.googleplus}
                              ></FontAwesomeIcon>{' '}
                              Google+
                            </Button>
                          </Link>
                          <Link
                            to='/'
                            onClick={e => {
                              e.preventDefault();
                              window.open('https://www.twitter.com/');
                            }}
                          >
                            <Button className={styles.media} variant='outlineTwitter'>
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className={styles.twitter}
                              ></FontAwesomeIcon>{' '}
                              Twitter
                            </Button>
                          </Link>
                          <Link
                            to='/'
                            onClick={e => {
                              e.preventDefault();
                              window.open('https://www.pinterest.com/');
                            }}
                          >
                            <Button className={styles.media} variant='outlinePinterest'>
                              <FontAwesomeIcon
                                icon={faPinterestP}
                                className={styles.pinterest}
                              ></FontAwesomeIcon>{' '}
                              Pinterest
                            </Button>
                          </Link>
                          <Link
                            to='/'
                            onClick={e => {
                              e.preventDefault();
                              window.open('https://www.linkedin.com/');
                            }}
                          >
                            <Button className={styles.media} variant='outlineLinkedIn'>
                              <FontAwesomeIcon
                                icon={faLinkedinIn}
                                className={styles.linkedin}
                              ></FontAwesomeIcon>{' '}
                              LinkedIn
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Grid>
        );
      })}

      <ProductMore />
    </div>
  );
};

ProductPage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  olderPrice: PropTypes.number,
  overview: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string,
  products: PropTypes.array,
  handleAddToCart: PropTypes.func,
  handleCompare: PropTypes.func,
  handleCompareValue: PropTypes.func,
};

export default ProductPage;
