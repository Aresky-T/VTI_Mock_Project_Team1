import React, { useEffect } from 'react'
import { faUserAlt, faListUl, faCoins, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideBarProfile = () => {

    const location = useLocation();

    const links = [
        {
            name: "User information",
            path: "/profile/information",
            icon: faUserAlt
        },
        {
            name: "Account",
            path: "/profile/account",
            icon: faCog
        },
        {
            name: "Recipe management",
            path: "/profile/recipes",
            icon: faListUl
        },
        {
            name: "Recipe exchange history",
            path: "/profile/exchange-history",
            icon: faCoins
        }
    ]

    useEffect(() => {
        console.log(location.pathname);
    })

    return (
        <div className='profile-header'>
            <div className="profile-header-links">
                {links.map((link, index) => (
                    <Link
                        to={link.path}
                        key={index}
                        className={location.pathname === link.path ? "profile-link active" : "profile-link"}
                    >
                        <FontAwesomeIcon icon={link.icon} className="profile-icon"/>
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideBarProfile