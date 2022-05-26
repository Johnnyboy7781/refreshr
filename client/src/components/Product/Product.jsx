import React from "react";
import "./Product.css";

const Product = ({ item }) => {
    return (
        <div className="container">
            <img src={item.img} alt="" className="productImg" />
        </div>
    )
}

export default Product;