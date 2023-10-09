import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

export default function LineChartcomponent({ GameData }) {
    const shiftcount = Object.keys(GameData.data.shiftResults).length - 1;
    const waves = shiftcount * 3;

    const nightwavesCounts = {
        'daytime': 0,
        'rush': 0,
        'griller': 0,
        'fog': 0,
        'mothership': 0,
        'cohack charge': 0,
        'goldie seeking': 0,
        'tornado': 0,
        'mudmouth': 0
    };

    const tideCounts = {
        'low': 0,
        'normal': 0,
        'high': 0,
    };
    
    for (let i = 0; i <= shiftcount; i++) {
        const shiftResults = GameData.data.shiftResults[i];
        if (shiftResults) {
            for (let j = 0; j <= 2; j++) {
                if (shiftResults.results && shiftResults.results[j]) {
                    let tideinfo = shiftResults.results[j].tide;
                    let nightwaveinfo = shiftResults.results[j].nightWave;
    
                    // Accumulate the tide counts
                    switch (tideinfo) {
                        case 'low':
                            tideCounts.low += 1;
                            break;
                        case 'normal':
                            tideCounts.normal += 1;
                            break;
                        case 'high':
                            tideCounts.high += 1;
                            break;
                    }

                    switch (nightwaveinfo) {
                        case 'daytime':
                            nightwavesCounts.daytime += 1;
                        break;
                        case 'rush':
                            nightwavesCounts.rush += 1;
                        break;
                        case 'grillers':
                            nightwavesCounts.griller += 1;
                        break;
                        case 'tornado':
                            nightwavesCounts.tornado += 1;
                        break;
                        case 'mudmouth':
                            nightwavesCounts.mudmouth += 1;
                        break;
                        case 'mothership':
                            nightwavesCounts.mothership += 1;
                        break;
                        case 'goldie_seeking':
                            nightwavesCounts['goldie seeking'] += 1;
                        break;
                        case 'cohack_charge':
                            nightwavesCounts['cohack charge'] += 1;
                        break;
                        case 'fog':
                            nightwavesCounts.fog += 1;
                        break;
                    }
                }
            }
        }
    }

    const radarChartRef = useRef(null);

    useEffect(() => {
      const ctx = document.getElementById('myRadarChart');
      if (ctx) {
        if (radarChartRef.current) {
          radarChartRef.current.destroy();
        }
    
        const nightwaveNames = [
          'rush',
          'griller',
          'goldie seeking',
          'cohack charge',
          'mothership',
          'tornado',
          'mudmouth',
          'fog',
        ];
    
        const nightwaveData = [
          nightwavesCounts.rush,
          nightwavesCounts.griller,
          nightwavesCounts['goldie seeking'],
          nightwavesCounts['cohack charge'],
          nightwavesCounts.mothership,
          nightwavesCounts.tornado,
          nightwavesCounts.mudmouth,
          nightwavesCounts.fog
        ];
    
        const labels = nightwaveNames;

        const data = nightwaveData;
    
        radarChartRef.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: labels,
            color: 'white',
            datasets: [
              {
                fill: true,
                data: data,
                color: 'white',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: '#D93E01',
                pointBackgroundColor: '#D93E01',
                pointBorderColor: '#D93E01',
                pointHoverBackgroundColor: '#D93E01',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
                borderCapStyle: 'round',
              }
            ]
          },
          options: {
            scales: {
              r: {
                max: 14,
                min: 0,
                
                ticks: {
                  stepSize: 2,
                  textStrokeColor: 'gray',
                  color: 'white',
                  font: {
                    size: 12
                  },
                  backdropColor: 'transparent',
                },

                angleLines: {
                  color: '#7A1601'
                },

                grid: {
                  color: 'darkgreen',
                },

                pointLabels: {
                  display: false
                }
              }
            },
            elements: {
              line: {
                borderWidth: 1,
                borderColor: 'white'
              },
            },
            plugins: {
              legend: {
                  display: false,
                  labels: {
                    color: 'white'
                  }
              }
            }
          }       
        });
      }
    }, [nightwavesCounts]);

    const [currentShiftIndex, setCurrentShiftIndex] = useState(0);
    const [shiftdata, setShiftData] = useState(GameData.data.shiftResults[0]);

    function decreaseValue() {
      if (currentShiftIndex > 0) {
        const newIndex = currentShiftIndex - 1;
        setCurrentShiftIndex(newIndex);
    
        const newShiftData = GameData.data.shiftResults[newIndex];
        if (newShiftData) {
          setShiftData(newShiftData);
        } else {
          setShiftData(null);
        }
      }
    }

    function increaseValue() {
      if (currentShiftIndex < GameData.data.shiftResults.length - 1) {
        const newIndex = currentShiftIndex + 1;
        setCurrentShiftIndex(newIndex);

        
        const newShiftData = GameData.data.shiftResults[newIndex];
        console.log(newShiftData);
        if (newShiftData) {
          setShiftData(newShiftData);
        } else {
          setShiftData(null);
        }
      }
    }


    let totalquota = 0;
    console.log(GameData.data)

    let kingsdefeated = GameData.data.totalAmountKings.cohozuna + GameData.data.totalAmountKings.horrorborus;

    for (let x = 0; x < shiftdata.results.length; x++) {
      totalquota += shiftdata.results[x].quota;
    }


    function sumValues(obj) {
      let sum = 0;
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          sum += obj[key];
        }
      }
      return sum;
    }
    
    return (
      <div className='grid grid-cols-2 gap-3 w-full'>
        <div className='bg-black w-full rounded-lg flex flex-col items-center shadow-lg shadow-gray-900 p-2 mb-auto'>
          <h1 className='p-2'><strong>Radar chart</strong></h1>
          <canvas className='w-full text-white' id="myRadarChart"></canvas>
        </div>

        <div className='bg-black w-full ml-auto rounded-lg flex flex-col items-center shadow-lg shadow-gray-900 p-2 mb-auto'>
          <h1 className='p-2'><strong>Night waves</strong></h1>
          <ul className='grid grid-cols-2 gap-3 text-[0.6rem] sm:text-[0.8rem] w-full'>
                {nightwavesCounts.rush > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full border-[1px] border-orange-800 p-1 rounded-md'>
                    <img className='w-[40%]' src="https://th.bing.com/th/id/R.22efe99ffc3776ed25453776b563b52f?rik=h32%2fSy6cu3J7tA&pid=ImgRaw&r=0" alt="rush" />
                    <span className='ml-auto'>{nightwavesCounts.rush}</span>
                  </li>
                )}

                {nightwavesCounts.griller > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full border-[1px] border-orange-800 p-1 rounded-md'>
                      <img className='w-[40%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/49/S3_Griller_icon.png/180px-S3_Griller_icon.png" alt="grillers" />
                      <span className='ml-auto'>{nightwavesCounts.griller}</span>
                  </li>
                )}

                {nightwavesCounts['goldie seeking'] > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full border-[1px] border-orange-800 p-1 rounded-md'>
                    <img className='w-[40%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/bc/S3_Goldie_icon.png/180px-S3_Goldie_icon.png" alt="goldie_seeking" />
                    <span className='ml-auto'>{nightwavesCounts['goldie seeking']}</span>
                  </li>
                )}

                {nightwavesCounts['cohack charge'] > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full border-[1px] border-orange-800 p-1 rounded-md'>
                    <img className='w-[40%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/3/3d/S3_Cohock_icon.png" alt="cohack_charge" />
                    <span className='ml-auto'>{nightwavesCounts['cohack charge']}</span>
                  </li>
                )}

                {nightwavesCounts.fog > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full border-[1px] border-orange-800 p-1 rounded-md'>
                    <img className='w-[40%] text-white' src="https://opinion.cooperativa.cl/noticias/imag/cooperativa_2018/iconos/clima/parcialalta2humo.svg" alt="fog" />
                    <span className='ml-auto'>{nightwavesCounts.fog}</span>
                  </li>
                )}

                {nightwavesCounts.mothership > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full border-[1px] border-orange-800 p-1 rounded-md'>
                    <img className='w-[40%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/4/4b/S3_Chinook_icon.png" alt="mothership" />
                    <span className='ml-auto'>{nightwavesCounts.mothership}</span>
                  </li>
                )}

                {nightwavesCounts.mudmouth > 0 && (
                  <li className='flex flex-row items-center w-full border-[1px] border-orange-800 p-1 rounded-md'>
                    <img className='w-[40%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/07/S3_Mudmouth_icon.png/180px-S3_Mudmouth_icon.png" alt="mudmouth" />
                    <span className='ml-auto'>{nightwavesCounts.mudmouth}</span>
                  </li>
                )}

                {nightwavesCounts.tornado > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full border-[1px] border-orange-800 p-1 rounded-md'>
                    <img className='w-[40%]' src="https://th.bing.com/th/id/R.079b81db8147054d38105441706dd656?rik=6mVDiJqqeBNRNw&pid=ImgRaw&r=0" alt="tornado" />
                    <span className='ml-auto'>{nightwavesCounts.tornado}</span>
                  </li>
                )}
            </ul>
        </div>


          {/* <div className='w-full'>
            <ul className='grid grid-cols-4 gap-3 text-[0.6rem] sm:text-[0.8rem] w-full'>
                {nightwavesCounts.rush > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full gap-1 bg-gray-800 p-1 rounded-lg'>
                    <img className='w-[25%]' src="https://th.bing.com/th/id/R.22efe99ffc3776ed25453776b563b52f?rik=h32%2fSy6cu3J7tA&pid=ImgRaw&r=0" alt="rush" />
                    <strong>rush:</strong> <span className='ml-auto'>{nightwavesCounts.rush}</span>
                  </li>
                )}

                {nightwavesCounts.griller > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full gap-1 bg-gray-800 p-1 rounded-lg'>
                      <img className='w-[25%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/49/S3_Griller_icon.png/180px-S3_Griller_icon.png" alt="grillers" />
                      <strong>grillers:</strong> <span className='ml-auto'>{nightwavesCounts.griller}</span>
                  </li>
                )}

                {nightwavesCounts['goldie seeking'] > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full gap-1 bg-gray-800 p-1 rounded-lg'>
                    <img className='w-[25%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/bc/S3_Goldie_icon.png/180px-S3_Goldie_icon.png" alt="goldie_seeking" />
                    <strong className='text-[0.6rem]'>goldie seeking:</strong> <span className='ml-auto'>{nightwavesCounts['goldie seeking']}</span>
                  </li>
                )}

                {nightwavesCounts['cohack charge'] > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full gap-1 bg-gray-800 p-1 rounded-lg'>
                    <img className='w-[25%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/3/3d/S3_Cohock_icon.png" alt="cohack_charge" />
                    <strong className='text-[0.65rem]'>cohack charge:</strong> <span className='ml-auto'>{nightwavesCounts['cohack charge']}</span>
                  </li>
                )}

                {nightwavesCounts.fog > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full gap-1 bg-gray-800 p-1 rounded-lg'>
                    <img className='w-[25%] text-white' src="https://opinion.cooperativa.cl/noticias/imag/cooperativa_2018/iconos/clima/parcialalta2humo.svg" alt="fog" />
                    <strong>fog:</strong> <span className='ml-auto'>{nightwavesCounts.fog}</span>
                  </li>
                )}

                {nightwavesCounts.mothership > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full gap-1 bg-gray-800 p-1 rounded-lg'>
                    <img className='w-[25%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/4/4b/S3_Chinook_icon.png" alt="mothership" />
                    <strong>mothership:</strong> <span className='ml-auto'>{nightwavesCounts.mothership}</span>
                  </li>
                )}

                {nightwavesCounts.mudmouth > 0 && (
                  <li className='flex flex-row items-center w-full gap-1 bg-gray-800 p-1 rounded-lg'>
                    <img className='w-[25%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/07/S3_Mudmouth_icon.png/180px-S3_Mudmouth_icon.png" alt="mudmouth" />
                    <strong>mudmouth:</strong> <span className='ml-auto'>{nightwavesCounts.mudmouth}</span>
                  </li>
                )}

                {nightwavesCounts.tornado > 0 && (
                  <li className='flex flex-row items-center w-[110%] sm:w-full gap-1 bg-gray-800 p-1 rounded-lg'>
                    <img className='w-[25%]' src="https://th.bing.com/th/id/R.079b81db8147054d38105441706dd656?rik=6mVDiJqqeBNRNw&pid=ImgRaw&r=0" alt="tornado" />
                    <strong>tornado:</strong> <span className='ml-auto'>{nightwavesCounts.tornado}</span>
                  </li>
                )}
            </ul>
          </div> */}





        {/* <div className='grid grid-cols-1 sm:w-[70%] w-full h-full mb-auto p-2'>
                <div className='grid grid-cols-2 gap-2 sm:w-[50%] w-[70%] h-[10%]'>
                  <button className='text-gray-300 p-1 rounded-lg flex items-center justify-center gap-1 hover:translate-x-[-6px] transition duration-300 ease-in-out' onClick={decreaseValue}>← previous</button>
                  <button className='text-gray-300 p-1 rounded-lg flex items-center justify-center gap-1 hover:translate-x-[6px] transition duration-300 ease-in-out' onClick={increaseValue}>next →</button>
                </div>

                <div>
                  {shiftdata && (
                    <>
                      <ul className='flex flex-row items-center gap-5'>
                        <li className='backdrop-blur-[5px] bg-gray-400 bg-opacity-20 p-2 w-[45%] rounded-lg font-bold mt-3 flex flex-col justify-start gap-1'>
                          <span className='text-green-500'>Eggsecutive evp {shiftdata.evp}</span>
                          <span className='flex flex-row items-center justify-start'><img className='w-[15%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cf/S2_Icon_Golden_Egg.png/120px-S2_Icon_Golden_Egg.png" alt="eggs" />{totalquota}</span>

                          <span className='flex flex-row gap-2'>
                            <img className='w-[12.5%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/a/a1/S3_Icon_bronze_fish_scale.png/36px-S3_Icon_bronze_fish_scale.png" alt="bronzescales" />-
                            <img className='w-[12.5%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/00/S3_Icon_silver_fish_scale.png/36px-S3_Icon_silver_fish_scale.png" alt="silverscales" />-
                            <img className='w-[12.5%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/2/20/S3_Icon_gold_fish_scale.png/36px-S3_Icon_gold_fish_scale.png" alt="goldscales" />-
                          </span>
                        </li>
                        <li>
                          <span>Games played: {shiftcount}</span>
                        </li>
                      </ul>

                      
                      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 place-content-center items-center mt-7'>
                      {shiftdata.results[0] && (
                        <div className='bg-gray-800 rounded-lg flex flex-col justify-center items-center gap-2 pt-4 h-full'>
                          <h4 className='font-bold text-[1.1rem] text-gray-300 bg-black w-full flex justify-center mb-0'>wave 1</h4>

                          <div className='py-4 flex flex-col justify-center items-center mb-auto gap-3 relative w-full'>
                            <p>{shiftdata.results[0].tide} tide</p>
                            <p>{shiftdata.results[0].nightWave}</p>
                            <p className='flex flex-row gap-1 justify-center'><img className='w-[15%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cf/S2_Icon_Golden_Egg.png/120px-S2_Icon_Golden_Egg.png" alt="goldeggs" /><span>quota</span><span>{shiftdata.results[0].quota}</span></p>
                            {shiftdata.results[0] && sumValues(shiftdata.results[0].bossCounts) !== 0 ? (
                              <p className='flex flex-row gap-2'><span>bosses found</span><span>{sumValues(shiftdata.results[0].bossCounts)}</span></p>
                            ) : null}
                          </div>
                        </div>
                      )}

                      {shiftdata.results[1] && (
                        <div className='bg-gray-800 rounded-lg flex flex-col justify-center items-center gap-2 pt-4 h-full'>
                          <h4 className='font-bold text-[1.1rem] text-gray-300 bg-black w-full flex justify-center mb-auto'>wave 2</h4>

                          <div className='py-4 flex flex-col justify-center items-center mb-auto gap-3 relative w-full'>
                            <p>{shiftdata.results[1].tide} tide</p>
                            <p>{shiftdata.results[1].nightWave}</p>
                            <p className='flex flex-row gap-1 justify-center'><img className='w-[15%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cf/S2_Icon_Golden_Egg.png/120px-S2_Icon_Golden_Egg.png" alt="goldeggs" /><span>quota</span><span>{shiftdata.results[1].quota}</span></p>
                            {shiftdata.results[1] && sumValues(shiftdata.results[1].bossCounts) !== 0 ? (
                              <p className='flex flex-row gap-2'><span>bosses found</span><span>{sumValues(shiftdata.results[1].bossCounts)}</span></p>
                            ) : null}
                          </div>
                        </div>
                      )}

                      {shiftdata.results[2] && (
                        <div className='bg-gray-800 rounded-lg flex flex-col justify-center items-center gap-2 pt-4 h-full'>
                          <h4 className='font-bold text-[1.1rem] text-gray-300 bg-black w-full flex justify-center mb-auto'>wave 3</h4>
                          
                          <div className='py-4 flex flex-col justify-center items-center mb-auto gap-3 relative w-full'>
                            <p>{shiftdata.results[2].tide} tide</p>
                            <p>{shiftdata.results[2].nightWave}</p>
                            <p className='flex flex-row gap-1 justify-center'><img className='w-[15%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cf/S2_Icon_Golden_Egg.png/120px-S2_Icon_Golden_Egg.png" alt="goldeggs" /><span>quota</span><span>{shiftdata.results[2].quota}</span></p>
                            {shiftdata.results[2] && sumValues(shiftdata.results[2].bossCounts) !== 0 ? (
                              <p className='flex flex-row gap-2'><span>bosses found</span><span>{sumValues(shiftdata.results[2].bossCounts)}</span></p>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                    </>
                  )}
                </div>
                <div className='mt-12 flex flex-row items-center gap-4 sm:text-[1.2rem] text-center'>
                  <strong>Total of kings found: </strong>
                  <span className='flex flex-row items-center'>
                    <img className='w-[25%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/0a/S3_Horrorboros_icon.png/180px-S3_Horrorboros_icon.png" alt="kingsdefeated" />
                    <strong>{kingsdefeated}</strong>
                  </span>
                </div>
        </div> */}
    </div>
    )
}