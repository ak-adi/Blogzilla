import React, { Children, useEffect, useState } from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//Authentication layout: It is a mechanism how to protect pages or routes, we know in auth there is status, but we are not protecting that
//for protection we create a container, now we want to show value or not, this will be handled here
//here we conditionally render that we want to render it's children or not
//Suppose someone is calling this component and pass the value false, so we check on the basis of this what is our auth status  then update that

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    //first we ask authStatus that you are logged in or not, directly user se nhi hum phle store se phuchenge
    const authStatus = useSelector(state => state.auth.status)

    //now useEffect will tell that we have to send you login or homepage and if there is change in field toh kya mai checking karu ya nhi
    useEffect(() => {
        //if user doesn't send authentication then we assuming it is true , we also check again that
        // true            && false   !== true = true  , so both are true so navigate to login
        if (authentication && authStatus !== authentication) {
            navigate("/login")
            //      false             true  !==   true = false , so both are false 
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        //on the basis of loader we will show user
        setLoader(false)
    }, [authStatus, navigate, authentication])
    
    return loader ? <h1>Loading...</h1> : <>{children}</>
}

