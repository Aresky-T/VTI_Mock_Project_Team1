import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../api/auth.api';
import { HiUser } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import AnimateHeight from 'react-animate-height';
import logo from '../imgs/user-128.png'

const DropdownNavbar = ({ height, currentUser, closeDropdown }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeDropdownNavbar = () => {
        closeDropdown(0);
    }

    return (
        <AnimateHeight
            className='sub-menu-wrap'
            id='subMenu'
            duration={300}
            height={height}
        >
            <div className='sub-menu'>
                <div className='user-info'
                    onClick={() => {
                        navigate('/profile/information')
                        closeDropdownNavbar();
                    }}
                >
                    <img src={currentUser.avatarUrl ? currentUser.avatarUrl : logo} alt="" />
                    <h3>{currentUser.firstName + " " + currentUser.lastName}</h3>
                </div>
                <hr />

                <div className='sub-menu-link'
                    onClick={() => {
                        navigate('/profile/information')
                        closeDropdownNavbar();
                    }}
                >
                    <HiUser className='sub-menu-link-before' />
                    <p>Profile manager & edit</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>

                <div className='sub-menu-link'
                    onClick={() => {
                        navigate('/settings')
                        closeDropdownNavbar();
                    }}
                >
                    <IoMdSettings className='sub-menu-link-before' />
                    <p>Settings</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>

                <div className='sub-menu-link'
                    onClick={() => {
                        closeDropdownNavbar();
                        signOutUser(dispatch, navigate);
                    }}
                >
                    <IoLogOut className='sub-menu-link-before' />
                    <p>Sign out</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>
            </div>
        </AnimateHeight>
    )
}

export default DropdownNavbar