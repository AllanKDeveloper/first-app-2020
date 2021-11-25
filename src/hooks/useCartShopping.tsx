import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { Event } from "../types";

interface CartShoppingProviderProps {
  children: ReactNode;
}

interface UpdateEventAmount {
  eventId: number;
  amount: number;
}

interface CartContextData {
  cart: Event[];
  addEvent: (eventId: number) => Promise<void>;
  removeEvent: (eventId: number) => void;
  updateEventAmount: ({ eventId, amount }: UpdateEventAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({
  children,
}: CartShoppingProviderProps): JSX.Element {
  const [cart, setCart] = useState<Event[]>(() => {
    // Checks if there is any event in the session, if so, returns a json or a empty array
    const storagedCart = localStorage.getItem("@2020F1Events:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  /*
    Function that handle a event adding
  */
  const addEvent = async (eventId: number) => {
    try {
      // check if there is already an item in the cart
      const existingItem = cart.find(
        (cartItem) => cartItem.race_no === eventId
      );

      // if there is an item in the cart, it updates the quantity of the item via the eventId,
      // otherwise it does nothing
      if (existingItem) {
        const updatedCart = cart.map((cartItem) => {
          return cartItem.race_no === eventId
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : cartItem;
        });
        setCart(updatedCart);
        localStorage.setItem("@2020F1Events:cart", JSON.stringify(updatedCart));
        return;
      }

      // fetch event information from API and add to cart and update session
      const eventToAdd = await api.findEvent(eventId);

      setCart([...cart, { ...eventToAdd.data, amount: 1 }]);
      localStorage.setItem(
        "@2020F1Events:cart",
        JSON.stringify([...cart, { ...eventToAdd.data, amount: 1 }])
      );

      toast.success("Event successfully added");
    } catch {
      toast.error("Error adding event");
    }
  };

  /*
    Function that handle a event removing
  */
  const removeEvent = async (eventId: number) => {
    try {
      // check if the event exists in the cart
      const eventExists = cart.find((cartItem) => cartItem.race_no === eventId);

      // if it exists, just keep the events that are not equal to the eventId in cart array and update in session
      if (eventExists) {
        const updatedCart = cart.filter(
          (cartItem) => cartItem.race_no !== eventId
        );
        setCart(updatedCart);
        localStorage.setItem("@2020F1Events:cart", JSON.stringify(updatedCart));
      } else {
        throw Error();
      }
    } catch {
      toast.error("Event removal error");
    }
  };

  /*
    Function that handle a update of a event amount/quantity
  */
  const updateEventAmount = async ({ eventId, amount }: UpdateEventAmount) => {
    try {
      // check if quantity is greater than zero or return
      if (amount <= 0) return;

      // updates the quantity in the cart and in the session using eventId
      const updatedCart = cart.map((cartItem) =>
        cartItem.race_no === eventId ? { ...cartItem, amount } : cartItem
      );
      setCart(updatedCart);
      localStorage.setItem("@2020F1Events:cart", JSON.stringify(updatedCart));
    } catch {
      toast.error("Error when changing event quantity");
    }
  };

  return (
    // All values ​​are passed to the provider.
    <CartContext.Provider
      value={{ cart, addEvent, removeEvent, updateEventAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartShopping(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
