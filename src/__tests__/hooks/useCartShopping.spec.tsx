import { renderHook, act } from "@testing-library/react-hooks";
import AxiosMock from "axios-mock-adapter";
import { render } from "enzyme";

import { toast } from "react-toastify";
import { api } from "../../services/api";
import { useCartShopping, CartProvider } from "../../hooks/useCartShopping";

const apiMock = new AxiosMock(api);

jest.mock("react-toastify");

const mockedToastError = toast.error as jest.Mock;
const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, "setItem");
const initialStoragedData = [
  {
    race_no: 1,
    amount: 2,
    image:
      "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
    track: "Track 1",
  },
  {
    race_no: 2,
    amount: 1,
    image:
      "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
    track: "Track 2",
  },
];

describe("useCartShopping Hook", () => {
  beforeEach(() => {
    apiMock.reset();

    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it("should be able to initialize cart with localStorage value", () => {
    const { result } = renderHook(useCartShopping, {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          race_no: 1,
          amount: 2,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 1",
        },
        {
          race_no: 2,
          amount: 1,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 2",
        },
      ])
    );
  });

  it("should be able to add a new product", async () => {
    const eventId = 3;

    apiMock.onGet(`/race/${eventId}`).reply(200, {
      race_no: 3,
      amount: 1,
      image:
        "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
      track: "Track 3",
    });

    const { result, waitForNextUpdate } = renderHook(useCartShopping, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addEvent(eventId);
    });

    await waitForNextUpdate({ timeout: 200 });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          race_no: 1,
          amount: 2,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 1",
        },
        {
          race_no: 2,
          amount: 1,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 2",
        },
        {
          race_no: 3,
          amount: 1,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 3",
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      "@2020F1Events:cart",
      JSON.stringify(result.current.cart)
    );
  });

  it("should not be able add a product that does not exist", async () => {
    const eventId = 4;

    apiMock.onGet(`/race/${eventId}`).reply(404);

    const { result, waitFor } = renderHook(useCartShopping, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addEvent(eventId);
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith("Error adding event");
      },
      { timeout: 200 }
    );

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it("should be able to increase a product amount when adding a product that already exists on cart", async () => {
    const eventId = 1;

    apiMock.onGet(`/race/${eventId}`).reply(200, {
      race_no: 1,
      amount: 3,
      image:
        "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
      track: "Track 1",
    });

    const { result, waitForNextUpdate } = renderHook(useCartShopping, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addEvent(eventId);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          race_no: 1,
          amount: 3,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 1",
        },
        {
          race_no: 2,
          amount: 1,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 2",
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      "@2020F1Events:cart",
      JSON.stringify(result.current.cart)
    );
  });

  it("should be able to remove a product", () => {
    const eventId = 2;

    const { result } = renderHook(useCartShopping, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeEvent(eventId);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          race_no: 1,
          amount: 2,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 1",
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      "@2020F1Events:cart",
      JSON.stringify(result.current.cart)
    );
  });

  it("should not be able to remove a product that does not exist", () => {
    const eventId = 3;

    const { result } = renderHook(useCartShopping, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeEvent(eventId);
    });

    expect(mockedToastError).toHaveBeenCalledWith("Event removal error");
    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it("should be able to update a product amount", async () => {
    const eventId = 2;

    apiMock.onGet(`/race/${eventId}`).reply(200, {
      race_no: 2,
      amount: 5,
      image:
        "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
      track: "Track 3",
    });

    const { result, waitForNextUpdate } = renderHook(useCartShopping, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateEventAmount({ amount: 2, eventId });
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          race_no: 1,
          amount: 2,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 1",
        },
        {
          race_no: 2,
          amount: 2,
          image:
            "https://2.bp.blogspot.com/-t2rch8oGw88/WZrh1PsFccI/AAAAAAAAEpE/rX8KI741ceI1Z73BHF6-hIlhPKht5TyjQCLcBGAs/s1600/meuxp-f1-2017-5-210817.jpg",
          track: "Track 2",
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      "@2020F1Events:cart",
      JSON.stringify(result.current.cart)
    );
  });

  it("should not be able to update a product amount to a value smaller than 1", async () => {
    const eventId = 2;

    apiMock.onGet(`/race/${eventId}`).reply(200, {
      race_no: 2,
      amount: 1,
    });

    const { result, waitForValueToChange } = renderHook(useCartShopping, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateEventAmount({ amount: 0, eventId });
    });

    try {
      await waitForValueToChange(
        () => {
          return result.current.cart;
        },
        { timeout: 50 }
      );
      expect(result.current.cart).toEqual(
        expect.arrayContaining(initialStoragedData)
      );
      expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
    } catch {
      expect(result.current.cart).toEqual(
        expect.arrayContaining(initialStoragedData)
      );
      expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
    }
  });
});
