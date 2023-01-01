import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../redux/auth.slice';
import { signOutUser } from '../api/auth.api';

function Sidebar({ links, closeSidebar }) {
    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sidebarRef = useRef();

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

    return (
        <div className='sidebar' ref={sidebarRef}>
            {
                [links[0], links[1], links[5]].map(link => (
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
            {
                currentUser ?
                    [links[4]].map(link => (
                        <>
                            <Link to={link.path}
                                className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"}
                                key={link.name}
                                onClick={closeSidebar}
                            >
                                <FontAwesomeIcon icon={link.icon} />
                                {link.name}
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
                    ))
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