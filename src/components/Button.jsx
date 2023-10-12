import React from 'react'

//common button
function Button({
    children,
    type='button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    //right now only classname property is there, but in future there must be some more properties for that we spread the property, now all other properties are in props which were given by user
    ...props
}) {

  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button