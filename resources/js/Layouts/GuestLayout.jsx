import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import backgroundImage from '../../images/salmon-run.jpg';
import logoImage from '../../images/salmonrun_logo.jpg';

export default function Guest({ children }) {
    const guestStyle = {
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const overlayStyle = {
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.5 in this example) to control darkness
    };

    return (
        <div className="min-h-screen" style={guestStyle}>
            <div style={overlayStyle}>
                <img src="https://media.gamepedia.jp/wp-content/uploads/sites/123/2022/09/07204408/title-480x194.png" alt="Logo" className="w-[50%] sm:w-[20%] h-[6.5rem] rounded-2xl opacity-80 flex justify-center mb-5 sm:mt-0 mt-8" />
                <div className="w-full sm:max-w-md max-w-[90%] mb-14 px-10 py-4 backdrop-blur-[5px] bg-black bg-opacity-60 border-[2px] border-orange-700 border-opacity-40 shadow-lg shadow-gray-900 overflow-hidden sm:rounded-lg flex justify-center flex-col items-center">
                    <Link href="#">
                        
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    );
}
