'use client'

import axios from 'axios';
import { navigate } from '../../../utils/redirect.js';
import { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            alert('Please fill in all fields');
            return;
        }

        axios.post('http://localhost:8000/login', {
            username,
            password
        }).then((response) => {
            console.log(response.data);
            alert('Login successful');
            navigate('/');
        }).catch((error) => {
            console.error(error);
            alert('Login failed');
        });

    };


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-red-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 pd">
                <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-sm ">
                ¿No tienes una cuenta? {' '}
                <button onClick={() => navigate('/user/register')}>
                    <span className="font-bold">Regístrate</span>
                </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;