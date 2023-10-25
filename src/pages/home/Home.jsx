import React, { useEffect, useState } from "react";
import "./Home.css";
import { Product } from "./Product";
import { useAppDispatch, getProductList } from "../../redux";
import { DefaultButton } from "../../component/button/DefaultButton";
import { Loader } from "../../component/loader/Loader";
import string from "../../constants/string";
import { getCategoryListAPI, getProductsAPI } from "../../api/productAPI";

export const Home = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(string.home.All);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Initially call get category and product list API
  useEffect(() => {
    setLoading(true);
    getCategoryListAPI(dispatch, setCategories, setError);
    getProductsAPI(dispatch, setLoading, setProducts, setError);
  }, []);

  // If getting error from API, then retry calling the same api
  useEffect(() => {
    if (error !== null && window.confirm(error)) {
      getCategoryListAPI(dispatch, setCategories, setError);
      getProductList();
      setError(null);
    }
  }, [error]);

  // Category filter
  useEffect(() => {
    if (selectedCategory !== string.home.All) {
      const filteredProduct = products.filter(
        (item) => item.category === selectedCategory
      );
      setFilteredProducts(filteredProduct);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className='categories'>
            <DefaultButton
              styleType={string.buttonType.NoBorder}
              buttonType='button'
              title={string.home.All}
              onPress={() => setSelectedCategory(string.home.All)}
            />
            {selectedCategory === string.home.All ? (
              <div>
                {categories.map((category, index) => (
                  <DefaultButton
                    styleType={string.buttonType.NoBorder}
                    buttonType='button'
                    title={category.category}
                    onPress={() => setSelectedCategory(category.category)}
                  />
                ))}
              </div>
            ) : (
              <DefaultButton
                styleType={string.buttonType.NoBorder}
                buttonType='button'
                title={selectedCategory}
                onPress={() => setSelectedCategory(selectedCategory)}
              />
            )}
          </div>
          <div>
            {filteredProducts.length > 0 ? (
              <div className='products'>
                {filteredProducts.length > 0 &&
                  filteredProducts.map((product) => (
                    <div key={product._id}>
                      <Product data={product} />
                    </div>
                  ))}
              </div>
            ) : (
              <div className='products'>
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product._id}>
                      <Product data={product} />
                    </div>
                  ))
                ) : (
                  <p className='norecords'>
                    <b>{string.NoRecords}</b>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
