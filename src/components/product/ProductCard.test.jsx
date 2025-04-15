import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import cartReducer, {
  updateQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import ProductCard from "./ProductCard";
import "@testing-library/jest-dom";

jest.mock("sonner", () => ({
  toast: {
    success: jest
      .fn()
      .mockImplementation(() => new Promise((res) => setTimeout(res, 0))),
  },
}));

jest.mock("../utils/imageUtils", () => ({
  getValidImage: jest.fn(() => "mocked-image-url"),
}));

const createTestStore = (cartState = {items: []}) =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: cartState,
    },
  });

describe("ProductCard", () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    images: ["image1.jpg"],
  };

  it("renders product details correctly", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ProductCard product={product} onAddToCart={jest.fn()} />
      </Provider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(
      screen.getByText((content, el) => el.textContent === "$99.99")
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "mocked-image-url");
  });

  it("adds product to cart and updates button text", async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    const onAddToCart = jest.fn();

    render(
      <Provider store={store}>
        <ProductCard product={product} onAddToCart={onAddToCart} />
      </Provider>
    );

    const addButton = screen.getByRole("button", {name: /add to cart/i});
    expect(addButton).not.toBeDisabled();

    await user.click(addButton);

    expect(onAddToCart).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByRole("button", {name: /in cart/i})).toBeDisabled();
    });
  });

  it("opens modal when clicking the view button", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    render(
      <Provider store={store}>
        <ProductCard product={product} onAddToCart={jest.fn()} />
      </Provider>
    );

    const viewButton = screen.getByRole("button", {
      name: /view product details/i,
    });
    await user.click(viewButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
