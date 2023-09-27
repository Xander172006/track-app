import React, { useState } from 'react';
import "../../css/style.css"

export default function CarouselDisplay() {

    return (
        <div className='h-[20%] m-auto w-[90%] relative grid place-items-center overflow-hidden'>
            <div id='slide-track'>

                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_1.jpg" alt="rotation1" />
                </div>
                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_2.jpg" alt="rotation2" />
                </div>
                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_3.jpg" alt="rotation3" />
                </div>
                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_4.jpg" alt="rotation4" />
                </div>
                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_5.jpg" alt="rotation5" />
                </div>


                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_1.jpg" alt="rotation1" />
                </div>
                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_2.jpg" alt="rotation2" />
                </div>
                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_3.jpg" alt="rotation3" />
                </div>
                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_4.jpg" alt="rotation4" />
                </div>
                <div className='h-[20%] w-[20%] flex items-center p-4'>
                    <img className='w-full' src="/storage/images/rotations/rotation_5.jpg" alt="rotation5" />
                </div>

            </div>
        </div>
    )
}