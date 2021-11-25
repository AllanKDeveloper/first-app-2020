import { ReactNode } from "react";
import Header from "../../components/Header";
import { shallow } from "enzyme";

jest.mock("react-router-dom", () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock("../../hooks/useCartShopping", () => {
  return {
    useCartShopping: () => ({
      cart: [
        {
          amount: 2,
          race_no: 1,
          image: "https://www.gamereactor.pt/media/25/f12021_3522523_650x.png",
          track: "Track Test 1",
        },
        {
          amount: 1,
          race_no: 2,
          image: "https://www.gamereactor.pt/media/25/f12021_3522523_650x.png",
          track: "Track Test 2",
        },
      ],
    }),
  };
});

describe("Header Component", () => {
  it("should be able to render the amount of products added to cart", () => {
    const component = shallow(<Header />);

    expect(
      component.find("[data-testid='cart-size']").text().includes("2 items")
    ).toBe(true);
  });
});
