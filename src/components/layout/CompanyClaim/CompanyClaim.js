import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CompanyClaim.module.scss';
import BurgerMenu from '../../features/BurgerMenu/BurgerMenuContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMobileAlt,
  faShoppingBasket,
  faUser,
  faSignOutAlt,
  faUserCog,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from '../../../data/userData';
import { Link } from 'react-router-dom';

const CompanyClaim = ({ products }) => {
  const user = React.useContext(UserContext);
  const [width, setWidth] = useState(window.innerWidth);
  const [counter, setCounter] = useState(0);

  const handleLogout = () => {
    localStorage.setItem('isLogged', 'false');
    window.location.reload(false);
  };

  useEffect(() => {
    cartCounter();
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, products]);

  const cartCounter = () => {
    const sum = products
      .filter(product => product.cartCounter > 0)
      .map(product => product.cartCounter)
      .reduce((a, b) => a + b, 0);
    setCounter(sum);
  };

  return (
    <div className={styles.root}>
      <div className={`row align-items-center ${styles.compRow}`}>
        <div className={styles.burgerWrapper}>
          <Router>
            <BurgerMenu className={styles.burger} />
            <Switch>
              <Route path='/' />
            </Switch>
          </Router>
        </div>
        <div className={styles.logo}>
          <a href='/'>
            {width < 600 ? (
              <img src={window.location.origin + '/images/logo2.png'} />
            ) : (
              <img src={window.location.origin + '/images/logo.png'} />
            )}
          </a>
        </div>
        <div className={styles.empty}> </div>
        <div className={`col text-right ${styles.iconWrapper}`}>
          <div className={styles.icons}>
            <div>
              <ul className={styles.list}>
                <li>
                  <Link href='/'>
                    <FontAwesomeIcon className={styles.icon} icon={faMobileAlt} />{' '}
                    <span className={styles.topMenuText}>Contact</span>
                  </Link>
                </li>
                <li className={styles.cart}>
                  <Link to='/cart'>
                    <span className={styles.counter}>
                      {counter === 0 ? '' : counter}
                    </span>
                    <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />{' '}
                    <span className={styles.topMenuText}>Cart</span>
                  </Link>
                </li>
                {!user.isLogged && (
                  <li>
                    <Link to='/login'>
                      <FontAwesomeIcon className={styles.icon} icon={faUser} />
                      <span className={styles.topMenuText}>Login</span>
                    </Link>
                  </li>
                )}
                {user.isLogged && (
                  <>
                    <li>
                      <Link href='' onClick={handleLogout}>
                        <FontAwesomeIcon className={styles.icon} icon={faSignOutAlt} />
                        <span className={styles.topMenuText}>Logout</span>
                      </Link>
                    </li>
                    <li>
                      <Link href='/userpage'>
                        <FontAwesomeIcon
                          className={styles.iconUserConf}
                          icon={faUserCog}
                        />
                        <span className={styles.topMenuText}>{user.userData}</span>
                        {user.isPremium && (
                          <FontAwesomeIcon
                            className={styles.iconUserStar}
                            icon={faStar}
                          />
                        )}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CompanyClaim.propTypes = {
  products: PropTypes.array,
};

export default CompanyClaim;
