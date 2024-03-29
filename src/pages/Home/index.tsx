import React, { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import "./styles.less";
import { useCartShopping } from "../../hooks/useCartShopping";
import { useFetch } from "../../hooks/useFetch";
import f1 from "../../assets/images/f1.jpg";

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [events, setData] = useState([]);
  const { addEvent, cart } = useCartShopping();

  /*
    Function that calculates (sum) the number of events in the cart
  */
  const cartItemsAmount = cart.reduce((sumAmount, event) => {
    return { ...sumAmount, [event.race_no]: event.amount };
  }, {} as CartItemsAmount);

  /*
    Function that call the API hook using fetch and useEffect to load the content
  */
  const {
    data: eventsFromAPI,
    isPending,
    error,
  } = useFetch(`${process.env.REACT_APP_API_URL}`);

  useEffect(() => {
    if (eventsFromAPI) {
      setData(eventsFromAPI ?? []);
    }
  }, [eventsFromAPI]);

  /*
    Function handle adding event on cart
  */
  async function handleAddEvent(id: number) {
    await addEvent(id);
  }

  /*
    Function that convert timestamp to locale date
  */
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString();
  };

  return (
    <ul className="grid">
      {events !== null &&
        events.map((event: any) => {
          event.race_no = parseInt(event.race_no);
          return (
            <li className="grid__line" key={event.race_no}>
              <img className="grid__image" src={f1} alt={event.track} />
              <p className="grid__date">{formatDate(event.date)}</p>
              <strong className="grid__text--strong">{event.track}</strong>
              <button
                type="button"
                data-testid="add-event-button"
                onClick={() => handleAddEvent(event.race_no)}
                className="grid__button"
              >
                <div data-testid="cart-event-quantity">
                  <MdAddShoppingCart size={16} color="#FFF" />

                  {cartItemsAmount[event.race_no] || 0}
                </div>

                <span>ADD TO CART</span>
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default Home;
