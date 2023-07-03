// eslint-disable-next-line
import "./styles.css";
import React, { useState, useEffect } from "react";
import Heading from "./components/Heading";
import List from "./components/List";
import Search from "./components/Search";
import Cart from "./components/Cart";
// import Signin from "./components/Signin";
import {
  Route,
  Routes,
  // useFetcher,
} from "react-router-dom";
import Signin from "./components/Signin";
// import jwt from 'jwt-decode'
// import Register from "./components/Register";
// import { useCookies } from 'react-cookie';

let HEADING = "";
let ITEMS = []
// const clientID = "1041261791254-mbtvjmn3kep32isbfr7mn6v2fp99ibu8.apps.googleusercontent.com"
const addToCartReceiverURI = "/api/addtocart"
const cartEndpoint = '/api/cart'

export default function App() {

  const [currentList, setList] = useState(ITEMS);
  const [priceSortedState, setSortedState] = useState("price-unsorted")
  const [QtySortedState, setQtySortedState] = useState("Qty-unsorted")
  const [cart, setCart] = useState([])
  const [isSignedin, setSignin] = useState(false);
  const [mailid, setid] = useState("")

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

    fetch("/accounts/querylogin").then(
      (res) => {
        // console.log('res from querylogin: ' + res);
        res.json().then(
          (result => {
            // console.log('result of querylogin :' + JSON.stringify(result));
            setSignin(result.isLoggedIn)
            if (result.isLoggedIn) {
              setid(result.email)
            }
          })
        )
      }
    )

    getCartItemsByEmailid()

    // if (!isSignedin) {
    //   console.log('not supposed to show the prompt');
    //   window.google.accounts.id.initialize({
    //     client_id: clientID,
    //     callback: handleCredentialResponse
    //   });
    //   window.google.accounts.id.prompt()
    // }    

  }, [])

  function updateUserCart(requestBody) {

    if (isSignedin) {
      console.log('update user cart called');
      const xhr = new XMLHttpRequest()
      xhr.open("POST", addToCartReceiverURI, true)
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest')
      xhr.onload = () => {
        console.log("received xhr response from /api/cart: " + xhr.responseText);
        setCart(JSON.parse(xhr.responseText))
      }
      xhr.send("CartInfo=" + JSON.stringify(requestBody))
    }
    else {
      window.location.href = '/signin'
    }
  }

  function addToCart(e) {
    const name = e.target.value;
    setCart((prev) => {
      const newCart = [...prev, ITEMS[ITEMS.findIndex((x) => x.name === name)]];
      const requestBody = { email: mailid, cart: newCart }
      updateUserCart(requestBody)
      console.log(requestBody);
      return newCart
    })
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

  function getCartItemsByEmailid() {
    console.log("emailid:" + mailid);
    if (isSignedin) {
      const xhr = new XMLHttpRequest()
      xhr.open("POST", cartEndpoint, true)
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest')
      xhr.onload = () => {
        console.log("received chr response from /api/cart: " + JSON.parse(xhr.responseText));
        setCart(JSON.parse(xhr.responseText))
      }
      xhr.send("email=" + mailid)
    }
  }

  useEffect(() => {
    getCartItemsByEmailid()
  }, [])

  return (
    <Routes>

      <Route path="/" element={
        <div className="box">
          <Heading heading={HEADING} isSignedin={isSignedin} />
          <Search SearchHandler={SearchHandler} />

          {isSignedin ? <div>{mailid}</div> : <div>Not signed in</div>}

          <List addToCart={addToCart}
            itemArray={currentList}
            sortByPrice={sortByPrice}
            sortByQty={sortByQty}
          />
        </div>
      } />


      <Route path="/signin" element={<Signin isSignedIn={isSignedin} />} />
      <Route path="/cart" element={<Cart updateCart={getCartItemsByEmailid} cartItems={cart} isSignedIn={isSignedin} emailid={mailid} />} />
    </Routes>
  );
}