"use client"
import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const customColors = ['rgb(100, 96, 199)'];

const customTheme = {
  axis: {
    ticks: {
      line: {
        stroke: 'rgb(100, 96, 199)',
      },
      text: {
        fill: 'rgb(100, 96, 199)',
      },
    },
  },
  grid: {
    line: {
      stroke: '#ddd',
      strokeDasharray: '2 2',
    },
  },
};

const Page = () => {
  const [invoices, setInvoices] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const invoicesSnapshot = await getDocs(collection(db, 'invoices'));
      const employeesSnapshot = await getDocs(collection(db, 'employees'));

      const invoicesList = invoicesSnapshot.docs.map(doc => doc.data());
      const employeesList = employeesSnapshot.docs.map(doc => doc.data());

      setInvoices(invoicesList);
      setEmployees(employeesList);
    };

    fetchData();
  }, []);

  // Total Revenue
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  // Invoices Status
  const statusData = invoices.reduce((acc, invoice) => {
    const status = invoice.status || 'unknown';
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});

  const statusChartData = Object.keys(statusData).map(status => ({
    id: status,
    label: status,
    value: statusData[status],
  }));

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-2">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Total Revenue</h3>
        <p className="text-2xl">${totalRevenue}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Invoices Status</h3>
        <div className="h-64">
          <ResponsivePie data={statusChartData} theme={customTheme} colors={['rgb(100, 96, 199)', '#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C']} />
        </div>
      </div>
    </div>
  );
};

export default Page;
