import React from "react";

const ClearCartModal = ({cancelClearCart, confirmClearCart}) => {
  return (
    <>
      <div className="absolute inset-0 bg-black/80 z-50"></div>
      <div
        className="absolute bottom-0 right-0 h-[20vh] rounded-tl-md w-full bg-white 
                z-60 flex flex-col justify-center items-center p-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure?
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Do you really want to clear your cart? This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={cancelClearCart}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 
                    transition-all duration-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={confirmClearCart}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 
                    transition-all duration-300 cursor-pointer"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ClearCartModal;
