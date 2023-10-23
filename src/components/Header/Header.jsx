import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()
    //when navigation bar created, then we have to make a array then loop on them
    const navItems = [
        {
            name: 'About',
            slug: "/",
            active: !authStatus
        },
        {
            name: 'Home',
            //url
            slug: "/home",
            active: authStatus
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ]

    return (
        <header className='py-3 shadow-xl bg-lime-700'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                //as these li will repeat, so we know we have write key
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className={`font-black font-mono text-lg inline-block px-6 py-2 duration-200 hover:bg-lime-200 rounded-full`}
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {/* //if authstatus is true then parantheis will display */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header