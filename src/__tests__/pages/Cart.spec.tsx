import { render, fireEvent } from "@testing-library/react";

import { useCartShopping } from "../../hooks/useCartShopping";
import Cart from "../../pages/Cart";

const mockedRemoveEvent = jest.fn();
const mockedUpdateEventAmount = jest.fn();
const mockedUseCartHook = useCartShopping as jest.Mock;

jest.mock("../../hooks/useCartShopping");

describe("Cart Page", () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          amount: 1,
          race_no: 1,
          image: "https://www.gamereactor.pt/media/25/f12021_3522523_650x.png",
          track: "Track Test 1",
        },
        {
          amount: 2,
          race_no: 2,
          image: "https://www.gamereactor.pt/media/25/f12021_3522523_650x.png",
          track: "Track Test 2",
        },
      ],
      removeEvent: mockedRemoveEvent,
      updateEventAmount: mockedUpdateEventAmount,
    });
  });

  it("should be able to increase/decrease a product amount", () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [incrementFirstProduct] = getAllByTestId("increment-event");
    const [, decrementSecondProduct] = getAllByTestId("decrement-event");
    const [firstProductAmount, secondProductAmount] =
      getAllByTestId("event-amount");

    expect(firstProductAmount).toHaveDisplayValue("1");
    expect(secondProductAmount).toHaveDisplayValue("2");

    fireEvent.click(incrementFirstProduct);
    fireEvent.click(decrementSecondProduct);

    expect(mockedUpdateEventAmount).toHaveBeenCalledWith({
      amount: 2,
      eventId: 1,
    });
    expect(mockedUpdateEventAmount).toHaveBeenCalledWith({
      amount: 1,
      eventId: 2,
    });

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 2,
          race_no: 1,
          image: "https://www.gamereactor.pt/media/25/f12021_3522523_650x.png",
          track: "Track Test 2",
        },
        {
          amount: 1,
          race_no: 2,
          image: "https://www.gamereactor.pt/media/25/f12021_3522523_650x.png",
          track: "Track Test 2",
        },
      ],
    });

    rerender(<Cart />);

    expect(firstProductAmount).toHaveDisplayValue("2");
    expect(secondProductAmount).toHaveDisplayValue("1");
  });

  it("should not be able to decrease a product amount when value is 1", () => {
    const { getAllByTestId } = render(<Cart />);

    const [decrementFirstProduct] = getAllByTestId("decrement-event");
    const [firstProductAmount] = getAllByTestId("event-amount");

    expect(firstProductAmount).toHaveDisplayValue("1");

    fireEvent.click(decrementFirstProduct);

    expect(decrementFirstProduct).toHaveProperty("disabled");
    expect(mockedUpdateEventAmount).not.toHaveBeenCalled();
  });

  it("should be able to remove a product", () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [removeFirstProduct] = getAllByTestId("remove-event");
    const [firstProduct, secondProduct] = getAllByTestId("event");

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();

    fireEvent.click(removeFirstProduct);

    expect(mockedRemoveEvent).toHaveBeenCalledWith(1);

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 1,
          race_no: 2,
          image: "https://www.gamereactor.pt/media/25/f12021_3522523_650x.png",
          track: "Track Test 2",
        },
      ],
    });

    rerender(<Cart />);

    expect(firstProduct).not.toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
  });
});
