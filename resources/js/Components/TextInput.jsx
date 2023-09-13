import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', ...props }, ref) {
    const input = ref ? ref : useRef();



    return (
        <input
            {...props}
            type={type}
            className={
                'border-orange-900 bg-gray-800 rounded-md shadow-sm text-gray-300' +
                className
            }
            ref={input}
        />
    );
});
