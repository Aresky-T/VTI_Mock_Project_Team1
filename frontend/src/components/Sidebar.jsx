import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { signOutUser } from '../api/auth.api';

function Sidebar({ links, closeSidebar }) {
    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const sidebarRef = useRef();

    // useEffect(() => {

    //     /**
    //      * If the sidebar is open and the user clicks outside of the sidebar, close the sidebar.
    //      */
    //     let onClick = (e) => {
    //         if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
    //             closeSidebar();
    //         }
    //     }
    //     document.addEventListener('mousedown', onClick,);
    //     return () => {
    //         document.removeEventListener('mousedown', onClick, true);
    //     }
    // })

    return (
        <div className='sidebar'>
            {
                [links[0], links[1], links[5]].map((link, index) => (
                    <Link to={link.path}
                        className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"}
                        key={index}
                        onClick={closeSidebar}
                    >
                        <FontAwesomeIcon icon={link.icon} />
                        {link.name}
                    </Link>
                ))
            }
            {
                currentUser ?
                    <>
                        <Link to={links[4].path}
                            className={location.pathname === links[4].path ? "sidebar-link active" : "sidebar-link"}
                            onClick={closeSidebar}
                        >
                            <FontAwesomeIcon icon={links[4].icon} />
                            {links[4].name}
                        </Link>
                        <div className="sidebar-link"
                            onClick={() => {
                                signOutUser(dispatch, navigate)
                                closeSidebar()
                            }}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            Sign out
                        </div>
                    </>
                    :
                    [links[2], links[3]].map(link => (
                        <Link to={link.path}
                            className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"}
                            key={link.name}
                            onClick={closeSidebar}
                        >
                            <FontAwesomeIcon icon={link.icon} />
                            {link.name}
                        </Link>
                    ))
            }
        </div>
    );
}

export default Sidebar;