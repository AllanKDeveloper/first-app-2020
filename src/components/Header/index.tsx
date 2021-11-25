import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";

import logo from "../../assets/images/logo.svg";
import { Container, Cart } from "./styles";
import { useCartShopping } from "../../hooks/useCartShopping";

const Header = (): JSX.Element => {
  const { cart } = useCartShopping();
  const cartSize = cart.length;

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="2020 F1 Events" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>My cart</strong>
          <span data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} items`}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};

export default Header;
