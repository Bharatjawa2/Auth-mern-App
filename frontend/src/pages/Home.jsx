import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../ToastMsg/utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess("User Logged out");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "https://auth-mern-app-api-three.vercel.app/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            setProducts(result);
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center text-gray-800">
                <h1 className="text-3xl font-bold mb-4">Welcome, {loggedInUser}</h1>
                <h2 className="text-xl font-semibold mb-4">Product List</h2>
                
                <div className="space-y-2">
                    {products.length > 0 ? (
                        products.map((item, index) => (
                            <div key={index} className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-md">
                                <span className="font-medium">{item.name}</span>
                                <span className="font-bold text-indigo-600">${item.price}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No products available.</p>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
                    Logout
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
