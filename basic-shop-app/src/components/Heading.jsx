import React from "react";
import { Link } from "react-router-dom";

function Heading({ heading }) {
    return (
        <div className="heading">
            <span>
                <h1 style={{ display: 'inline-block' }}>{heading}</h1>

                <Link to={'/cart'}>
                    <h3 style={{ display: 'inline-block', marginLeft: '20px' }}>Cart</h3>
                </Link>
                
                <Link to={'/signin'}>
                    <h3 style={{ display: 'inline-block', marginLeft: '20px' }}>Log in</h3>
                </Link>

            </span>
        </div>
    )
}

export default Heading;