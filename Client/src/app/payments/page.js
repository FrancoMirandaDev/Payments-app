'use client'

import { useState ,useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const PaymentPage = () => {
    const [payments, setPayments] = useState([]);

    const csvData = [
        ['Name', 'Amount', 'Date', 'Payment Type', 'Recipient'],
        ...payments.map((payment) => [
            payment.name,
            payment.amount,
            payment.date,
            payment.payment_type,
            payment.recipient
        ])
    ];


    useEffect(() => {
        axios.get('http://localhost:8000/payments').then((response) => {
            setPayments(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleDelete = (paymentId) => {
        axios.delete(`http://localhost:8000/payments/delete/${paymentId}`)
            .then((response) => {
                setPayments(payments.filter(payment => payment.payment_id !== paymentId));
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-screen p-5">
            <h1 className="text-3xl font-bold mb-4 ">Payments:</h1>
            <a href="/payments/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Create Payment</a>

            {// payments.length != 0 &&
            <CSVLink data={csvData} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-auto">Export to CSV</CSVLink>
            }
            <table className="min-w-full divide-y divide-x divide-gray-600 mt-4 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-x  divide-gray-950">
                    {payments.map((payment) => (
                        <tr key={payment.payment_id}>
                            <td className="px-6 py-4 whitespace-nowrap">{payment.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">$ {payment.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{payment.payment_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{payment.recipient}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><a href={`/payments/edit/${payment.payment_id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</a></td>
                            <td className="px-6 py-4 whitespace-nowrap"><button onClick={() => handleDelete(payment.payment_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


}

export default PaymentPage;