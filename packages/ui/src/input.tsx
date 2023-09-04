"use client"

import { useRef } from "react";

export function Input({labelText,id,onChange,value,type,required,className}:{
    labelText:string,
    id?:string
    onChange?:React.ChangeEventHandler<HTMLInputElement>
    value?:any;
    type?:React.HTMLInputTypeAttribute ;
    required?:boolean;
    className?:string;}):JSX.Element { 

    const inputRef:React.LegacyRef<HTMLInputElement> = useRef(null);
    const labelStyles = "block mb-2 text-base font-medium text-gray-900 dark:text-white"
    const inputStyles = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    const handleClick = () => {
        if (inputRef && inputRef.current) inputRef.current.focus();
    };

    return (<>
    <div onClick={handleClick} className={className}>
                <label htmlFor={id} className={labelStyles}>{labelText}</label>
                <input
                id={id}
                className={inputStyles}
                type={type} 
                required={required}
                onChange={onChange}
                ref={inputRef}
                value={value}
                />
        </div>
    </> )
}

// export interface InputConfig {
//     id?:string
//     onChange?:React.ChangeEventHandler<HTMLInputElement>
//     value?:any;
//     type?:React.HTMLInputTypeAttribute ;
//     required?:boolean;
//     className?:string;
// }