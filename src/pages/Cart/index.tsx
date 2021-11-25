import React from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { toast } from "react-toastify";
import { useCartShopping } from "../../hooks/useCartShopping";
import { Event } from "../../types";

import { Container, ProductTable } from "./styles";

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
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUCT</th>
            <th>QTD</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted?.map((event) => (
            <tr data-testid="event" key={event.race_no}>
              <td>
                <img src={f1} alt={event.track} />
              </td>
              <td>
                <strong>{event.track}</strong>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-event"
                    disabled={event.amount <= 1}
                    onClick={() => handleEventDecrement(event)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="event-amount"
                    readOnly
                    value={event.amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-event"
                    onClick={() => handleEventIncrement(event)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <button
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
      </ProductTable>
      {cartFormatted.length === 0 && <span>No events added to cart.</span>}

      <footer>
        {cartFormatted.length > 0 && (
          <button type="button" onClick={() => handleFinalizeOrder()}>
            Finalize order
          </button>
        )}
      </footer>
    </Container>
  );
};

export default Cart;
