import { useState } from "react"

export default function Signin() {
    const [id, setid] = useState('')
    const [ps, setps] = useState('')
    function handleSubmit(e){
        // e.preventDefault()
    }
    

    return (
        <div className="box">
            <form className="loginform" action="/accounts/login" method="post" 
            // target="_blank" 
                onSubmit={handleSubmit}
            >
                <h2>
                    Login
                </h2>
                <div>
                    <label for="userId">Username</label> <br />
                    <input
                        type="text"
                        id="userId"
                        name="id"
                        placeholder="Email"
                        // required
                        value={id}
                        onChange={e=>setid(e.target.value)}
                    />
                </div>
                <div>
                    <label for="pass"> Password </label><br />
                    <input type="text" id="pass" name="password" placeholder="Password"
                    onChange={e=>setps(e.target.value)}
                    //required 
                    />
                </div>
                {/* <input type="checkbox" id="checkbox" name="checkAccount" />
                <label for="checkbox">Remember me</label> */}
                <br />
                <button type="submit">LOG IN</button>
            </form>
        </div>
    )
}

















// useEffect(()=>{
{/* <form>
        <input type="email" placeholder="Email"></input>
        <p></p>
        <input type="password" placeholder="Password"></input>
        <p></p>
        <button type="submit">Log in</button>
    </form> */}
//   window.google.accounts.id.initialize({
//     client_id:clientID,
//     callback: data => {
//       // console.log(jwt(data.credential));
//       setSignin(true)
//       setid(jwt(data.credential).email)
//     }
//   })
//   window.google.accounts.id.prompt(notification=>{
//     console.log("prompt notification: " + JSON.stringify(notification));
//   })
// })