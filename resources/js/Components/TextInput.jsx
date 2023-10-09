import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-orange-700 border-opacity-50 bg-transparent backdrop-blur-[5px] rounded-3xl px-5 shadow-sm focus:ring-orange-800 dark:focus:ring-orange-800 dark:focus:ring-offset-gray-800' +
                className
            }
            ref={input}
            
        />
    );
});
