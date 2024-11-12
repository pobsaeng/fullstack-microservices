import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productThunk';
import { addToCart } from '../../features/carts/cartSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faChartBar, faDollar, faSeedling, faShop, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const ProductComponent = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2 className="my-4">Products</h2>
      <div className="row">
        {products.map((product) => {
          return (
            // col-sm-6 col-md-4 col-lg-3
            <div className="col-sm-6 col-lg-3 col-md-4 mb-4" key={product.id}>
              <div className="card">
                <img
                    src={`images/${product.image}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Adjust height as needed
               />
                <div className="card-body p-2">
                <h6 className="card-title mb-1">{product.name}</h6>
                <p className="card-text mb-2">${product.price ? Number(product.price).toFixed(2) : 'N/A'}</p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FontAwesomeIcon icon={faCartShopping} size="lg" />
                    {/* Add to Cart */}
                  </button>
                </div>
                <input
                  type="number"
                  name="amount"
                  className="form-control fw-lighter"
                  value="1"
                  // onChange={handleChange}
                  min="1"
                  step="1"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductComponent;
