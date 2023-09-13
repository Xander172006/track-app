import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import backgroundImage from '../../images/salmon-run.jpg'; // Import your background image
import logoImage from '../../images/salmonrun_logo.jpg'; // Import your background image

export default function Guest({ children }) {
    const guestStyle = {
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: 'cover', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed
    };

    const overlayStyle = {
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity (0.5 for 50% darkness)
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div className="min-h-screen" style={guestStyle}>
            <div style={overlayStyle}>
                <div>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 backdrop-blur-[7.5px] bg-black bg-opacity-60 shadow-md overflow-hidden sm:rounded-2xl flex justify-center flex-col items-center">
                    <Link href="#">
                        <img src={logoImage} alt="Logo" className="w-[11rem] h-[6.5rem] rounded-2xl opacity-60 flex justify-center mb-10 mt-2" />
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    );
}
