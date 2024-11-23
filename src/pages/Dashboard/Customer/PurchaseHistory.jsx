import { useState, useEffect } from "react";
import usePaymentInfo from "../../../hooks/usePaymentInfo";
import moment from "moment"; // Import moment for date formatting

const PurchaseHistory = () => {
    const [payments, refetch] = usePaymentInfo();
    const [purchaseHistory, setPurchaseHistory] = useState(payments);

    // Polling to refresh purchase history every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch(); // Refetch the payments data
        }, 5000);

        return () => clearInterval(intervalId); // Clear the interval on cleanup
    }, [refetch]);

    // Update purchase history when payments data changes
    useEffect(() => {
        setPurchaseHistory(payments);
    }, [payments]);

    return (
        <div className="min-h-screen bg-gray-100 px-12">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Purchase History</h1>

                {purchaseHistory?.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <p>No purchases found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 border border-gray-300 text-left">Transaction ID</th>
                                    <th className="p-2 border border-gray-300 text-left">Customer Email</th>
                                    <th className="p-2 border border-gray-300 text-left">Amount Paid</th>
                                    <th className="p-2 border border-gray-300 text-left">Payment Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchaseHistory?.map((purchase) => (
                                    <tr key={purchase.transactionId} className="hover:bg-gray-100">
                                        <td className="p-2 border border-gray-300">{purchase.transactionId}</td>
                                        <td className="p-2 border border-gray-300">{purchase.customerEmail}</td>
                                        <td className="p-2 border border-gray-300">${parseFloat(purchase.payableAmount).toFixed(2)}</td>
                                        <td className="p-2 border border-gray-300">
                                            {moment(purchase.paymentTime).format('hh:mm A, MMM Do YYYY')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseHistory;
