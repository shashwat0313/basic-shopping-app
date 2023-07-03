import React, { useState } from "react";
import { useEffect } from "react";

// To Do
// -->Send an xhr, a json, containing ONE item to be added to a user's cart
// -->will not care about validation at this point
// -->format res.send(emailid + "=" + cartItem)
const cartEndpoint = '/api/cart'

export default function Cart({ cartItems, isSignedIn, emailid, updateCart }) {

  // const [cartpage, setCart] = useState([cartItems])
  // const [signinstate, setsigninstate] = useState(false)
  // const [id, setid] = useState('')

  // function getCartItemsByEmailid() {
  //   console.log("emailid:" + id);
  //   if (isSignedIn || signinstate) {
  //     const xhr = new XMLHttpRequest()
  //     xhr.open("POST", cartEndpoint, true)
  //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  //     xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest')
  //     xhr.onload = () => {
  //       console.log("received chr response from /api/cart: " + JSON.parse(xhr.responseText));
  //       setCart(JSON.parse(xhr.responseText))
  //     }
  //     xhr.send("email=" + emailid)
  //   }
  // }

  useEffect(()=>{
    // setCart(cartItems)
    if(isSignedIn){
      updateCart()
    }
    else{
      console.log('cart:not logged in');
      window.location.href = '/signin'
    }
  }, [])

  // useEffect(() => {
  //   updateCart()
  //   setInterval(() => {
  //     fetch("/accounts/querylogin").then(
  //       (res) => {
  //         // console.log('res from querylogin: ' + res);
  //         res.json().then(
  //           (result => {
  //             console.log('result of querylogin :' + JSON.stringify(result));
  //             console.log(result.isLoggedIn);
  //             console.log();
  //             if (result.isLoggedIn===true) {
  //               setsigninstate(true)
  //               // console.log('setting id' + result.);
  //               console.log('signinstate:' + signinstate);
  //               // setid(result.email)
  //             }
  //           })
  //         )
  //       }
  //     )
  //     getCartItemsByEmailid()
  //     updateCart()
  //     console.log('hello');
  //   }, 3000);
    // getCartItemsByEmailid()

  // }, [])

  return (
    <div className="box">
      <h1>Your Cart</h1>

      <ol>
        {cartItems.map((x, idx) =>
          <li key={idx}>{x.name}</li>
        )}
      </ol>

    </div>
  )
}