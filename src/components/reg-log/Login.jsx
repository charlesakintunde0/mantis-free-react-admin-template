import React, {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import './reg-log.css'
import {toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from "./../../config.json"
toast.configure()
function Login({setName}) {
    
    // const[name,setName] = useState(null);
    const[UEmail,setEmail] = useState(null);
    const[UPassword,setPassword] = useState(null);
    const[navigate, setNavigate] = useState(false);

    const submitHandler = async (e) => 
    {
        e.preventDefault(); // Prevent from being refreshed. Because User will not re-put every field if some field is wrong
        try{
            const res = await fetch(Config.LOGIN, {
                method: 'POST',
                headers: {"Content-Type": 'application/json;charset=UTF-8'},
                credentials: 'include',
                body : JSON.stringify({
                    UEmail,
                    UPassword
                })
            });

            var content = await res.json();
            
            if(res.status === 200)
            {
                setName(content.uFirstName);
                setNavigate(true); // so that it can redirect to home page
                toast.success("Successfully logged in",{
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    transition: Zoom,
                    autoClose: true,
                });
            }

            else if(res.status === 400){
                toast.error(content.message,{
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    transition: Zoom,
                    autoClose:true,
                });
            }
            //window.location.reload();
            
        }catch(err){
            console.log(err);
        }

    }
    if(navigate) // REDIRECT TO LOGIN PAGE AFTER BEING SUCCESSFULLY REGISTERED
    {
        return <Navigate to="/"/>
    }
    return (
        <div className="fullContainer">
            <div className="base-container">
                <div className="reg">Login</div>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                        
                            <input name="Email" type="email" placeholder="Email" required
                            onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                        
                            <input name="Password" type="password" placeholder="Password" required
                            onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button onClick={submitHandler} type="button" className="btn">Login</button>
                </div>
                <div className="toReg">
                <p>Don't have an account? 
                    <Link to="/registration">
                        <a> Register</a>
                    </Link>
                </p>
                </div>
            </div>
            </div>
    )
}

export default Login
