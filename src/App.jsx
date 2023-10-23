import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Footer } from './components'
import {Header} from './components'
import {Outlet} from 'react-router-dom'

function App() {
   //when app loads, we need to check if user logged in or not
  //from state 

  //first we need to create loading 
  //when we fetch data from appwrite, so it takes some time to fetch for that we have to create loading
  // using this we can do conditional rendering true-loading icon, false - no loading icon
  //in stating we give default value true
  // when application mounts, there loading status is true, then useEffect will work , in useEffect we false the loading
  const[loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  //now when application loads, take useEffect, fir useEffect se phucho us service se ki aap loggedin ho ya nhi
  useEffect(() => {
    authService.getCurrentUser(login())
    //jb current user mil gya
    //we know in this callback we get data
    .then((userData) =>{
      if(userData){
        dispatch(login({userData}))
      } else{
        //if user not found, so calling activity logout so that state will update, that you are not logged in
        dispatch(logout())
      }
    } )
    .finally(() => setLoading(false))
  },[])
  //if loading false then fist statement execute other wise if true then null 
  // this is called condition rendering
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App
