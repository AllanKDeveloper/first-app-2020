import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";

import "./styles.less";
import logo from "../../assets/images/logo.svg";
import { useCartShopping } from "../../hooks/useCartShopping";

const Header = (): JSX.Element => {
  const { cart } = useCartShopping();
  const cartSize = cart.length;

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__image" src={logo} alt="2020 F1 Events" />
      </Link>

      <Link to="/cart" className="header__cart">
        <div className="header__cart__content">
          <strong className="header__cart__content__text--strong">
            My cart
          </strong>
          <span className="header__cart__content__text" data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} items`}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Link>
    </header>
  );
};

export default Header;
