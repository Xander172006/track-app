import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Layouts/footer';

// charts
import Chartcomponent from '@/Components/charts/Chartcomponent';
import Progressbar from '@/Components/charts/Progressbar';
import DonutChartcomponent from '@/Components/charts/DonutChartcomponent';
import RadarChartcomponent from '@/Components/charts/RadarChartcomponent';

// css
import '../../css/style.css';

import ShiftDisplay from '@/Components/ShiftDisplay';
import StatsDisplay from '@/Components/StatsDisplay';
import BossesDisplay from '@/Components/BossesDisplay';
import Carouseldisplay from '@/Components/CarouselDisplay';

export default function Dashboard({ auth, GameAccount, user, bosses, GameData, records, gear }) {
    const { data, setData, post } = useForm({
        evp: '',
        losses: ''
    });

    const [EvpLevel, setEvplevel] = useState('');
    const [GamesLossed, setGamesLossed] = useState('');
    
    const monthlyGear = gear.data.coopResult.monthlyGear;
    console.log(monthlyGear);

    const HandleEvpLevel = (e) => {
        setEvplevel(e.target.value);
        setData('evp', e.target.value);
        localStorage.setItem('EvpLevel', e.target.value);
    };

    const HandleGameslossed = (e) => {
        setGamesLossed(e.target.value);
        setData('losses', e.target.value);
        localStorage.setItem('GamesLossed', e.target.value);
    };


    const updateStats = async (e) => {
        e.preventDefault();

        try {
            const response = await post('/update-stats', {
                evp: EvpLevel,
                losses: GamesLossed,
            });
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    };


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="max-w-[95%] mx-3 sm:mx-auto sm:px-0 lg:px-0 grid grid-cols-1 gap-6 sm:grid-cols-3 text-white">

                    <div className='grid grid-cols-1 gap-6 w-full h-full text-[0.9rem]'>
                        <div className='grid grid-cols-2 gap-3 w-full'>
                            <div className='bg-black p-2 w-full rounded-lg flex flex-row items-center gap-1 shadow-lg shadow-gray-900'>
                                    <span className='w-[15%]'><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/7a/S3_Cohozuna_icon.png/120px-S3_Cohozuna_icon.png" alt="Cohozuna" /></span>
                                    <strong>cohozuna's:</strong>
                                    <span className='ml-auto mr-4'>{GameAccount.KingSalmonidsDefeated}</span>
                                </div>
                            <div className='bg-black p-2 w-full rounded-lg flex flex-row items-center gap-1 shadow-lg shadow-gray-900'>
                                <span className='w-[15%]'><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/0a/S3_Horrorboros_icon.png/180px-S3_Horrorboros_icon.png" alt="Horrorborrus" /></span>
                                <strong>Horrorborrus:</strong>
                                <span className='ml-auto mr-4'>{GameAccount.KingSalmonidsDefeated}</span>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-6 w-full'>
                            <div className='bg-black p-4 w-full rounded-lg shadow-lg shadow-gray-900'>
                                <h1 className='mb-4 font-bold text-[1rem]'>Total count of bosses</h1>
                                <Chartcomponent bosses={bosses} />
                                <ul className='flex flex-row px-2 ml-11 gap-5 relative bottom-0'>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/9/9a/S3_Steelhead_icon.png?20221009043423" alt="steelhead" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/2/24/S3_Flyfish_icon.png?20221009043406" alt="flyfish" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/8/83/S3_Maws_icon.png?20221009043400" alt="maws" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/6/62/S3_Steel_Eel_icon.png?20221009043416" alt="eels" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/b/b5/S3_Stinger_icon.png?20221009043427" alt="stinger" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/8/8c/S3_Scrapper_icon.png?20221009043355" alt="scrapper" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/0/09/S3_Drizzler_icon.png?20221009043335" alt="drizzler" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/6/65/S3_Flipper-Flopper_icon.png?20221009043339" alt="flipper" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/f/fa/S3_Slammin%27_Lid_icon.png?20221009043343" alt="slamonlid" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/a/a5/S3_Fish_Stick_icon.png?20221009043313" alt="fishsticks" className='w-[150%]' /></li>
                                    <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/9/92/S3_Big_Shot_icon.png?20221009043319" alt="bigshots" className='w-[150%]' /></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-6 w-full'>
                            <div className='bg-black p-4 w-full rounded-lg mb-auto shadow-lg shadow-gray-900'>
                                <h1><strong>total amount of scales</strong></h1>
                                <ul className='flex flex-row gap-6 my-2 justify-center'>
                                    <li className='flex flex-col justify-center items-center'>
                                        <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/a/a1/S3_Icon_bronze_fish_scale.png/36px-S3_Icon_bronze_fish_scale.png" alt="bronzescale" width="40px" /></span>
                                        <span>{GameAccount.bronzescales}</span>
                                    </li>

                                    <li className='flex flex-col justify-center items-center'>
                                        <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/00/S3_Icon_silver_fish_scale.png/36px-S3_Icon_silver_fish_scale.png" alt="silverscale" width="40px" /></span>
                                        <span>{GameAccount.silverscales}</span>
                                    </li>

                                    <li className='flex flex-col justify-center items-center'>
                                        <span><img src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/2/20/S3_Icon_gold_fish_scale.png/36px-S3_Icon_gold_fish_scale.png" alt="goldscale" width="40px" /></span>
                                        <span>{GameAccount.goldscales}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className='bg-black p-4 w-full rounded-lg shadow-lg shadow-gray-900'>
                                <h1><strong>Monthly gear</strong></h1>
                                <div className='w-full p-2 flex flex-col justify-center items-center mt-4'>
                                    <img className='w-[80%]' src={monthlyGear.image.url} alt="monthlyGear" />
                                    <p className='text-green-600 font-extrabold text-[1.2rem]'>{monthlyGear.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-4 w-full h-[80%]'>
                        <div className='grid grid-cols-1 gap-3 w-full'>
                            <div className='bg-black w-full rounded-lg p-4 shadow-lg shadow-gray-900'>
                                <h1><strong>Game stats</strong></h1>

                                <div className='flex flex-row items-center w-full'>
                                    <div className='w-[50%]'>
                                        {user.profiel ? (
                                            <>
                                                <img
                                                    src={`/storage/images/${user.profiel}`}
                                                    alt="profilePicture"
                                                    className='rounded-[20px] w-[80%] mx-auto'
                                                />
                                                <p className='flex justify-center mt-1'>{GameAccount.username}</p>
                                            </>
                                        ) : (
                                            <img src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="profilePicture" className='w-[25%] rounded-3xl' />
                                        )}
                                    </div>
                                    <ul className='flex flex-col gap-4 text-[0.9rem] border-orange-800 border-[2px] m-2 p-2 rounded-md w-[70%]'>
                                        <>
                                            <li className='flex flex-row text-[90%] border-b-[1px] border-gray-700'><span className='font-bold'>Shifts worked: </span>           <span className='ml-auto'>{GameAccount.Shiftsworked}</span></li>
                                            <li className='flex flex-row text-[90%] border-b-[1px] border-gray-700'><span className='font-bold'>Golden eggs collected: </span>   <span className='ml-auto'>{GameAccount.GoldenEggsCollected}</span></li>
                                            <li className='flex flex-row text-[90%] border-b-[1px] border-gray-700'><span className='font-bold'>Power eggs collected: </span>    <span className='ml-auto'>{GameAccount.PowerEggsCollected}</span></li>
                                            <li className='flex flex-row text-[90%] border-b-[1px] border-gray-700'><span className='font-bold'>Crew members rescued: </span>    <span className='ml-auto'>{GameAccount.CrewMembersRescued}</span></li>
                                            <li className='flex flex-row text-[90%] border-b-[1px] border-gray-700'><span className='font-bold'>Total points: </span>            <span className='ml-auto'>{GameAccount.Totalpoints}</span></li>
                                        </>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {GameData ? (
                            <>
                                <div className='flex justify-center w-full items-center gap-4'>
                                    <img className='w-[12.5%]' src="https://th.bing.com/th/id/R.1bb44838a0455f3390d4955428615166?rik=h5IjWk4xXfwS0A&pid=ImgRaw&r=0" alt="Logo" />
                                    <h1 className='text-gray-950 text-[1.1rem] font-extrabold opacity-90'>Api tracker results</h1>
                                </div>
                                <RadarChartcomponent GameData={GameData}/>
                                <DonutChartcomponent GameData={GameData}/>
                            </>
                        ) : (
                            <>
                                <div className='flex justify-center w-full items-center gap-4'>
                                    <img className='w-[15%]' src="https://th.bing.com/th/id/R.1bb44838a0455f3390d4955428615166?rik=h5IjWk4xXfwS0A&pid=ImgRaw&r=0" alt="Logo" />
                                    <h3 className='text-gray-950 text-[1.1rem] font-extrabold opacity-90'>Track down your game progress</h3>
                                </div>
                                <div className='grid grid-cols-1 gap-4 w-full h-[120%]'>
                                    <div className='p-4 bg-black w-full rounded-lg shadow-lg shadow-gray-900 mb-auto'>
                                        <h1 className='mb-4'><strong>public information</strong></h1>
                                        <ul className='text-[0.8rem] flex flex-col gap-2 sm:w-[80%] mx-auto mb-6 border-[1.5px] border-orange-700 p-2 rounded-md'>
                                            <li className='flex flex-row border-b-[1px] border-gray-700 p-1 pr-7'><strong className='mr-auto text-[0.9rem]'>full name: </strong><span>{user.name}</span></li>
                                            <li className='flex flex-row border-b-[1px] border-gray-700 p-1 pr-7'><strong className='mr-auto text-[0.9rem]'>email: </strong><span>{user.email}</span></li>
                                            <li className='flex flex-row border-b-[1px] border-gray-700 p-1 pr-7'><strong className='mr-auto text-[0.9rem]'>birthday: </strong><span>{user.geboortedatum}</span></li>
                                            <li className='flex flex-row border-b-[1px] border-gray-700 p-1 pr-7'><strong className='mr-auto text-[0.9rem]'>region: </strong><span>{user.Land}</span></li>
                                        </ul>

                                        <div className='flex flex-col justify-center mt-2 w-[80%] mx-auto'>
                                            <h4 className='text-[1.25rem] text-orange-600 border-b-[1px] border-orange-800 text-center'><strong>About me</strong></h4>
                                            <p className='text-[0.9rem] my-2 bg-gray-900 rounded-md p-2'>{user.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}


                       
                    </div>
                    

                    <div className='grid grid-cols-1 w-full h-[85%] gap-6'>
                        <div className='p-4 pb-0 bg-black w-full rounded-lg shadow-lg shadow-gray-900'>
                            <h1><strong>progress towards badges</strong></h1>
                            <div><Progressbar bosses={bosses} records={records}/></div>
                        </div>
                        <div className='p-4 bg-black rounded-lg w-full shadow-lg shadow-gray-900'>
                            <h1>update stats</h1>
                             <form className='my-3 flex flex-col gap-4 mt-3' onSubmit={updateStats}>
                                    <div className='flex flex-col'>
                                        <strong className='border-b-[1px] border-orange-800 text-orange-700'>Eggsecutive rank</strong>
                                        <input 
                                            className='bg-gray-900 rounded-lg h-[2rem] w-[30%] my-1 text-gray-300 mr-auto hover:w-[35%] transition-width duration-500 ease-linea border-none focus:outline-none focus:border-none focus:ring-orange-800 dark:focus:ring-orange-800 focus:ring-offset-gray-800'
                                            value={EvpLevel}
                                            onChange={HandleEvpLevel}
                                            type="number"
                                            name='evp'
                                        />
                                    </div>
                                    <div className='flex flex-row w-full gap-6 items-end'>
                                        <div className='flex flex-col w-full'>
                                            <strong className='border-b-[1px] border-orange-800 text-orange-700'>Games lossed</strong>
                                            <input 
                                                className='bg-gray-900 rounded-lg h-[2rem] w-[35%] my-1 text-gray-300 mr-auto hover:w-[40%] transition-width duration-500 ease-linea border-none focus:outline-none focus:border-none focus:ring-orange-800 dark:focus:ring-orange-800 focus:ring-offset-gray-800'
                                                value={GamesLossed}
                                                onChange={HandleGameslossed}
                                                type="number"
                                                name='losses'
                                            />
                                        </div>
                                        <div>
                                            <button type='submit' className='text-white bg-orange-700 py-2 px-3 rounded-lg ml-auto hover:scale-[1.05] focus:bg-orange-500 focus:text-gray-300 transition duration-300 ease-in-out'>update</button>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                    {/*
                    <div className="bg-black text-white p-4 overflow-hidden shadow-md shadow-gray-900 rounded-lg flex flex-row items-center gap-2">
                        {GameAccount && (
                            <>
                                <div className='flex flex-col mb-auto'>
                                    <div className='flex flex-row items-center gap-6 bg-gray-700 rounded-md'>
                                        {user.profiel ? (
                                            <img
                                                src={`/storage/images/${user.profiel}`}
                                                alt="profilePicture"
                                                className='rounded-[20px] w-[20%]'
                                            />
                                        ) : (
                                            <img src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="profilePicture" className='w-[25%] rounded-3xl' />
                                        )}
                                        <p className='text-[1.25rem] font-bold'>{GameAccount.username} <span className='text-gray-400 font-thin'>{user.geslacht}</span></p>
                                    </div>

                                    <div className='my-5 mt-6 grid sm:grid-cols-1 gap-2 sm:place-items-center'>
                                        <ul className='text-[0.8rem] flex flex-col gap-2 sm:w-full'>
                                            <li className='flex flex-row bg-gray-700 p-2 rounded-md pr-7'><span>{user.email}</span></li>
                                            <li className='flex flex-row bg-gray-700 p-2 rounded-md pr-7'><span>{user.geboortedatum}</span></li>
                                            <li className='flex flex-row bg-gray-700 p-2 rounded-md pr-7'><span>{user.Land}</span></li>
                                        </ul>

                                        <div className='flex flex-col mb-auto mr-auto mt-2 w-[70%]'>
                                            <h4 className='text-[1.25rem] text-gray-400 border-b-[1px] border-gray-500'>About me</h4>
                                            <p className='text-[0.9rem] my-2'>{user.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {!GameAccount && (
                            <div className='mb-auto w-full flex flex-row items-center gap-4 h-full'>
                                <img src="https://cdn.accounts.nintendo.com/account/images/common/defaults/mii.png?t=1693897123" alt="No-profile" className='w-[20%] rounded-3xl' />
                                <p>No profile</p>
                            </div>
                        )}
                    </div>

                    {!GameAccount && (
                        <div className='bg-black text-white p-4 overflow-hidden shadow-md shadow-gray-900 rounded-lg flex flex-row items-center gap-2 justify-center'>
                            <p>Go to your profile and Register game account</p>
                        </div>
                    )}

                    {GameAccount && (
                    <div className="bg-black text-white p-6 overflow-hidden shadow-md shadow-gray-800 rounded-lg flex flex-col items-center gap-2">
                        <h1 className='text-[1.25rem] font-bold mr-auto bg-orange-700 p-2 rounded-md w-full'>Game Stats</h1>

                        <div className='flex flex-col gap-5 w-full my-5'>
                            <ul className='flex flex-col gap-3 text-[0.9rem]'>
                                    <>
                                        <li className='flex flex-row bg-gray-700 p-[0.4rem] rounded-md'><span className='font-bold'>Shifts worked: </span>           <span className='ml-auto'>{GameAccount.Shiftsworked}</span></li>
                                        <li className='flex flex-row bg-gray-700 p-[0.4rem] rounded-md'><span className='font-bold'>Golden eggs collected: </span>   <span className='ml-auto'>{GameAccount.GoldenEggsCollected}</span></li>
                                        <li className='flex flex-row bg-gray-700 p-[0.4rem] rounded-md'><span className='font-bold'>Power eggs collected: </span>    <span className='ml-auto'>{GameAccount.PowerEggsCollected}</span></li>
                                        <li className='flex flex-row bg-gray-700 p-[0.4rem] rounded-md'><span className='font-bold'>Crew members rescued: </span>    <span className='ml-auto'>{GameAccount.CrewMembersRescued}</span></li>
                                        <li className='flex flex-row bg-gray-700 p-[0.4rem] rounded-md'><span className='font-bold'>Total points: </span>            <span className='ml-auto'>{GameAccount.Totalpoints}</span></li>
                                    </>
                            </ul>
                        </div>
                    </div>
                    )}

                    {GameAccount && (
                    <div className="bg-black text-white p-4 overflow-hidden shadow-md shadow-gray-800 rounded-lg">
                        <h1 className='text-white text-[1.35rem] mb-4 bg-orange-700 p-2 w-full rounded-md font-bold'>Update stats</h1>

                        <form className='my-3 flex flex-col gap-2 mt-8' onSubmit={updateStats}>
                            <label className='flex flex-row items-center bg-gray-700 rounded-md px-2'>
                                <span>Eggsecutive rank</span>
                                <input 
                                    className='bg-gray-800 rounded-lg h-[2rem] w-[30%] my-1 text-gray-300 ml-auto'
                                    value={EvpLevel}
                                    onChange={HandleEvpLevel}
                                    type="number"
                                    name='evp'
                                />
                            </label>
                            <label className='flex flex-row items-center bg-gray-700 rounded-md px-2'>
                                <span>Games lossed</span>
                                <input 
                                    className='bg-gray-800 rounded-lg h-[2rem] w-[30%] my-1 text-gray-300 ml-auto'
                                    value={GamesLossed}
                                    onChange={HandleGameslossed}
                                    type="number"
                                    name='losses'
                                />
                            </label>
                            <button type='submit' className='text-white bg-orange-700 py-2 px-3 rounded-lg w-[30%] sm:w-[20%] ml-auto hover:scale-[1.05] focus:bg-orange-500 focus:text-gray-300 transition duration-300 ease-in-out'>update</button>
                        </form>
                    </div>
                )}
                </div>

                {GameData && (
                    <div className="max-w-[90%] mx-3 sm:mx-auto sm:px-6 lg:px-1 grid grid-cols-1 gap-[1.5rem] sm:grid-cols-2 py-4">
                        <div className='bg-black shadow-md shadow-gray-800 rounded-xl p-2 text-white sm:w-[150%]'>
                            <RadarChartcomponent GameData={GameData}/>
                        </div>

                        <div className='bg-black shadow-md shadow-gray-800 rounded-xl p-3 text-white ml-auto w-full sm:w-[50%]'>
                            <div className='h-[10%] w-full'><DonutChartcomponent GameData={GameData} bosses={bosses}/></div>
                        </div>
                     </div>
                )}

                {GameAccount && (
                <div className="max-w-[90%] mx-3 sm:mx-auto sm:px-6 lg:px-1 grid grid-cols-1 gap-[2rem] sm:grid-cols-2 py-4 mt-4">
                    <div className='bg-black rounded-xl p-2'>
                        <h1 className='text-white font-bold p-2 mb-4 text-[1.25rem] bg-orange-700 rounded-md'>Total count of bosses</h1>
                        <Chartcomponent bosses={bosses} />
                        <ul className='flex flex-row px-2 ml-11 gap-5 relative bottom-0'>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/9/9a/S3_Steelhead_icon.png?20221009043423" alt="steelhead" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/2/24/S3_Flyfish_icon.png?20221009043406" alt="flyfish" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/8/83/S3_Maws_icon.png?20221009043400" alt="maws" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/6/62/S3_Steel_Eel_icon.png?20221009043416" alt="eels" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/b/b5/S3_Stinger_icon.png?20221009043427" alt="stinger" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/8/8c/S3_Scrapper_icon.png?20221009043355" alt="scrapper" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/0/09/S3_Drizzler_icon.png?20221009043335" alt="drizzler" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/6/65/S3_Flipper-Flopper_icon.png?20221009043339" alt="flipper" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/f/fa/S3_Slammin%27_Lid_icon.png?20221009043343" alt="slamonlid" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/a/a5/S3_Fish_Stick_icon.png?20221009043313" alt="fishsticks" className='w-[120%]' /></li>
                            <li><img src="https://cdn.wikimg.net/en/splatoonwiki/images/9/92/S3_Big_Shot_icon.png?20221009043319" alt="bigshots" className='w-[120%]' /></li>
                        </ul>
                    </div>
                    <div className='bg-black rounded-xl p-2 mx-0 text-white'>
                            <>
                                <h1 className='p-2 mb-4 font-bold text-[1.25rem] bg-orange-700 w-full rounded-md'>Progress towards badges</h1>
                                <Progressbar bosses={bosses} records={records}/>
                            </>
                    </div>
                </div>
                )}

                {GameAccount && (
                <div className="max-w-[90%] flex flex-col justify-center mx-auto sm:grid sm:grid-cols-2 sm:place-content-center sm:mx-auto sm:px-0 lg:px-1 gap-[0.5rem] py-1" style={{ gridTemplateColumns: '1fr 3fr' }}>
                    <div className='bg-black rounded-xl p-4 text-white py-auto flex flex-col items-start justify-start' style={{ gridColumn: '1 / span 1' }}>
                        <h1 className='font-bold text-[1.5rem]'>Kings defeated</h1>
                            <>
                                <div className='flex flex-row justify-center items-center mx-auto my-auto'>
                                    <img className='w-[10rem]' src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/7a/S3_Cohozuna_icon.png/120px-S3_Cohozuna_icon.png" alt="KingsDefeated" />
                                    <strong className='text-[1.5rem]'>{GameAccount.KingSalmonidsDefeated}</strong>
                                </div>
                            </>
                    </div>

                    <div className='bg-black rounded-xl p-4 text-white' style={{ gridColumn: '2 / span 3' }}>
                        <h1 className='font-bold text-[1.5rem] p-4'>Rotations</h1>
                        <div className='w-full px-3'><Carouseldisplay /></div>
                    </div>
                </div>
                )}
            </div>
            {!GameAccount ? (
                <div className='absolute bottom-0'>
                    <Footer />
                </div>
            ) : (
            <Footer/>
            )}
              */}
            </div>
        </div>
        <div className='mt-12'>
            <Footer />
        </div>
        </AuthenticatedLayout>
    );
}