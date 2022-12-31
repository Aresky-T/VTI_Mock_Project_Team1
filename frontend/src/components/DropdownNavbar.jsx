import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../api/auth.api';
import { HiUser } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import AnimateHeight from 'react-animate-height';
import { toggleDropdown } from '../redux/dropdown.slice';

const DropdownNavbar = ({ currentUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const height = useSelector(state => state.dropdown.height);

    const closeDropdownNavbar = () => {
        dispatch(toggleDropdown(0));
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
                        navigate('/profile')
                        closeDropdownNavbar();
                    }}
                >
                    <img src={currentUser?.avatarUrl} alt="" />
                    <h3>{currentUser?.username}</h3>
                </div>
                <hr />

                <div className='sub-menu-link'
                    onClick={() => {
                        navigate('/profile')
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