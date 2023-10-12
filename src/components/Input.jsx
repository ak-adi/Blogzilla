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
        <div className='w-full'>
            {/* if someone pass label then we display */}
            {label && <label
                className='inline-block mb-1 pl-1'
                // for accessibility purpose we use htmlfor id
                htmlFor={id}>
                {label}
            </label>}
            <input type={type}
            className={` px-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-ful ${className}`}
            //this will give reference of parent component ,reference waha se pass kiya jayega aur yaha se fir state ka access liya jayega, then we get the values from input
            ref={ref}           
            {...props}
            //now id is installed in label and here also, when clicked on that label, then cursor will point on that, and highlighted so we can write
            id={id}
             />
        </div>
    )
})

export default Input