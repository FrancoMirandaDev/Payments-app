'use client'

import axios from 'axios';
import {navigate} from '../../../utils/redirect.js';
import { useState } from 'react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = () => {


        if(password.length < 8){
            alert('Password must be at least 8 characters');
            return;
        }

        if (username === '' || password === '' || email === '') {
            alert('Please fill in all fields');
            return;
        }

        axios.post('http://localhost:8000/register', {
            username,
            password,
            email,
            name
        }).then((response) => {
            console.log(response.data);
            alert('Register successful');
            navigate('/user/login');
        }).catch((error) => {
            console.error(error);
            alert('Register failed');
        });

    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            
            <h1 className="text-3xl font-bold mb-4 ">Register</h1>
            <input 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <button
                onClick={handleRegister}
                className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
                Register
            </button>
        </div>
    );
};

export default RegisterPage;