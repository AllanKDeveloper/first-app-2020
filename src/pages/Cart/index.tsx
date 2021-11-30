import React from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { toast } from "react-toastify";
import { useCartShopping } from "../../hooks/useCartShopping";
import { Event } from "../../types";

import "./styles.less";

import f1 from "../../assets/images/f1.jpg";

const Cart = (): JSX.Element => {
  const { cart, removeEvent, updateEventAmount } = useCartShopping();

  /*
    If necessary some formation of price or something else
  */
  const cartFormatted = cart.map((event) => ({
    ...event,
  }));

  /*
    Function handle increment after clicked on add or plus button on cart
  */
  function handleEventIncrement(event: Event) {
    updateEventAmount({
      eventId: event.race_no,
      amount: event.amount + 1,
    });
  }

  /*
    Function handle decrement after clicked minus button on cart
  */
  function handleEventDecrement(event: Event) {
    updateEventAmount({
      eventId: event.race_no,
      amount: event.amount - 1,
    });
  }

  /*
    Function remove the product/event from cart when clicked on delete
  */
  function handleRemoveEvent(eventId: number) {
    removeEvent(eventId);
  }

  /*
    Function that handle the buying order
  */
  function handleFinalizeOrder() {
    toast.success("Thanks for buying (in development...)");
    return;
  }

  return (
    <div className="container">
      <table className="container__table">
        <thead>
          <tr>
            <th className="table__head__th" aria-label="product image" />
            <th className="table__head__th">PRODUCT</th>
            <th className="table__head__th">QTD</th>
            <th className="table__head__th" aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted?.map((event) => (
            <tr data-testid="event" key={event.race_no}>
              <td className="table__body__td">
                <img
                  className="table__body__image"
                  src={f1}
                  alt={event.track}
                />
              </td>
              <td className="table__body__td">
                <strong className="table__body__text--strong">
                  {event.track}
                </strong>
              </td>
              <td className="table__body__td">
                <div className="table__body__form">
                  <button
                    className="table__body__button"
                    type="button"
                    data-testid="decrement-event"
                    disabled={event.amount <= 1}
                    onClick={() => handleEventDecrement(event)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    className="table__body__form__input"
                    type="text"
                    data-testid="event-amount"
                    readOnly
                    value={event.amount}
                  />
                  <button
                    className="table__body__button"
                    type="button"
                    data-testid="increment-event"
                    onClick={() => handleEventIncrement(event)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td className="container__table_body--td">
                <button
                  className="table__body__button"
                  type="button"
                  data-testid="remove-event"
                  onClick={() => handleRemoveEvent(event.race_no)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cartFormatted.length === 0 && (
        <span className="table__body__text">No events added to cart.</span>
      )}

      <footer className="container__footer">
        {cartFormatted.length > 0 && (
          <button
            className="container__footer__button"
            type="button"
            onClick={() => handleFinalizeOrder()}
          >
            Finalize order
          </button>
        )}
      </footer>
    </div>
  );
};

export default Cart;
