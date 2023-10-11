import React, { useState } from 'react';

export default function IndividualWaves({ GameData, bosses, rotations }) {
  const shifts = GameData.data.shiftResults;
  const findmap = rotations.data.coopGroupingSchedule.regularSchedules.nodes;
  console.log(shifts);

  const [displayedShifts, setDisplayedShifts] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    if (currentIndex + displayedShifts + 4 <= shifts.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex >= 4) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  const backgroundImageUrl = findmap[0].setting.coopStage.image.url;

  function nightwaveIcon(nightWave) {
    switch (nightWave) {
        case 'grillers':
            return 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/4/49/S3_Griller_icon.png/180px-S3_Griller_icon.png';
        break;
        case 'rush':
            return 'https://th.bing.com/th/id/R.22efe99ffc3776ed25453776b563b52f?rik=h32%2fSy6cu3J7tA&pid=ImgRaw&r=0';
        break;
        case 'goldie_seeking':
            return 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/bc/S3_Goldie_icon.png/180px-S3_Goldie_icon.png';
        break;
        case 'cohack_charge':
            return 'https://cdn.wikimg.net/en/splatoonwiki/images/3/3d/S3_Cohock_icon.png';
        break;
        case 'fog':
            return 'https://opinion.cooperativa.cl/noticias/imag/cooperativa_2018/iconos/clima/parcialalta2humo.svg';
        break;
        case 'mothership':
            return 'https://cdn.wikimg.net/en/splatoonwiki/images/4/4b/S3_Chinook_icon.png';
        break;
        case 'mudmouth':
            return 'https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/07/S3_Mudmouth_icon.png/180px-S3_Mudmouth_icon.png';
        break;
        case 'tornado':
            return 'https://th.bing.com/th/id/R.079b81db8147054d38105441706dd656?rik=6mVDiJqqeBNRNw&pid=ImgRaw&r=0';
        break;
    }
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
    <>
    <div>
        <div className='grid sm:grid-cols-4 sm:grid-rows-1 grid-cols-1 gap-6 w-full'>
            {shifts.slice(currentIndex, currentIndex + displayedShifts).map((shift, index) => (
            <div
                key={index}
                className='bg-black w-full rounded-lg flex flex-col items-center gap-2 shadow-lg shadow-black'
                style={{ 
                    backgroundImage: `url(${backgroundImageUrl})`, 
                    backgroundSize: 'cover',
                }}
            >
            <div className='p-4 grid grid-cols-1 gap-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <div className='flex justify-between w-full'>
                    <div className='text-white bg-black p-1 rounded-md text-[0.8rem] text-center flex items-center'><h1>{findmap[0].setting.coopStage.name}</h1></div>
                    <div className='text-white bg-black p-1 rounded-md text-[0.8rem] w-[50%] flex flex-row gap-2'>
                        <img className='w-[20%]' src={findmap[0].setting.weapons[0].image.url} alt="weapon1" />
                        <img className='w-[20%]' src={findmap[1].setting.weapons[1].image.url} alt="weapon2" />
                        <img className='w-[20%]' src={findmap[2].setting.weapons[2].image.url} alt="weapon3" />
                        <img className='w-[20%]' src={findmap[3].setting.weapons[3].image.url} alt="weapon4" />
                    </div>
                </div>

                <div className='text-white bg-black w-full rounded-md p-2'>
                    <h2 className='text-green-600'><strong>Eggsecutive rank: </strong>{shift.evp}</h2>
                </div>

                <div className='grid grid-cols-3 w-full'>
                    {shift.results[0] && (
                        <div className='bg-orange-800 border-l-[1px] border-r-[1px] border-orange-700 text-[1rem] text-black font-semibold w-full rounded-l-md'>
                            <p className='flex justify-center'>wave 1</p>
                            <span className='w-full bg-black flex justify-center py-1 gap-1'>
                                <p className='text-[0.85rem] font-semibold text-white'>{shift.results[0].quota}</p>
                                <img className='w-[20%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cf/S2_Icon_Golden_Egg.png/120px-S2_Icon_Golden_Egg.png" alt="goldegg" />
                            </span>
                            <p className='flex justify-center pt-2'>{shift.results[0].tide}</p>

                            {shift.results[0].nightWave !== 'daytime' ? (
                                <span className='flex justify-center items-center'><img className='w-[30%]' src={nightwaveIcon(shift.results[0].nightWave)} alt='nightWaveIcon'/></span>
                            ) : (
                                <p className='flex justify-center pt-2'>{shift.results[0].nightWave}</p>
                            )}

                            {!shift.results[0].bossCounts == 0 ? (
                                <p className='text-[1rem] pt-3 flex justify-center gap-2'><span className='font-normal'>Bosses: </span><strong>{sumValues(shift.results[0].bossCounts)}</strong></p>
                            ) : null}

                            <p className='flex justify-center text-[0.9rem] gap-1'><span className='font-normal'>Goldeggs: </span> <strong>{Math.round(shift.results[0].quota * 2.3)}</strong></p>
                        </div>
                    )}
                    {shift.results[1] && (
                        <div className='bg-orange-800 border-l-[1px] border-r-[1px] border-orange-700 text-[1rem] text-black font-semibold w-full'>
                            <p className='flex justify-center'>wave 2</p>
                            <span className='w-full bg-black flex justify-center py-1 gap-1'>
                                <p className='text-[0.85rem] font-semibold text-white'>{shift.results[1].quota}</p>
                                <img className='w-[20%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cf/S2_Icon_Golden_Egg.png/120px-S2_Icon_Golden_Egg.png" alt="goldegg" />
                            </span>
                            <p className='flex justify-center pt-2'>{shift.results[1].tide}</p>

                            {shift.results[1].nightWave !== 'daytime' ? (
                                <span className='flex justify-center items-center'><img className='w-[30%]' src={nightwaveIcon(shift.results[1].nightWave)} alt='nightWaveIcon'/></span>
                            ) : (
                                <p className='flex justify-center pt-2'>{shift.results[1].nightWave}</p>
                            )}

                            {!shift.results[1].bossCounts == 0 ? (
                                <p className='text-[1rem] pt-3 flex justify-center gap-2'><span className='font-normal'>Bosses: </span><strong>{sumValues(shift.results[1].bossCounts)}</strong></p>
                            ) : null}

                            <p className='flex justify-center text-[0.9rem] gap-1'><span className='font-normal'>Goldeggs: </span> <strong>{Math.round(shift.results[1].quota * 2.3)}</strong></p>
                        </div>
                    )}
                    {shift.results[2] && (
                        <div className='bg-orange-800 border-l-[1px] border-r-[1px] border-orange-700 text-[1rem] text-black font-semibold w-full rounded-r-md'>
                            <p className='flex justify-center'>wave 3</p>
                            <span className='w-full bg-black flex justify-center py-1 gap-1'>
                                <p className='text-[0.85rem] font-semibold text-white'>{shift.results[2].quota}</p>
                                <img className='w-[20%]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cf/S2_Icon_Golden_Egg.png/120px-S2_Icon_Golden_Egg.png" alt="goldegg" />
                            </span>
                            <p className='flex justify-center pt-2'>{shift.results[2].tide}</p>

                            {shift.results[2].nightWave !== 'daytime' ? (
                                <span className='flex justify-center items-center'><img className='w-[30%]' src={nightwaveIcon(shift.results[2].nightWave)} alt='nightWaveIcon'/></span>
                            ) : (
                                <p className='flex justify-center pt-2'>{shift.results[2].nightWave}</p>
                            )}

                            {!shift.results[2].bossCounts == 0 ? (
                                <p className='text-[1rem] pt-3 flex justify-center gap-2'><span className='font-normal'>Bosses: </span><strong>{sumValues(shift.results[2].bossCounts)}</strong></p>
                            ) : null}

                            <p className='flex justify-center text-[0.9rem] gap-1'><span className='font-normal'>Goldeggs: </span> <strong>{Math.round(shift.results[2].quota * 2.3)}</strong></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
            ))}
        </div>
        <div className='w-full flex justify-between mt-5'>
            <button className='text-white bg-orange-800 py-2 px-3 rounded-md hover:translate-x-[15%] hover:shadow-sm hover:shadow-orange-600 transition duration-300 ease-linear' onClick={handlePrevClick}>Previous</button>
            <button className='text-white bg-orange-800 py-2 px-3 rounded-md hover:translate-x-[-15%] hover:shadow-sm hover:shadow-orange-600 transition duration-300 ease-linear' onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </>
  );
}
