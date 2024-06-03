import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "",  name: "", cpassword: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        
        if (password !== cpassword) {
            props.showAlert("Passwords are note Matched", "danger")
            return;
        }

        
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const json = await response.json();
        console.log(json)
        
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/note");
            props.showAlert("Signed Up Succesfully", "success")
        } else {
            props.showAlert("Invaild Credentials", "danger")

        }
    }
    
    

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
       <>
       <div style={{}}>
       <form id='signform' onSubmit={handleSubmit}>
                <h1 style={{textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem'}}>SIGNUP</h1>
            <div className="form-group el">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Name" value={credentials.name} onChange={onChange} />
                </div>
                <div className="form-group el">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                   
                </div>
                <div className="form-group el ">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} />
                </div>
            
                <div className="form-group el">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" value={credentials.cpassword} onChange={onChange} />
                    <button type="submit" className="btn btn-sm btn-outline-dark mx-1" id='logbtn' >Submit</button>
                <Link className="btn btn-sm btn-outline-dark mx-2" to="/login" id="signbtn" role="button">Login</Link>
                </div>
               

            </form>
            </div>
        </>
    )
}

export default Login;
