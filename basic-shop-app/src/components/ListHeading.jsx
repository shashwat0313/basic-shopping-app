import React from "react";
import logo from './noun-sort-arrow-2509814.png'

export default function ListHeading({ sortByPrice, sortByQty }) {
    return (
        <li className="topRow">

            <span className="name-col">Name
            </span>

            <span className="qty-col">
                Qty<img alt="" onClick={sortByQty} className="sort-image" src={logo} />
            </span>

            <span className="price-col">
                Price<img alt="" onClick={sortByPrice} className="sort-image" src={logo} />
            </span>

        </li>
    );
}