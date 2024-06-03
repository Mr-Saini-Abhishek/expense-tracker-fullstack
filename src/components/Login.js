import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/note");
            props.showAlert("Logged In Succesfully", "success")
        } else {
            props.showAlert("Invaild Credentials", "danger")
        
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
        <div  style={{ paddingTop: '6rem', paddingBottom: '7rem', width: '150rem'}} className='container'>
            <form id='loginform' onSubmit={handleSubmit} >
            <h1 style={{textAlign: 'center', marginBottom: '3rem'}}>Login</h1>
                <div id='emaild' className="form-group el" >
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                   
                </div>
                <div id='passwordd' className="form-group el">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} />
               
                <button type="submit" className="btn btn-sm btn-outline-dark mx-1 " id='logbtn' >Submit</button>
                <Link className="btn btn-sm btn-outline-dark mx-1" to="/signup" id="signbtn" role="button">SignUp</Link>
                </div>
            </form>
            </div>
        </>
    )
}

export default Login;
