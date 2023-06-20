import React, { useState } from "react";

export default function Search({ SearchHandler}) {

    const [input, setinput] = useState("");

    function textChangeHandler(e) {
        // console.log(e.target.value);
        setinput((e.target.value));
        SearchHandler(e.target.value)
    }

    return (
        <div className="search-box">

            <form className="search-form" onSubmit={(e) => { e.preventDefault();}}>
                <input 
                    placeholder="Search for Something"
                    name="searchText"
                    value={input}
                    onChange={textChangeHandler}>    
                </input>
            </form>

        </div>
    );
 
}