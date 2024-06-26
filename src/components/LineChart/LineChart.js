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
        <div style={{ height: '500px', width: '100%' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Date',
                    legendPosition: 'middle',
                    legendOffset: 36,
                    tickValues: 'every 1 day',
                    legendText: {
                        fill: '#ffffff'
                    },
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Total Amount',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    legendText: {
                        fill: '#ffffff'
                    },
                }}
                colors={['rgb(100, 96, 199)']}
                pointSize={10}
                pointColor="rgb(100, 96, 199)"
                pointBorderWidth={2}
                pointBorderColor="white"
                pointLabelYOffset={-12}
                useMesh={true}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: 'white',
                                strokeWidth: 1
                            }
                        },
                        legend: {
                            text: {
                                fontSize: 14,
                                fill: 'white'
                            }
                        },
                        ticks: {
                            line: {
                                stroke: 'white',
                                strokeWidth: 1
                            },
                            text: {
                                fontSize: 12,
                                fill: 'white'
                            }
                        }
                    },
                    grid: {
                        line: {
                            stroke: 'rgba(255, 255, 255, 0.2)',
                            strokeWidth: 1
                        }
                    },
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: 'white'
                        }
                    },
                    tooltip: {
                        container: {
                            background: 'rgb(100, 96, 199)',
                            color: 'white'
                        }
                    }
                }}
            />
        </div>
    );
};

export default MyResponsiveLine;
