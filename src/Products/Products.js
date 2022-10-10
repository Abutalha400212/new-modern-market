import React, { useContext } from "react";
import { CartContext, ProductContext } from "../Layout/Main";
import { LocalAddToDb } from "../LocalDb/LocalDb";
import { toast } from "react-toastify";
import OrderSum from "../OrderSummary/OrderSum";
import Product from "../Product/Product";
import "./Product.css";

const Products = () => {
  const products = useContext(ProductContext);
  const [cart, setCart] = useContext(CartContext);
  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product.id === selectedProduct.id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    LocalAddToDb(selectedProduct.id);
    toast.success('Info: Product Added!', { autoClose: 500 })
  };
  return (
    <div className=" grid-container mt-4 mx-5">
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((pd) => (
          <Product
            key={pd.id}
            pd={pd}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="bg-yellow-300">
        <OrderSum cart={cart}></OrderSum>
      </div>
    </div>
  );
};
// please HElp me//
// AbuTAlha//
export default Products;
