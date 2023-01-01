import { faHome, faPlusSquare, faSignInAlt, faRegistered, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import DropdownNavbar from './DropdownNavbar';

const Navbar = () => {

    const [showSidebar, setShowSidebar] = useState(false);
    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const [height, setHeight] = useState(0);
    const location = useLocation();

    let dropdownRef = useRef();

    const closeDropdown = () => {
        setHeight(0);
    }

    useEffect(() => {
        let handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                closeDropdown()
            }
        }
        document.addEventListener("mousedown", handler, height === "auto")
        return document.removeEventListener("mousedown", handler, height === 0);
    })

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


    function closeSidebar() {
        setShowSidebar(false);
    }

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
                            <div ref={dropdownRef}>
                                <img src='http://res.cloudinary.com/tuantea/image/upload/v1671462670/o8xxmzxjbnnof24atjft.jpg'
                                    alt=''
                                    className='user-pic'
                                    aria-expanded={height !== 0}
                                    onClick={() => setHeight(height === 0 ? "auto" : 0)}
                                />
                                <DropdownNavbar height={height} currentUser={currentUser} closeDropdown={closeDropdown} />
                            </div> :
                            <>
                                {[links[5], links[2], links[3]].map(link => (
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
                    {/* <div ref={dropdownRef}>
                        {currentUser && <DropdownNavbar height={height} currentUser={currentUser} closeDropdown={closeDropdown} />}
                    </div> */}
                </div>
                <div onClick={() => setShowSidebar(!showSidebar)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>

            {showSidebar && <Sidebar closeSidebar={closeSidebar} links={links} />}
        </>
    )
}

export default Navbar
