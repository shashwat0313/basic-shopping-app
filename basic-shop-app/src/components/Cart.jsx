import React from "react";

export default function Cart({cartItems}){
    return (
        <div>
            <h1>Cart page</h1>

            <ol>
                {cartItems.map((x, idx)=>
                    <li key={idx}>{x.name}</li>
                )}
            </ol>

        </div>
    )
}