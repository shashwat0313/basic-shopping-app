// import { useState } from "react"
// import jwt from 'jwt-decode'
// const clientID = "1041261791254-mbtvjmn3kep32isbfr7mn6v2fp99ibu8.apps.googleusercontent.com"

// export default function Register() {
//     // const [id, setid] = useState('')
//     // const [ps, setps] = useState('')
//     // function handleSubmit(e){
//     //     // e.preventDefault()
//     // }
    

//     return (
//         <div className="box">
//             <form className="loginform" action="/accounts/register" method="post" 
//             // target="_blank" 
//                 onSubmit={handleSubmit}
//             >
//                 <h2>
//                     Register
//                 </h2>
//                 <div>
//                     <label for="userId">Username</label> <br />
//                     <input
//                         type="text"
//                         id="userId"
//                         name="username"
//                         placeholder="Email"
//                         // required
//                         value={id}
//                         onChange={e=>setid(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label for="pass"> Password </label><br />
//                     <input type="text" id="pass" name="password" placeholder="Password"
//                     onChange={e=>setps(e.target.value)}
//                     //required 
//                     />
//                 </div>
//                 {/* <input type="checkbox" id="checkbox" name="checkAccount" />
//                 <label for="checkbox">Remember me</label> */}
//                 <br />
//                 <button type="submit">LOG IN</button>
//             </form>
//         </div>
//     )
// }