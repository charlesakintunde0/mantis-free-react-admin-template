import React, { useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import './reg-log.css'
import {Flip, Slide, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from "./../../config.json";
toast.configure()

function Registration() {
    const[UFirstName,setFName] = useState(null);
    const[ULastName,setLName] = useState(null);
    const[UEmail,setEmail] = useState(null);
    const[UPassword,setPassword] = useState(null);
    const[cPassword,setCPassword] = useState(null);

    const[navigate, setNavigate] = useState(false);

    const registerHandler = async (e) => {
        e.preventDefault();
        
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( re.test(UEmail)  ) 
        {
            if(UPassword === cPassword)
            {
                try{
                    const res = await fetch(Config.REGISTRATION, {
                        method: 'POST',
                        headers: {"Content-Type": 'application/json;charset=UTF-8'},
                        body : JSON.stringify({
                            UFirstName,
                            ULastName,
                            UEmail,
                            UPassword
                        })
                    });
                    
                    const content = await res.json();

                    if(res.status === 400) // If the email is already taken 
                    {
                        toast.error(content.message,{
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: true,
                            transition: Zoom,
                            autoClose:true,
                        });
                    }
                    else if(res.status === 200) // SUCCESSFULLY REGISTERED
                    {
                        toast.success(content.message,{
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: true,
                            transition: Zoom,
                            autoClose:true,
                        });

                        setNavigate(true);
                    }
            
                }catch(err){
                    console.log(err);
                }
            }
            else{ // If the passwords do not match 
                toast.error('Passwords do not match.',{
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    transition: Zoom,
                    autoClose:true,
                });
            }
        }
        else { // The email type is not valid
            toast.error('Invalid email address.',{
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                transition: Zoom,
                autoClose:true,
            });
        }
        
    }

    if(navigate) // REDIRECT TO LOGIN PAGE AFTER BEING SUCCESSFULLY REGISTERED
    {
        return <Navigate to="/Login"/>
    }
    return (
        <div className="fullContainer">
            <div className="base-container">
                <div className="reg">Registration</div>
                <div className="content">
                    {/* <div className="error">{errorMessage}</div> */}
                    <div className="form">
                        <div className="form-group">
                            <input name="FirstName" type="text" placeholder="First name" required
                            onChange={e => setFName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                        
                            <input name="LastName" type="text" placeholder="Last name"
                            onChange={e => setLName(e.target.value)}
                            />
                        </div>
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
                        <div className="form-group">
                            <input name="ConfirmPassword" type="password"  placeholder="Confirm password"
                            onChange={e => setCPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={registerHandler}>Register</button>
                </div>
                <div className="toReg">
                <p>Already have an account? 
                    <Link to="/login">
                        <a> Login</a>
                    </Link>
                </p>
                </div>
            </div>
            </div>
    )
}

export default Registration
