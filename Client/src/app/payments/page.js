'use client'

import { useState ,useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const PaymentPage = () => {
    const [payments, setPayments] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        date: { from: '', to: '' },
        amount: '',
        payment_type: ''
    });

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

    const applyFilters = (payment) => {
        return (
            payment.name.toLowerCase().includes(filters.search.toLowerCase()) &&
            (
                (filters.date.from === '' && filters.date.to === '') ||
                (payment.date >= filters.date.from && payment.date <= filters.date.to)
            ) &&
            (filters.amount === '' || parseFloat(payment.amount) === parseFloat(filters.amount)) &&
            (filters.payment_type === '' || payment.payment_type.toLowerCase().includes(filters.payment_type.toLowerCase()))
        );
    };

    const filteredPayments = payments.filter(applyFilters);

    const handleFilterChange = (filterKey, value) => {
        setFilters({
            ...filters,
            [filterKey]: value
        });
    };



    return (
        <div className="flex flex-col items-center justify-center h-screen p-5">
            <h1 className="text-3xl font-bold mb-4 ">Payments:</h1>
            <a href="/payments/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Create Payment</a>

            <input
                type="text"
                placeholder="Search name..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2 mt-6"
            />
            
            <div className="flex space-x-4 mb-2 mt-2">
                <div>
                    <label>Date From:</label>
                    <input
                        type="date"
                        value={filters.date.from}
                        onChange={(e) => handleFilterChange('date', {...filters.date, from: e.target.value})}
                        className="border border-gray-300 rounded-md px-2 py-1"
                    />
                </div>
                <div>
                    <label>Date To:</label>
                    <input
                        type="date"
                        value={filters.date.to }
                        onChange={(e) => handleFilterChange('date', {...filters.date, to: e.target.value})}
                        className="border border-gray-300 rounded-md px-2 py-1"
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={filters.amount }
                        onChange={(e) => handleFilterChange('amount', e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                    />
                </div>
                <div>
                    <label>Payment Type:</label>
                    <input
                        type="text"
                        value={filters.payment_type }
                        onChange={(e) => handleFilterChange('payment_type', e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                    />
                </div>
            </div>

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
                    {filteredPayments.map((payment) => (
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