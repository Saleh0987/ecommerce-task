import React, {useState, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../redux/slices/cartSlice";
import {toast} from "sonner";
import {getValidImage} from "../../utils/imageUtils";
import ProductModal from "./ProductModal";

const ProductCard = React.memo(({product}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  }, [dispatch, product]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <div
        className="border border-gray-300 rounded-lg p-2 
      shadow-md hover:shadow-lg transition relative"
      >
        <button
          onClick={openModal}
          className="absolute top-0 right-0 text-gray-600 hover:text-gray-800 text-xl 
          bg-white rounded-full p-1 shadow-sm cursor-pointer"
          aria-label="View product details"
        >
          👁️
        </button>

        <img
          src={getValidImage(product.images)}
          onClick={openModal}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-4"
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
        <h3 className="text-lg font-semibold truncate my-2">{product.title}</h3>
        <p className="text-gray-600">
          $<span className="text-2xl">{product.price}</span>
        </p>
        <button
          onClick={handleAddToCart}
          className={`mt-4 w-full py-2 rounded transition-all duration-300 cursor-pointer ${
            isInCart
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={isInCart}
        >
          {isInCart ? "in Cart" : "Add to Cart"}
        </button>
      </div>

      <ProductModal
        isInCart={isInCart}
        product={product}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
});

export default ProductCard;
