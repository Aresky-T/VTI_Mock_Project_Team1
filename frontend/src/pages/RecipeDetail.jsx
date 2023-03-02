import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { userImage, chefMan, chefWoman } from '../constant/Image';
import Voting from '../components/RecipeDetailComponent/Voting';
import Reviews from '../components/RecipeDetailComponent/Reviews';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetailAfterLoginApi, getRecipeDetailBeforeLoginApi } from '../api/recipe.api';
import { showSignInPopup } from '../redux/auth.slice';
import swal from 'sweetalert';

const RecipeDetail = () => {

    let { id } = useParams();
    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const time = useSelector(state => state.time.value);
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [recipe, setRecipe] = useState();

    /**
     * When the button is clicked, scroll to the element with the ref of 'ref' using the smooth
     * behavior.
     */
    const handleClickToScroll = () => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }

    /**
     * If the user is logged in, then get the recipe details from the API, otherwise show the sign in
     * popup.
     */
    const toggleShowMoreDetails = () => {
        if (currentUser) {
            getRecipeDetailAfterLoginApi(recipe.id, currentUser.token)
                .then(res => {
                    const data = res.data;
                    typeof (data) !== "string" && setRecipe(res.data);
                    typeof (data) === "string" && swal({
                        // title: "Failed!",
                        text: "If you want to viewing recipe details, you must use your points to exchange this recipe!",
                        icon: "warning",
                        buttons: "OK",
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            dispatch(showSignInPopup());
        }
    }

    useEffect(() => {
        getRecipeDetailBeforeLoginApi(id)
            .then(res => {
                setRecipe(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [id, time])

    return (
        <div className='recipe-detail-container' ref={ref}>
            {recipe && <>
                <div className="information">
                    <div className="recipe-info">
                        <p className="recipe-name">
                            {recipe.name}
                        </p>
                    </div>
                    <div className="author">
                        <div className="author-avatar">
                            {recipe.creator.gender === "MALE" && <><img src={recipe.creator.avatarUrl ? recipe.creator.avatarUrl : chefMan} alt="" /></>}
                            {recipe.creator.gender === "FEMALE" && <><img src={recipe.creator.avatarUrl ? recipe.creator.avatarUrl : chefWoman} alt="" /></>}
                            {!recipe.creator.gender && <><img src={userImage} alt="" /></>}
                        </div>
                        <p className="recipe-create-date">
                            Date: {new Date(recipe.createDate).toLocaleDateString()}
                        </p>
                        <p className="author-name">Author: {recipe.creator.fullName}</p>
                    </div>
                    <div className='horizontal-line'>༺・~・~・~・~・~ ღℛℯ☪¡℘ℯ ꜰℴℴðღ ~・~・~・~・~・༻</div>
                    <div className="recipe-image">
                        <img src={recipe.imageUrl} alt="" />
                    </div>
                    <div className='horizontal-line'>༺・~・~・~・~・~ ღℛℯ☪¡℘ℯ ꜰℴℴðღ ~・~・~・~・~・༻</div>
                </div>
                <div className="recipe-detail">
                    <div className="description">
                        <h3 className='h3-title'>Description</h3>
                        <p className='p-content-detail'>{recipe.description}</p>
                    </div>
                    <div className="description">
                        {recipe.ingredients && <>
                            <h3 className='h3-title'>Ingredients - {recipe.ingredients.length} </h3>
                            {recipe.ingredients.map((ingredient, index) => (
                                <p
                                    className='p-content-detail'
                                    key={index}
                                >
                                    → {ingredient.amount} {ingredient.unit} {ingredient.name}
                                </p>
                            ))}
                        </>
                        }
                    </div>
                    <div className="processing-steps">
                        {recipe.processingSteps && <>
                            <h3 className='h3-title'>Steps</h3>
                            <p className='p-content-detail'>{recipe.processingSteps}</p>
                        </>}
                    </div>
                    <div className="recipe-note">
                        {recipe.note && <>
                            <h3 className='h3-title'>Note</h3>
                            <p className='p-content-detail'>{recipe.note}</p>
                        </>}
                    </div>
                    <div className="point">
                        <h3 className='h3-title'>Point: <span>{recipe.point}</span></h3>
                        {/* <p className='p-content-detail'>{recipe.point}</p> */}
                    </div>
                </div>
                {(!recipe.note && !recipe.processingSteps && !recipe.ingredients) &&
                    <div className="view-more">
                        <button className="view-more-btn"
                            onClick={toggleShowMoreDetails}
                        >
                            VIEW MORE
                        </button>
                    </div>}
                <Voting recipe={recipe} toast={toast} />
                <Reviews recipe={recipe} toast={toast} toggleScroll={handleClickToScroll} />
                <Toaster />
            </>}
        </div>
    )
}

export default RecipeDetail