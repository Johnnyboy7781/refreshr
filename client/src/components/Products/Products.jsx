import React from "react";
import "./Products.css";
import Product from "../Product/Product"

import { useQuery } from "@apollo/client";
import { QUERY_DRINKS } from "../../utils/queries";

const Products = () => {
    const {loading, data} = useQuery(QUERY_DRINKS);
    
    const drinks = data?.drinks || {};

    console.log(drinks);

    if(loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="Container">
            {drinks.map((drink) => (
              <Product drink={drink} key={drink._id} />  
            ))}
        </div>
    )
}

export default Products;