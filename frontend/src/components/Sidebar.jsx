import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../redux/auth.slice';

function Sidebar({ links, close }) {
    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const location = useLocation();
    const dispatch = useDispatch();
    
    return (
        <div className='sidebar' onClick={close}>
            {
                [links[0], links[1], links[5]].map(link => (
                    <Link to={link.path} className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"} key={link.name}>
                        <FontAwesomeIcon icon={link.icon} />
                        {link.name}
                    </Link>
                ))
            }
            {
                currentUser ?
                    [links[4]].map(link => (
                        <Link to={link.path} className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"} key={link.name}>
                            <FontAwesomeIcon icon={link.icon} />
                            {link.name}
                        </Link>
                    ))
                    :
                    [links[2], links[3]].map(link => (
                        <Link to={link.path} className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"} key={link.name}>
                            <FontAwesomeIcon icon={link.icon} />
                            {link.name}
                        </Link>
                    ))
            }
            <div className="sidebar-link"
                onClick={() => dispatch(signOut())}
            >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Sign out
            </div>
        </div>
    );
}

export default Sidebar;