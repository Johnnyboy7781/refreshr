import React from "react";
import { testProducts } from "./Test";
import "./Products.css";
import Product from "../Product/Product"

const Products = () => {
    return (
        <div className="Container">
            {testProducts.map((item) => (
              <Product item={item} key={item.id} />  
            ))}
        </div>
    )
}

export default Products;