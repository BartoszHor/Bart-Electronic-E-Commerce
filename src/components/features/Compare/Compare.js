import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Compare.module.scss';
import { FaRegWindowClose } from 'react-icons/fa';

const Compare = ({ compareProducts, handleCompareValue, compareReset }) => {
  const compareState = useSelector(state => state.compare.value);

  const [compareBox, setCompareBox] = useState(false);
  const [productOne, setProductOne] = useState([]);
  const [productOneCategory, setProductOneCategory] = useState('');
  const [productTwo, setProductTwo] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [display, setDisplay] = useState(false);

  const addProduct = e => {
    const filteredProductTwo = compareProducts.filter(
      product => product.compare === false
    );
  };

  const showDisplay = e => {
    setDisplay(!display);
    const filteredProductsTwo = compareProducts.filter(
      product => product.compare === false && product.category === productOneCategory
    );
    setFilteredProduct(filteredProductsTwo);
  };

  const chooseProduct = id => {
    setDisplay(!display);
    const secondProduct = filteredProduct.filter(product => product.id === id);
    setProductTwo(secondProduct);
  };

  const changeProductTwo = () => {
    setProductTwo([]);
  };

  const closeCompare = () => {
    setCompareBox(false);
    handleCompareValue();
    compareReset();
    setProductTwo([]);
  };
  useEffect(() => {
    setCompareBox(compareState);
    const filteredCompareProducts = compareProducts.filter(
      product => product.compare === true
    );
    setProductOne(filteredCompareProducts);
    if (filteredCompareProducts.length > 0) {
      const filteredComparedProductCategory = filteredCompareProducts[0].category;
      setProductOneCategory(filteredComparedProductCategory);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareProducts, compareState]);

  return (
    <>
      {compareBox && (
        <div className={styles.overley}>
          <div className={styles.root}>
            <h1>Compare Products</h1>
            <button className={styles.closeButton} onClick={closeCompare}>
              <FaRegWindowClose className={styles.closeIcon} />
            </button>
            <div className={styles.products}>
              {productOne.map((product, index) => {
                return (
                  <div className={styles.product} key={index}>
                    <img src={`/${product.image}`} alt={product.name} />
                    <h4>{product.name}</h4>
                    <div>
                      <p>
                        Manufacturer: <span>{product.manufacturer}</span>
                      </p>
                      <p>
                        Price: <span>{product.price} $</span>
                      </p>
                      {product.category === 'laptop' && (
                        <>
                          <p>
                            Ram: <span>{product.ram}</span>
                          </p>
                          <p>
                            Processor: <span>{product.processor}</span>
                          </p>
                          <p>
                            Graphic: <span>{product.graphic}</span>
                          </p>
                        </>
                      )}
                      {product.category === 'mouse' && (
                        <>
                          <p>
                            Mouse type: <span>{product.mouseType}</span>
                          </p>
                          <p>
                            Connection: <span>{product.connection}</span>
                          </p>
                          <p>
                            Resolution: <span>{product.resolution}</span>
                          </p>
                        </>
                      )}
                      {product.category === 'keyboard' && (
                        <>
                          <p>
                            Keyboard type: <span>{product.mouseType}</span>
                          </p>
                          <p>
                            Connection: <span>{product.connection}</span>
                          </p>
                          <p>
                            Type of switches: <span>{product.typeOfSwitches}</span>
                          </p>
                        </>
                      )}
                      {product.category === 'smartphone' && (
                        <>
                          <p>
                            Ram: <span>{product.ram}</span>
                          </p>
                          <p>
                            Processor: <span>{product.processor}</span>
                          </p>
                          <p>
                            Graphic: <span>{product.graphic}</span>
                          </p>
                        </>
                      )}
                      {product.category === 'headphone' && (
                        <>
                          <p>
                            Ram: <span>{product.ram}</span>
                          </p>
                          <p>
                            Processor: <span>{product.processor}</span>
                          </p>
                          <p>
                            Design: <span>{product.design}</span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {productTwo.length === 0 && (
                <div className={`${styles.product} ${styles.productTwo}`}>
                  <form>
                    <input
                      type='text'
                      placeholder='Search product to compare...'
                      onChange={e => addProduct(e)}
                      onFocus={e => showDisplay(e)}
                    />
                  </form>
                  {display && (
                    <div className={styles.productList}>
                      {filteredProduct.map((product, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => chooseProduct(product.id)}
                            className={styles.productTwoList}
                          >
                            {product.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className={styles.searchText}>Search product to compare</div>
                </div>
              )}
              {productTwo.map((product, index) => (
                <div key={index} className={`${styles.product} ${styles.productTwo}`}>
                  <img src={`/${product.image}`} alt={product.name} />
                  <h4>{product.name}</h4>
                  <button className={styles.newProduct} onClick={changeProductTwo}>
                    Change
                  </button>
                  <div>
                    <p>
                      Manufacturer: <span>{product.manufacturer}</span>
                    </p>
                    <p>
                      Price: <span>{product.price} $</span>
                    </p>
                    {product.category === 'laptop' && (
                      <>
                        <p>
                          Ram: <span>{product.ram}</span>
                        </p>
                        <p>
                          Processor: <span>{product.processor}</span>
                        </p>
                        <p>
                          Graphic: <span>{product.graphic}</span>
                        </p>
                      </>
                    )}
                    {product.category === 'mouse' && (
                      <>
                        <p>
                          Mouse type: <span>{product.mouseType}</span>
                        </p>
                        <p>
                          Connection: <span>{product.connection}</span>
                        </p>
                        <p>
                          Resolution: <span>{product.resolution}</span>
                        </p>
                      </>
                    )}
                    {product.category === 'keyboard' && (
                      <>
                        <p>
                          Keyboard type: <span>{product.mouseType}</span>
                        </p>
                        <p>
                          Connection: <span>{product.connection}</span>
                        </p>
                        <p>
                          Type of switches: <span>{product.typeOfSwitches}</span>
                        </p>
                      </>
                    )}
                    {product.category === 'smartphone' && (
                      <>
                        <p>
                          Ram: <span>{product.ram}</span>
                        </p>
                        <p>
                          Processor: <span>{product.processor}</span>
                        </p>
                        <p>
                          Graphic: <span>{product.graphic}</span>
                        </p>
                      </>
                    )}
                    {product.category === 'headphone' && (
                      <>
                        <p>
                          Ram: <span>{product.ram}</span>
                        </p>
                        <p>
                          Processor: <span>{product.processor}</span>
                        </p>
                        <p>
                          Design: <span>{product.design}</span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Compare.propTypes = {
  products: PropTypes.array,
  compareProducts: PropTypes.array,
  compareValue: PropTypes.object,
  handleCompareValue: PropTypes.func,
  compareReset: PropTypes.func,
};

export default Compare;
