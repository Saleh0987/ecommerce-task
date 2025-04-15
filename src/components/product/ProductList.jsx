import React, {useEffect, useMemo, useReducer, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  getProducts,
  getCategories,
  setPage,
} from "../../redux/slices/productsSlice";
import ProductGrid from "../product/ProductGrid";
import Pagination from "../Pagination";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import SearchBar from "../SearchBar";
import CategoryFilter from "../CategoryFilter";

const initialState = {
  activePage: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return {...state, activePage: action.payload};
    default:
      return state;
  }
};

const ProductList = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    allItems,
    categories,
    status,
    error,
  } = useSelector((state) => state.products);
  const [state, localDispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const limit = 12;

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPage(state.activePage));
  }, [dispatch, state.activePage]);

  const filteredProducts = useMemo(() => {
    let result = allItems;

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category.id === parseInt(selectedCategory)
      );
    }

    if (searchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [allItems, searchTerm, selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const start = (state.activePage - 1) * limit;
    const end = start + limit;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, state.activePage, limit]);

  const totalPages = Math.ceil(filteredProducts.length / limit);

  const handlePageChange = (page) => {
    localDispatch({type: "SET_PAGE", payload: page});
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term && state.activePage !== 1) {
      handlePageChange(1);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (state.activePage !== 1) {
      handlePageChange(1);
    }
  };

  const showPagination = filteredProducts.length >= limit;

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        {filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">No items available</p>
          </div>
        ) : (
          <>
            <ProductGrid products={paginatedProducts} />
          </>
        )}
      </div>
      {filteredProducts.length > 0 && showPagination && totalPages > 1 && (
        <Pagination
          currentPage={state.activePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductList;
