import React, {useState, useCallback, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getValidImage} from "../../utils/imageUtils";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";
import {toast} from "sonner";
import ClearCartModal from "../ClearCartModal";
import {Link, useNavigate} from "react-router-dom";

const CartSidebar = ({isOpen, onClose}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const navigate = useNavigate();

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleQuantityChange = useCallback(
    (id, delta) => {
      const item = cartItems.find((item) => item.id === id);
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        dispatch(removeFromCart(id));
        toast.success(`${item.title} removed from cart!`);
      } else {
        dispatch(updateQuantity({id, quantity: newQuantity}));
        toast.success(`${item.title} quantity updated to ${newQuantity}!`);
      }
    },
    [cartItems, dispatch]
  );

  const handleRemoveItem = useCallback(
    (id) => {
      const item = cartItems.find((item) => item.id === id);
      dispatch(removeFromCart(id));
      toast.success(`${item.title} removed from cart!`);
    },
    [cartItems, dispatch]
  );

  const handleClearCart = useCallback(() => {
    setIsClearModalOpen(true);
  }, []);

  const confirmClearCart = useCallback(() => {
    dispatch(clearCart());
    setIsClearModalOpen(false);
    toast.success("Cart cleared successfully!");
  }, [dispatch]);

  const cancelClearCart = useCallback(() => {
    setIsClearModalOpen(false);
  }, []);

  const handleCheckout = useCallback(() => {
    dispatch(clearCart());
    toast.success("Order placed successfully!");
    onClose();
    navigate("/order-placed");
  }, [dispatch, onClose, navigate]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}

      <div
        className={`fixed bottom-0 right-0 h-[80vh] rounded-tl-md w-full md:w-[40%] bg-white 
         shadow-lg z-50 transform transition-transform duration-300 ${
           isOpen ? "translate-x-0" : "translate-x-full"
         }`}
      >
        <div className="p-4 flex flex-col h-full relative">
          <div className="flex justify-between items-center mb-4 border-b border-b-gray-300">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-3xl cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-center mt-10">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b border-b-gray-300 last:border-0 py-2"
                >
                  <img
                    src={getValidImage(item.images)}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md"
                    onError={(e) => {
                      e.target.src = getValidImage(item.images);
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold truncate max-w-[80%]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      $<span className="text-lg">{item.price}</span>{" "}
                      <span className="text-red-500">x</span>{" "}
                      <span className="text-lg">{item.quantity}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer text-xl"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-t-gray-300 pt-4 mt-4">
              <p className="text-lg font-semibold">
                <span className="text-sm">Total Items:</span> {totalItems}
              </p>
              <p className="text-lg font-semibold">
                <span className="text-sm">Total:</span> ${totalPrice.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={handleClearCart}
                  className="w-1/4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-all 
                duration-300 cursor-pointer"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-2 rounded
                  hover:bg-blue-700 transition-all duration-300 cursor-pointer "
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          {isClearModalOpen && (
            <ClearCartModal
              confirmClearCart={confirmClearCart}
              cancelClearCart={cancelClearCart}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
