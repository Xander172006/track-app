import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ChartComponent({ bosses }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = document.getElementById('myChart');
        if (ctx) {
            if (chartRef.current) {
                // If a chart already exists, destroy it first
                chartRef.current.destroy();
            }

            const labels = bosses
                ? [
                      bosses.steelheads,
                      bosses.flyfishes,
                      bosses.maws,
                      bosses.steeleals,
                      bosses.stingers,
                      bosses.scrappers,
                      bosses.drizzlers,
                      bosses.flippers,
                      bosses.slamonlids,
                      bosses.fishticks,
                      bosses.bigshots,
                  ]
                : Array(11).fill(0);

            // Create the new chart and store it in the ref
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '# of Votes',
                            data: labels,
                            backgroundColor: '#DB5500',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 0,
                            max: 5000,
                            stepSize: 500,
                            ticks: {
                                color: 'white', // Set y-axis label text color to white
                            },
                        },
                        x: {
                            ticks: {
                                color: 'white', // Set x-axis label text color to white
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        }
    }, [bosses]);

    return <canvas id='myChart' width='350' height='250'></canvas>;
}
