export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center text-white font-bold justify-center p-4 w-full bg-orange-800 border border-transparent rounded-3xl text-xs hover:bg-orange-600 transition duration-300 ease-in-out` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
