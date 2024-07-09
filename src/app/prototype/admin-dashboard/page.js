"use client"
import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveRadar } from '@nivo/radar';
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

  // Monthly Revenue
  const monthlyData = invoices.reduce((acc, invoice) => {
    const date = new Date(invoice.date);
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += invoice.amount;
    return acc;
  }, {});

  const monthlyChartData = Object.keys(monthlyData).map(month => ({
    x: month,
    y: monthlyData[month],
  }));

  // Employees by Age Group
  const ageGroups = employees.reduce((acc, employee) => {
    const ageGroup = Math.floor(employee.age / 10) * 10;
    if (!acc[ageGroup]) {
      acc[ageGroup] = 0;
    }
    acc[ageGroup]++;
    return acc;
  }, {});

  const ageGroupChartData = Object.keys(ageGroups).map(ageGroup => ({
    ageGroup: `${ageGroup}-${parseInt(ageGroup) + 9}`,
    count: ageGroups[ageGroup],
  }));

  const radarData = ageGroupChartData.map(group => ({
    taste: group.ageGroup,
    count: group.count,
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

      <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-2">
        <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
        <div className="h-64">
          <ResponsiveLine
            data={[
              {
                id: 'Revenue',
                data: monthlyChartData,
              },
            ]}
            colors={customColors}
            theme={customTheme}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Month',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Revenue',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            enableGridX={false}
            enableGridY={true}
            lineWidth={3}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Number of Employees</h3>
        <p className="text-2xl">{employees.length}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Employees by Age Group</h3>
        <div className="h-64">
          <ResponsiveRadar data={radarData} keys={['count']} indexBy="taste" colors={customColors} theme={customTheme} />
        </div>
      </div>
    </div>
  );
};

export default Page;
