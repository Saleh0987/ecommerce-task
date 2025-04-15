import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/slices/cartSlice";
import {toast} from "sonner";
import {getValidImage} from "../../utils/imageUtils";

const ProductModal = ({product, isOpen, onClose, isInCart}) => {
  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState(getValidImage(product.images));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
      role="dialog"
    >
      <div className="bg-white rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute -top-2 right-1 text-white text-3xl cursor-pointer bg-red-600 rounded-full"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col justify-center items-center">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-72 object-contain rounded-lg mb-4"
              onError={(e) => {
                e.target.src = getValidImage(product.images);
              }}
            />

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title}-${index}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                      mainImage === image ? "border-2 border-blue-600" : ""
                    }`}
                    onClick={() => handleThumbnailClick(image)}
                    onError={(e) => {
                      e.target.src = getValidImage([image]);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-between flex-col">
            <h2 className="text-2xl font-bold my-2">{product.title}</h2>

            <p className="text-gray-600 text-lg mb-4">
              $<span className="text-3xl">{product.price}</span>
            </p>
            <p className="text-gray-700 mb-4">{product.description}</p>
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
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
