export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-orange-800 ` + className}>
            {value ? value : children}
        </label>
    );
}
