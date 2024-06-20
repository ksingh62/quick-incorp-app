"use client"
import { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { db } from '@/app/prototype/_utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchInvoiceData = async () => {
    const invoicesCollection = collection(db, 'invoices');
    const invoicesDocs = await getDocs(invoicesCollection);
    const invoicesData = invoicesDocs.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });


    // Aggregate data by month
    const monthlyData = invoicesData.reduce((acc, invoice) => {
        const month = new Date(invoice.date).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!acc[month]) {
            acc[month] = 0;
        }
        acc[month] += invoice.amount;
        return acc;
    }, {});

    return Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }));
};

const MyResponsiveBar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInvoiceData().then(setData);
    }, []);

    return (
        <ResponsiveBar
            data={data}
            keys={['amount']}
            indexBy="month"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            axisBottom={{ legend: 'Month', legendPosition: 'middle', legendOffset: 32 }}
            axisLeft={{ legend: 'Total Amount', legendPosition: 'middle', legendOffset: -40 }}
        />
    );
};

export default MyResponsiveBar;
