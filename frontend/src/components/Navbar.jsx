import { faHome, faPlusSquare, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';

const Navbar = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation();
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
            name: "sign up",
            path: "/auth/sign-up",
            icon: faUserPlus
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
                    {links.map(link => (
                        <Link
                            to={link.path}
                            key={link.name}
                            className={location.pathname === link.path ? "active" : ""}
                        >
                            {link.name}
                        </Link>
                    ))}
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
