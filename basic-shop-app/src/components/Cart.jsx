import React, { useEffect, useState } from "react"
const queryLoginURI = "/accounts/querylogin"
const cartEndpoint = '/api/cart'

export default function Cart({removeFromCart}) {

    const [SignInState, setSignInState] = useState(false)
    const [emailid, setid] = useState('')
    const [cartItems, setCart] = useState([])

    useEffect(() => {
        fetch(queryLoginURI).then(
            (res) => {
                res.json().then(
                    (result) => {
                        // console.log(result.email);
                        if (result.isLoggedIn) {
                            setSignInState(result.isLoggedIn);
                            setid(result.email)
                        }
                    }
                )
            }
        )

    }, [])

    useEffect(() => {
        if (SignInState) {
            const xhr = new XMLHttpRequest()
            xhr.open("POST", cartEndpoint, true)
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest')
            xhr.onload = () => {
                console.log("received xhr response from /api/cart: " + JSON.parse(xhr.responseText));
                setCart(JSON.parse(xhr.responseText))
            }
            xhr.send("email=" + emailid)
        }
    }, [SignInState, emailid])

    function ButtonAction(){
        console.log('btn pressed');
    }

    return (
        <div className="box">
            <h1>Your Cart</h1>

            <ol>
                {cartItems.map((x, idx) =>
                    <li key={idx}>{x.name} 
                        <span>
                            <button value={x.name} onClick={removeFromCart}>Remove</button>    
                        </span> 
                    </li>
                )}
            </ol>
        </div>
    )
}