import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import classes from '../styles/Home.module.css';
import Product from '../components/Product';
import { fetchProducts } from '../utils/fetch-products';
import Spinner from '../components/Spinner';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productOnePcs, setProductOnePcs] = useState([]);
  const maxProducts = products.slice(0, 4);
  const maxProductsOnePcs = productOnePcs.slice(0, 4);
  let category = 'Two pieces';

  async function fetchData() {
    const productsData = await fetchProducts();
    setProducts(productsData);
  }
  async function fetchDataBYCategory(categoryProduct) {
    const products = await fetchProducts(categoryProduct);
    setProductOnePcs(products);
  }

  useEffect(() => {
    fetchData();
    fetchDataBYCategory(category);
  }, [category]);

  return (
    <div>
      <div className={classes.productsHeading}>
        <h2>Best Seller Products</h2>
        <div>
          <Link to={`/products`} className={classes.border}>
            <button>See all products</button>
          </Link>
        </div>
      </div>

      <div className={classes.container}>
        {!products ? (
          <div className={classes.loading}>
            <Spinner message='Fetching products...' />
          </div>
        ) : (
          <>
            {maxProducts?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </>
        )}
      </div>

      <Banner />
      <div className={classes.productsHeading}>
        <h2>{category} swimwear</h2>
        <div>
          <Link to={`/category/${category}`}>
            <button>Look for more</button>
          </Link>
        </div>
      </div>

      <div className={classes.container}>
        {!maxProductsOnePcs ? (
          <div>
            <Spinner message='Fetching products...' />
          </div>
        ) : (
          <>
            {maxProductsOnePcs?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
