export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-orange-900 shadow-sm focus:ring-orange-800 dark:focus:ring-orange-800 dark:focus:ring-offset-gray-800 ' +
                className
            }
        />
    );
}
