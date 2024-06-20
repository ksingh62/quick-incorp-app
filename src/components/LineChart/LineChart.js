"use client";
import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { db } from '@/app/prototype/_utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchInvoiceData = async () => {
    const invoicesCollection = collection(db, 'invoices');
    const invoicesDocs = await getDocs(invoicesCollection);
    const invoicesData = invoicesDocs.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });

    // Aggregate data by date
    const dailyData = invoicesData.reduce((acc, invoice) => {
        const date = new Date(invoice.date).toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += invoice.amount;
        return acc;
    }, {});

    return Object.entries(dailyData).map(([date, amount]) => ({ x: date, y: amount }));
};

const MyResponsiveLine = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInvoiceData().then(dailyData => {
            setData([{ id: 'invoices', data: dailyData }]);
        });
    }, []);

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisBottom={{ legend: 'Date', legendPosition: 'middle', legendOffset: 36 }}
            axisLeft={{ legend: 'Total Amount', legendPosition: 'middle', legendOffset: -40 }}
            pointSize={10}
            pointBorderWidth={2}
            useMesh={true}
        />
    );
};

export default MyResponsiveLine;
