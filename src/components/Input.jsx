import React, { useId } from 'react'

//we define the input component in arrow function, for better understanding
//we can write forwardref like this
const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = "",
    ...props
    //apart from this whoever uses this will pass reference also
}, ref) {
    const id = useId()
    return (
        <div className="relative h-10 w-full min-w-[200px]">

            <input
                className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-gray-300 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50
                ${className}`}
                placeholder=" "
                type={type}
                //this will give reference of parent component ,reference waha se pass kiya jayega aur yaha se fir state ka access liya jayega, then we get the values from input
                ref={ref}
                {...props}

                //now id is installed in label and here also, when clicked on that label, then cursor will point on that, and highlighted so we can write
                id={id}

            />

            {/* if someone pass label then we display */}
            {label && <label
                className={`before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500`}
                // for accessibility purpose we use html for id            
                htmlFor={id}>
                {label}
            </label>}
        </div>
    )
})

export default Input


