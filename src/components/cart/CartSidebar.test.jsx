import {render, screen} from "@testing-library/react";
import CartSidebar from "./CartSidebar";
import {Provider} from "react-redux";
import {store} from "../../redux/store";

const renderWithProviders = (ui = {}) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("CartSidebar", () => {
  it("renders empty cart message when cart is empty", () => {
    renderWithProviders(<CartSidebar isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders cart items and summary correctly", () => {
    const initialState = {
      cart: {
        items: [
          {
            id: 1,
            title: "Test Product",
            price: 99.99,
            quantity: 2,
            images: ["mocked-image-url"],
          },
        ],
      },
    };

    const customStore = {
      ...store,
      getState: () => ({
        ...store.getState(),
        cart: initialState.cart,
      }),
    };

    render(
      <Provider store={customStore}>
        <CartSidebar isOpen={true} onClose={() => {}} />
      </Provider>
    );

    expect(screen.getByText(/test product/i)).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el.textContent === "Total Items: 2")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el.textContent.trim() === "Total: $199.98")
    ).toBeInTheDocument();
  });
});
