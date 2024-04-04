'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { navigate } from '../../../../utils/redirect.js';

const EditPaymentPage = () => {

    const payment_id = useParams().payment_id;

    useEffect(() => {
    axios.get(`http://localhost:8000/payments/${payment_id}`).then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setAmount(response.data.amount);
        setDate(response.data.date);
        setPaymentType(response.data.payment_type);
        setRecipient(response.data.recipient);
    }).catch((error) => {
        console.error(error);
    });
    }, []);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [recipient, setRecipient] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/payments/update/${payment_id}`, {
            name,
            amount,
            date,
            payment_type: paymentType,
            recipient
        }).then((response) => {
            console.log(response.data);
            navigate('/payments');
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-5">
            <h1 className="text-3xl font-bold mb-4 ">Edit Payment:</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border-2 border-gray-500 rounded-lg p-2 w-80 mb-4" />
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="border-2 border-gray-500 rounded-lg p-2 w-80 mb-4" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" className="border-2 border-gray-500 rounded-lg p-2 w-80 mb-4" />
                <input type="text" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} placeholder="Payment Type" className="border-2 border-gray-500 rounded-lg p-2 w-80 mb-4" />
                <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient" className="border-2 border-gray-500 rounded-lg p-2 w-80 mb-4" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit Payment</button>
            </form>
        </div>
    );

};

export default EditPaymentPage;