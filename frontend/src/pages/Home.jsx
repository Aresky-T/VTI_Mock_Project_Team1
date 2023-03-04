import React, { useEffect, useState } from 'react';
import { getAllRecipes } from "../api/recipe.api";
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileStart, getProfileSuccess, getProfileError, getAvatar } from '../redux/user.slice';
import { getProfile } from '../api/user.api';

import { Link } from 'react-router-dom';
function Home(props) {

    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const dispatch = useDispatch();

    const [listRecipes, setListRecipes] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const itemsPerPage = 6;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(listRecipes.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listRecipes.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, listRecipes]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listRecipes.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        getAllRecipes().then(
            res => {
                // console.log('res: ', res.data);
                setListRecipes(res.data.content);
                console.log(res.data.content);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }, [])

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

    return (
        <div className='home-page-container'>
            <div className='header'>
                <h2>🧑‍🍳 FOOD RECIPE 🍽️</h2>
                Learn more than <b>1000 delicious recipes</b> and discover delicious regional dishes with detailed recipes!
            </div>
            <div className='body'>
                {currentItems.map((recipe, index) => (
                    <div
                        key={index}
                        className='recipe-item'
                    >
                        <div className='image'>
                            <img src={recipe.imageUrl} alt='' />
                        </div>
                        <Link className='gradient' to={`/dish/${recipe.id}`}></Link>
                        <p>{recipe.name}</p>
                        <Link to={`/dish/${recipe.id}`} className='learn-more'>Chi tiết</Link>
                    </div>
                ))}
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeClassName='active'
            />
        </div>
    );
}

export default Home;