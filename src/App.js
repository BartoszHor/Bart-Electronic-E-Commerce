import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/bootstrap.scss';
import './styles/global.scss';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';
import ProductList from './components/views/ProductList/ProductListContainer';
import ProductPage from './components/views/ProductPage/ProductPageContainer';
import ProductMore from './components/common/ProductMore/ProductMoreContainer';
import Login from './components/views/Login/Login';
import Alert from './components/features/Alert/Alert';
import Cart from './components/views/Cart/CartContainer';

const App = () => (
  <Provider store={store}>
    <Alert />
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <MainLayout>
        <Switch>
          <Route exact path={'/'} component={Homepage} />
          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/cart'} component={Cart} />
          <Route exact path={'/shop/:categoryId'} component={ProductList} />
          <Route exact path={'/product/:productId'} component={ProductPage} />
          <Route exact path={'/product/:id/review'} component={ProductMore} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export default App;
