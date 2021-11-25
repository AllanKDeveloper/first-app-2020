import AxiosMock from "axios-mock-adapter";
import { waitFor, render, fireEvent } from "@testing-library/react";

import { api } from "../../services/api";
import Home from "../../pages/Home";
import { useCartShopping } from "../../hooks/useCartShopping";

const apiMock = new AxiosMock(api);
const mockedAddEvent = jest.fn();
const mockedUseCartHook = useCartShopping as jest.Mock;

jest.mock("../../hooks/useCartShopping");

describe("Home Page", () => {
  beforeAll(() => {
    apiMock.onGet("products").reply(200, [
      {
        race_no: 1,
        image:
          "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
        track: "Track 1",
      },
      {
        race_no: 2,
        image:
          "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
        track: "Track 2",
      },
      {
        race_no: 3,
        image:
          "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
        track: "Track 3",
      },
    ]);
  });

  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          amount: 2,
          race_no: 1,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 2",
        },
        {
          amount: 1,
          race_no: 2,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 2",
        },
      ],
      addEvent: mockedAddEvent,
    });
  });

  it("should be able to render each product quantity added to cart", async () => {
    const { getAllByTestId } = render(<Home />);

    await waitFor(() => getAllByTestId("cart-event-quantity"), {
      timeout: 2000,
    });

    const [
      firstProductCartQuantity,
      secondProductCartQuantity,
      thirdProductCartQuantity,
    ] = getAllByTestId("cart-event-quantity");

    expect(firstProductCartQuantity).toHaveTextContent("2");
    expect(secondProductCartQuantity).toHaveTextContent("1");
    expect(thirdProductCartQuantity).toHaveTextContent("0");
  });

  it("should be able to add a product to cart", async () => {
    const { getAllByTestId, rerender } = render(<Home />);

    await waitFor(() => getAllByTestId("add-event-button"), {
      timeout: 2000,
    });

    const [addFirstProduct] = getAllByTestId("add-event-button");

    fireEvent.click(addFirstProduct);

    expect(mockedAddEvent).toHaveBeenCalledWith(1);

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 3,
          race_no: 1,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 2",
        },
      ],
    });

    rerender(<Home />);

    const [firstProductCartQuantity] = getAllByTestId("cart-event-quantity");

    expect(firstProductCartQuantity).toHaveTextContent("3");
  });
});
