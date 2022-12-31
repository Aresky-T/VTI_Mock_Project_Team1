import { faHome, faPlusSquare, faSignInAlt, faRegistered, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import DropdownNavbar from './DropdownNavbar';
import { toggleDropdown } from '../redux/dropdown.slice';
const Navbar = () => {

    const [showSidebar, setShowSidebar] = useState(false)
    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const height = useSelector(state => state.dropdown.height);
    const location = useLocation();
    const dispatch = useDispatch();
    
    const links = [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "Create Recipe",
            path: "/create-recipe",
            icon: faPlusSquare
        },
        {
            name: "Sign in",
            path: "/auth/sign-in",
            icon: faSignInAlt
        },
        {
            name: "Sign up",
            path: "/auth/sign-up",
            icon: faRegistered
        },
        {
            name: "Profile",
            path: "/profile",
            icon: faUser
        },
        {
            name: "Setting",
            path: "/settings",
            icon: faCog
        }
    ]

    console.log('Current User Navbar: ', currentUser);

    function closeSidebar() {
        setShowSidebar(false);
    }

    console.log('height: ', height);

    return (
        <>
            <div className='navbar container'>
                <Link to='/' className='logo'>F<span>oo</span>dRecipe</Link>

                <div className='nav-links'>
                    <div className='nav-links-items'>
                        {[links[0], links[1]].map(link => (
                            <Link
                                to={link.path}
                                key={link.name}
                                className={location.pathname === link.path ? "active" : ""}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className='nav-links-main'>
                        {currentUser ?
                            <>
                                <img src='http://res.cloudinary.com/tuantea/image/upload/v1671462670/o8xxmzxjbnnof24atjft.jpg'
                                    alt=''
                                    className='user-pic'
                                    aria-expanded={height !== 0}
                                    onClick={() => {
                                        dispatch(toggleDropdown(height === 0 ? 'auto' : 0));
                                    }}
                                />
                            </> :
                            <>
                                {[links[2], links[3], links[5]].map(link => (
                                    <Link
                                        to={link.path}
                                        key={link.name}
                                        className={location.pathname === link.path ? "active" : ""}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </>
                        }
                    </div>
                    <DropdownNavbar currentUser={currentUser}/>
                </div>
                <div onClick={() => setShowSidebar(!showSidebar)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>

            {showSidebar && <Sidebar close={closeSidebar} links={links} />}
        </>
    )
}

export default Navbar
