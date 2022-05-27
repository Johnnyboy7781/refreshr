import React from "react";
import "./Product.css";

const Product = ({ drink }) => {
    return (
        <div className="container">
            <a href={`/drink/${drink._id}`}>
                <img src={require(`../../assets/${drink.image}.png`)} alt="A drink" className="productImg" />
            </a>
            <h3>{drink.name}</h3>
            <h4>${drink.price}</h4>
        </div>
    )
}

export default Product;