'use client'

import { useState } from "react";
import { navigate } from "../../../utils/redirect";
import axios from 'axios';

const CreatePaymentPage = () => {
    const [user_id, setUserId] = useState('1');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState();
    const [date, setDate] = useState('');
    const [payment_type, setPaymentType] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleCreatePayment = () => {
        if (name === '' || date === '' || payment_type === '' || recipient === '') {
            alert('Please fill in all fields');
            return;
        }
        console.log(user_id, name, amount, date, payment_type, recipient);
        

        axios.post('http://localhost:8000/payments/register', {
            user_id,
            name,
            amount,
            date,
            payment_type,
            recipient
        }).then((response) => {
            console.log(response.data);
            alert('Payment created successfully');
            navigate('/payments');
        }).catch((error) => {
            console.error(error);
            alert('Payment creation failed',error);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4 ">Create Payment</h1>
            <input
                type="number"
                placeholder="User ID"
                value={user_id}
                onChange={(e) => setUserId(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <input
                type="text"
                placeholder="Payment Type"
                value={payment_type}
                onChange={(e) => setPaymentType(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <input
                type="text"
                placeholder="Recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <button
                onClick={handleCreatePayment}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Create Payment
            </button>
        </div>
    );

};

export default CreatePaymentPage;