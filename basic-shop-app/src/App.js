// eslint-disable-next-line

import "./styles.css";
import React, { useState, useEffect } from "react";
import Heading from "./components/Heading";
import List from "./components/List";
import Search from "./components/Search"
import Cart from "./components/Cart";
import {
  Route,
  Routes,
} from "react-router-dom";

let HEADING = "";
let ITEMS = []

function App() {
  useEffect(() => {
    fetch("/api/assets").then(
      (res) => {
        console.log(res);
        res.json().then(
          (result) => {
            console.log(result);
            setList((prev) => {
              HEADING = result.HEADING;
              ITEMS = result.ITEMS;
              return result.ITEMS;
            })
          }
        )
      }
    )
  }, [])


  const [currentList, setList] = useState(ITEMS);
  const [priceSortedState, setSortedState] = useState("price-unsorted")
  const [QtySortedState, setQtySortedState] = useState("Qty-unsorted")
  const [cart, setCart] = useState([])

  function addToCart(e) {
    const name = e.target.value;
    setCart((prev) => {
      return [...prev, ITEMS[ITEMS.findIndex((x) => x.name === name)]]
    })
    console.log(cart);
    // console.log(e.target.value);
  }

  function sortByQty() {
    if (QtySortedState === "Qty-unsorted" || QtySortedState === "descending") {
      //ascending order
      setList((prev) => {
        return prev.sort((a, b) => {
          return b.quantity - a.quantity;
        })
      })
      setQtySortedState("ascending");
    }
    else {
      //apply descending order
      setList((prev) => {
        return prev.sort((b, a) => {
          return b.quantity - a.quantity;
        })
      })
      setQtySortedState("descending");
    }
  }

  function sortByPrice() {
    if (priceSortedState === "price-unsorted" || priceSortedState === "descending") {
      //ascending order
      setList((prev) => {
        return prev.sort((a, b) => {
          return b.price - a.price;
        })
      })
      setSortedState("ascending");
    }
    else {
      //apply descending order
      setList((prev) => {
        return prev.sort((b, a) => {
          return b.price - a.price;
        })
      })
      setSortedState("descending");
    }
  }

  function SearchHandler(value) {
    const searchArr = ITEMS.filter(s => (s.name).includes(value))
    setList(searchArr);
    setSortedState("price-unsorted")
    setQtySortedState("Qty-unsorted")
  }


  return (
    <Routes>
      <Route path="/" element={
        <div className="box">
          <Heading heading={HEADING} />
          <Search SearchHandler={SearchHandler} />
          <List addToCart={addToCart}
            itemArray={currentList}
            sortByPrice={sortByPrice}
            sortByQty={sortByQty}
          />
        </div>
      } />
      <Route path="/cart" element={<Cart cartItems={cart} />} />
    </Routes>
  );
}

export default App;
