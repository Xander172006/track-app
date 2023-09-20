import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function ChartComponent() {
    useEffect(() => {
        const ctx = document.getElementById('myChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['', '', '', '', '', '', '', '', '', '', ''],
                    datasets: [{
                        label: '# of Votes',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        backgroundColor: 'orange',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 0,
                            max: 4000,
                            stepSize: 500,
                            ticks: {
                                color: 'white' // Set y-axis label text color to white
                            }
                        },
                        x: {
                            ticks: {
                                color: 'white' // Set x-axis label text color to white
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }, []);

    return (
        <canvas id='myChart' width='350' height='180'></canvas>
    );
}
