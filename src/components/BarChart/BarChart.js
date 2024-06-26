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

    console.log(invoicesData)

    const monthlyAggregate = invoicesData.reduce((acc, invoice) => {
        // Convert each date to the first day of the month
        const date = new Date(invoice.date);
        const [formattedDate] = date.toISOString().split('T'); // Convert to 'YYYY-MM-DD' format
        const dateString = formattedDate.substring(0, formattedDate.length - 2);
        const newDateString = dateString.concat("01");
        const elementWithWantedDate = acc.find((element) => element.month === newDateString);

        if (elementWithWantedDate) {
            elementWithWantedDate.amount += invoice.amount;
        }
        else {
            acc.push({ month: newDateString, amount: invoice.amount })
        }
        return acc;
    }, []);

    const sortedMonthlyAggregate = [...monthlyAggregate].sort((a, b) => new Date(a.month) - new Date(b.month));

    return sortedMonthlyAggregate.map((data) => {
        data.month = new Date(data.month).toLocaleString('default', { month: 'short', year: 'numeric' });
        return data;
    });
};

const MyResponsiveBar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchInvoiceData().then(setData);
    }, []);

    console.log(data)

    return (
        // <ResponsiveBar
        //     data={data}
        //     keys={['amount']}
        //     indexBy="month"
        //     margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        //     padding={0.3}
        //     valueScale={{ type: 'linear' }}
        //     indexScale={{ type: 'band', round: true }}
        //     colors={{ scheme: 'nivo' }}
        //     axisBottom={{ legend: 'Month', legendPosition: 'middle', legendOffset: 32 }}
        //     axisLeft={{ legend: 'Total Amount', legendPosition: 'middle', legendOffset: -40 }}
        // />
        <div style={{ height: '500px', width: '100%' }}>
            <ResponsiveBar
                data={data}
                keys={['amount']}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={['rgb(100, 96, 199)']}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    tickValues: 'every 1 month',
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Total Amount',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="#ffffff"
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ],
                        textColor: '#ffffff'
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: '#ffffff',
                                strokeWidth: 1
                            }
                        },
                        legend: {
                            text: {
                                fontSize: 14,
                                fill: '#ffffff'
                            }
                        },
                        ticks: {
                            line: {
                                stroke: '#ffffff',
                                strokeWidth: 1
                            },
                            text: {
                                fontSize: 12,
                                fill: '#ffffff'
                            }
                        }
                    },
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: '#ffffff'
                        }
                    }
                }}
            />
        </div>
    );
};

export default MyResponsiveBar;

/* https://nivo.rocks/bar/ */