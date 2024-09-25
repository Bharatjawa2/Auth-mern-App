import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../ToastMsg/utils'; // Ensure both are imported

const Login = () => {
    const[loginInfo, setloginInfo] = useState({
        email: '',
        password: '',
    });


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyloginInfo = { ...loginInfo };
        copyloginInfo[name] = value;
        setloginInfo(copyloginInfo);
    };

    const handlelogin = async(e) => {
        e.preventDefault();
        const {email, password } = loginInfo;
        if ( !email || !password) {
            return handleError('All fields are required'); 
        }
        try{
            const url="http://localhost:8080/auth/login";
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result=await response.json();
            const { success,message,jwtToken,name,error}=result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home');
                },1000)
            }else if(error){
                // const details=error?.details[0].message;
                // handleError(details);
                handleError("Password is Incorrect");
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        }catch(err){
            handleError(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">Login</h2>
                <form onSubmit={handlelogin}>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Your Email"
                            value={loginInfo.email}
                            // required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Password"
                            value={loginInfo.password}
                            // required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Log In
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Doesn't have an account?{' '}
                    <Link to='/signup' className="text-indigo-500 hover:text-indigo-600 font-medium">Sign Up</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
