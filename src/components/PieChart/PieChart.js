"use client";
import { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { db } from '@/app/prototype/_utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchInvoiceData = async () => {
    const invoicesCollection = collection(db, 'invoices');
    const invoicesDocs = await getDocs(invoicesCollection);
    const invoicesData = invoicesDocs.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });

    // Aggregate data by status
    const statusData = invoicesData.reduce((acc, invoice) => {
        if (!acc[invoice.status]) {
            acc[invoice.status] = 0;
        }
        acc[invoice.status] += 1;
        return acc;
    }, {});

    return Object.entries(statusData).map(([status, count]) => ({ id: status, label: status, value: count }));
};

const MyResponsivePie = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInvoiceData().then(setData);
    }, []);

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            enableRadialLabels={false}
            sliceLabel={d => `${d.id}: ${d.value}`}
        />
    );
};

export default MyResponsivePie;
