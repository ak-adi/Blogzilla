import React, { useId } from 'react'

//we define the input component in arrow function, for better understanding
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
            htmlFor={props.id}>
                {label}
            </label> }
        </div>
    )
})

export default Input