import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function ChartComponent({ bosses }) {
    useEffect(() => {
        const ctx = document.getElementById('myChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [
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
                        bosses.bigshots
                    ],
                    datasets: [{
                        label: '# of Votes',
                        data: [
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
                            bosses.bigshots
                        ],
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
