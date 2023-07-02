import {
    // useState, 
    useEffect
} from "react"
// import jwt from 'jwt-decode'
const clientID = "1041261791254-mbtvjmn3kep32isbfr7mn6v2fp99ibu8.apps.googleusercontent.com"

const code_receiver_uri = "http://localhost:3000/accounts/login"

// Authorized redirect URIs
// For use with requests from a web server
// URIs 1 
// http://localhost:1337/api/sessions/oauth/google
// URIs 2 
// http://localhost:3000/login
// URIs 3 
// http://localhost
// URIs 4 
// http://localhost:3000/accounts/google/login
// URIs 5 
// http://localhost:3000/accounts/login
// URIs 6 
// http://localhost:3300/accounts/googleonetap
// URIs 7 
// http://localhost:3300/accounts/login
// URIs 8 
// http://localhost:3300/login

export default function Signin() {
    // const [id, setid] = useState('')
    // const [ps, setps] = useState('')

    function handleCredentialResponse(response) {
        console.log(response);
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: clientID,
            callback: handleCredentialResponse,
            ux_mode:'redirect',
            login_uri:"http://localhost:3300/accounts/login"
        });
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  
            // customization attributes
          );
        // window.google.accounts.id.prompt()

    })

    return (
        <div className="box">
            <div id="buttonDiv"></div>
        </div>
    )
}
















