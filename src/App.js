import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './Context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    count: 0,
  }

  addItemToCart = product => {
    console.log(product)
    this.setState(prevState => ({
      cartList: [...prevState.cartList, product],
    }))
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const cartListFilter = cartList.filter(each => each.id !== id)
    this.setState({cartList: cartListFilter})
  }

  increaseCartCount = count => {
    this.setState({count: count + 1})
  }

  decreaseCartCount = count => {
    this.setState({count: count - 1})
  }

  render() {
    const {cartList, count} = this.state
    return (
      <BrowserRouter>
        <Switch>
          <CartContext.Provider
            value={{
              cartList,
              count,
              addItemToCart: this.addItemToCart,
              deleteCartItem: this.deleteCartItem,
              increaseCartCount: this.increaseCartCount,
              decreaseCartCount: this.decreaseCartCount,
            }}
          >
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </CartContext.Provider>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
