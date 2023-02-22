import React, { useEffect, useState } from 'react'
import { MdStarRate } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { createVotingApi, getStarsApi, updateStarsApi, getAllUsersVotedApi, getAverageStarsApi } from '../../api/voting.api';
import ModalLoginForVoting from '../ProfileComponent/ModalLogin';

const colors = {
    pink: "var(--primary-color)",
    grey: "rgb(201, 201, 201)"
};

const Voting = ({ recipe, toast }) => {

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [isShowModal, setShowModal] = useState(false);
    const [starsAvg, setStarsAvg] = useState(0);
    const [allUsers, setAllUsers] = useState(0);

    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const stars = Array(5).fill(0);
    const token = currentUser?.token;

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    function getAverageStars(recipe) {
        getAverageStarsApi(recipe.id)
            .then(res => {
                setStarsAvg(Number(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }

    function getAllUsers(recipe) {
        getAllUsersVotedApi(recipe.id)
            .then(res => {
                setAllUsers(Number(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleClickVoting() {
        const data = {
            userId: currentUser.id,
            recipeId: recipe.id,
            stars: currentValue
        };
        if (currentUser) {
            createVotingApi(data, token)
                .then(res => {
                    if (res.data === "Failed") {
                        // toast.error('You have rated!');
                        handleUpdateStars(data, token)
                    } else {
                        toast.success('Rating success!');
                    }
                })
                .catch((err) => {
                    toast.error('Rating error!');
                })
        } else {
            setShowModal(true);
        }
    }

    function handleUpdateStars(data, token) {
        updateStarsApi(data, token)
            .then(res => {
                toast.success('Update stars success!');
            })
            .then(() => {
                setTimeout(() => getAverageStars(recipe), 400)
            })
            .catch(err => {
                toast.error('Rating again failed!');
            })
    }

    useEffect(() => {
        currentUser && getStarsApi({
            userId: currentUser.id,
            recipeId: recipe.id,
        }, token)
            .then(res => {
                setCurrentValue(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [currentUser])

    useEffect(() => {
        recipe && getAverageStars(recipe);
    }, [recipe])

    useEffect(() => {
        recipe && getAllUsers(recipe);
    }, [recipe])

    return (
        <>
            <div className='voting'>
                <div className="voting-wrapper">
                    <div className="average-star">Average Rating: {starsAvg} <MdStarRate/> ({allUsers})</div>
                    <p className="voting-text">
                        How would you rate this Recipe?
                    </p>
                    <div className="voting-action">
                        <div className="stars">
                            {stars.map((_, index) => (
                                <MdStarRate
                                    key={index}
                                    size={60}
                                    style={{
                                        cursor: "pointer",
                                        padding: "10px"
                                    }}
                                    color={(hoverValue || currentValue) > index ? colors.pink : colors.grey}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(index + 1)}
                                />
                            ))}
                        </div>
                    </div>
                    <button className={currentValue > 0 ? "submit-voting active" : "submit-voting"}
                        onClick={() => handleClickVoting()}
                    >
                        SUBMIT RATING
                    </button>
                </div>
            </div>
            {isShowModal && <ModalLoginForVoting setShowModal={setShowModal} />}
        </>
    )
}

export default Voting