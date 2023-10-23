import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const { error, setError } = useState("")
    //method name we are giving is login not handlesummit bcz usage is different
    const login = async (data) => {
        //sending data
        try {
            //data is wrapper, the object should be send to appwrite
            //the response returned is session
            const session = await authService.login(data)
            //if we get session then user is logged in and if not then user is not logged in
            if (session) {
                //if session is there then we get the userdata, the userdata we from await, bcz we get userdata from getCurrentUser not from session
                const userData = await authService.getCurrentUser()
                //if we get the userdata then dispatch
                //if we are calling login the status is true as defined in the method and then data is get
                if (userData) dispatch(authLogin(userData));
                //now logged in then navigate the user
                //by using navigate we can programatically navigate the user
                //using link we have to click element to navigate
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center h-screen -mt-8'
        >
            <div className={`bg-white mx-auto w-full max-w-lg rounded-xl p-10 border border-black/10 justify center`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo />

                    </span>

                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link to="/signup"
                        className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                {/* form jb bhi use hoga waha pr handleSubmit hi use hoga , ye ek method/event jaha pe hum apna method dete hai ki aap aise handle hoga,
                actually jb form submit hoga to handlesubmit ek event hai toh call hoga*/}
                {/* ye event isliye jarori hai kyunki jitne bhi aapke input fields hai waha pr doge, wha pr hum register ka use krte hai toh automatically jo values waha pr likhi hai unka state hume manage krni ki jarorat nhi hai wha se apne aap wo value pick karega aur handlesubmit hote waqt saari value le lega*/}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                        label=" Email "
                        type="email"
                        // kyunki hum use form use kr rhe yaha pr ek syntax hai
                        //yaha pe dotdotdot likhna jarori hai kyunki agar hum kisi  aur input pr bhi register use krte hai toh uski value overwrite ho jayegi, toh har bar spread krna hoga
                        //the key should be unique and second is object
                        {...register("email", {
                            required: true,
                            validate: {
                                // regexExp here
                                matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address", 
                            }
                        } )}
                        />
                        <Input 
                        label=" Password "
                        type="password"
                        {...register("password", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "Password must be valid"
                            }
                        })}
                        />
                        <Button
                        type="submit"
                        className="w-full"
                        >
                            Sign in
                        </Button>
                    </div> 
                </form>
            </div>
        </div>
    )
}

export default Login