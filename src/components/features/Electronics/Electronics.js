import React from 'react';
import Swipe from 'react-easy-swipe';
import PropTypes from 'prop-types';
import Brands from '../../layout/Brands/Brands';
import styles from './Electronics.module.scss';
import ProductBox from '../../common/ProductBox/ProductBoxContainer';

class Electronics extends React.Component {
  state = {
    activePage: 0,
    activeCategory: 'laptop',
    fadeTrue: true,
    mobile: false,
    tablet: false,
    desktop: false,
    hugeScreen: false,
    width: window.innerWidth,
  };

  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize = () => {
    this.setState({ width: window.innerWidth });
    this.handleSizeScreen();
  };

  handleSizeScreen() {
    const windowScreenWidth = this.state.width;
    if (windowScreenWidth > 360 && windowScreenWidth < 768) {
      this.setState({ mobile: true, tablet: false, desktop: false, hugeScreen: false });
    } else if (windowScreenWidth >= 768 && windowScreenWidth < 1024) {
      this.setState({ mobile: false, tablet: true, desktop: false, hugeScreen: false });
    } else if (windowScreenWidth >= 1024 && windowScreenWidth < 1400) {
      this.setState({ mobile: false, tablet: false, desktop: true, hugeScreen: false });
    } else if (windowScreenWidth >= 1400) {
      this.setState({ mobile: false, tablet: false, desktop: false, hugeScreen: true });
    }
  }

  handlePageChange(e, newPage) {
    e.preventDefault();
    console.log(newPage);
    this.setState({ activePage: newPage });
  }

  handleFadeOut(e, newCategory) {
    console.log(newCategory);
    e.preventDefault();
    this.setState({ fadeTrue: false });
    setTimeout(() => {
      this.handleFadeIn(newCategory);
    }, 1000);
  }

  handleFadeOutMobile(e) {
    e.persist();
    console.log(e.target.value);
    e.preventDefault();
    this.setState({ fadeTrue: false });
    setTimeout(() => {
      this.handleFadeIn(e.target.value);
    }, 1000);
  }

  handleFadeIn(newCategory) {
    this.setState({ fadeTrue: true });
    this.setState({ activeCategory: newCategory });
  }

  handleRightSwipe() {
    if (this.state.activePage >= 1) {
      this.handlePageChange(this.state.activePage - 1);
    }
  }

  handleLeftSwipe(pagesCount) {
    if (this.state.activePage < pagesCount - 1) {
      this.handlePageChange(this.state.activePage + 1);
    }
  }

  render() {
    const { categories, products, brands } = this.props;
    const {
      activeCategory,
      activePage,
      fadeTrue,
      tablet,
      desktop,
      mobile,
    } = this.state;

    const categoryProducts = products.filter(item => item.category === activeCategory);
    const pagesCount = Math.ceil(categoryProducts.length / 8);

    const dots = [];
    for (let i = 0; i < pagesCount; i++) {
      const preparedClass = i === activePage ? styles.active : '';
      dots.push(
        <li key={i}>
          <a
            href='/'
            onClick={e => this.handlePageChange(e, i)}
            className={preparedClass}
          >
            page {i}
          </a>
        </li>
      );
    }

    return (
      <div>
        <Swipe
          onSwipeLeft={() => this.handleLeftSwipe(pagesCount)}
          onSwipeRight={() => this.handleRightSwipe()}
        >
          <div className={styles.root}>
            <div className='container'>
              <div className={styles.panelBar}>
                <div className='row no-gutters align-items-end'>
                  <div className={'col-auto ' + styles.heading}>
                    <h3 className={styles.electronics}>Electronics</h3>
                  </div>
                  {!mobile && (
                    <div className={'col ' + styles.menu}>
                      <ul>
                        {categories.map(item => {
                          const preparedClass =
                            item.id === activeCategory ? styles.active : '';
                          return (
                            <li key={item.id}>
                              <a
                                href='/'
                                className={preparedClass}
                                onClick={e => this.handleFadeOut(e, item.id)}
                              >
                                {item.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  {mobile && (
                    <div className={'col ' + styles.menu}>
                      <select onChange={e => this.handleFadeOutMobile(e)}>
                        {categories.map(item => {
                          const preparedClass =
                            item.id === activeCategory ? styles.active : '';
                          return (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                  <div className={'col-auto ' + styles.dots}>
                    <ul>{dots}</ul>
                  </div>
                </div>
              </div>
              <div className='row'>
                {categoryProducts
                  .slice(activePage * 8, (activePage + 1) * 8)
                  .map(item => (
                    <div
                      key={item.id}
                      className={`${
                        mobile
                          ? 'col-12'
                          : tablet
                          ? 'col-6'
                          : desktop
                          ? 'col-4'
                          : 'col-3'
                      } ${fadeTrue ? styles.fadeIn : styles.fadeOut}`}
                    >
                      <ProductBox {...item} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Swipe>
        <Brands brands={brands} />
      </div>
    );
  }
}

Electronics.propTypes = {
  children: PropTypes.node,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      stars: PropTypes.number,
      promo: PropTypes.string,
      newFurniture: PropTypes.bool,
    })
  ),

  brands: PropTypes.array,
  changeFade: PropTypes.func,
};

Electronics.defaultProps = {
  categories: [],
  products: [],
};

export default Electronics;
