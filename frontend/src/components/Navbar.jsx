import { faHome, faPlusSquare, faSignInAlt, faRegistered, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import DropdownNavbar from './DropdownNavbar';
import logoUser from '../imgs/user-128.png';
import { getProfile } from '../api/user.api';
import { getAvatar, getProfileError, getProfileStart, getProfileSuccess } from '../redux/user.slice';
const Navbar = () => {

    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const profile = useSelector(state => state.user.user.data);
    const avatarUrl = useSelector(state => state.user.user.avatarUrl);
    const location = useLocation();
    const dispatch = useDispatch();

    const [showSidebar, setShowSidebar] = useState(false);
    const [height, setHeight] = useState(0);

    let dropdownRef = useRef();
    const sidebarRef = useRef();

    //---------------------------Close Dropdown Profile---------------------------
    function closeDropdown() {
        setHeight(0);
    }
    //------------------------------Close Sidebar Menu----------------------------
    function closeSidebar() {
        setShowSidebar(false);
    }
    //--------------------------------UseEffect to close dropdown-----------------
    useEffect(() => {
        /**
         * If the dropdown menu is open and the user clicks outside of the dropdown, close the dropdown menu.
         */
        let handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                closeDropdown()
            }
        }
        document.addEventListener("mousedown", handler, height === "auto")
        return document.removeEventListener("mousedown", handler, height === 0);
    })

    //------------------------------UseEffect to close Sidebar--------------------
    useEffect(() => {
        /**
         * If the sidebar is open and the user clicks outside of the sidebar, close the sidebar.
         */
        let onClick = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                closeSidebar();
            }
        }
        document.addEventListener('mousedown', onClick,);
        return () => {
            document.removeEventListener('mousedown', onClick, true);
        }
    })

    //-------------------------------Get Profile For Logged in User---------------
    useEffect(() => {
        dispatch(getProfileStart());
        currentUser && getProfile(currentUser.token)
            .then((response) => {
                dispatch(getProfileSuccess(response.data));
                dispatch(getAvatar(response.data.avatarUrl))
            })
            .catch((err) => {
                dispatch(getProfileError("Error getting profile"));
                console.log(err)
            })
    }, [currentUser])

    //----------------------------------List links for routers--------------------
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
            path: "/profile/information",
            icon: faUser
        },
        {
            name: "Setting",
            path: "/settings",
            icon: faCog
        }
    ]

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
                                {profile &&
                                    <><img src={avatarUrl ? avatarUrl : logoUser}
                                        alt=''
                                        className='user-pic'
                                        aria-expanded={height !== 0}
                                        onClick={() => setHeight(height === 0 ? "auto" : 0)}
                                    />
                                        <DropdownNavbar height={height} currentUser={profile} closeDropdown={closeDropdown} />
                                    </>}
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
                </div>
                <div
                    ref={sidebarRef}
                    onClick={() => setShowSidebar(!showSidebar)}
                    className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            <div ref={sidebarRef}>
                {showSidebar && <Sidebar closeSidebar={closeSidebar} links={links} />}
            </div>
        </>
    )
}

export default Navbar
