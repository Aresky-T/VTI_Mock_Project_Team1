import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipeDetail } from '../api/recipe.api';
import { userImage, chefMan, chefWoman } from '../constant/Image';

const RecipeDetail = () => {

    let { id } = useParams();
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        getRecipeDetail(id)
            .then(res => {
                setRecipe(res.data);
            })
            .catch()
    }, [id])

    console.log(recipe);

    return (
        <>
            {recipe && <div className='recipe-detail-container'>
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
                        <h3 className='h3-title'>Ingredients - {recipe.ingredients.length} </h3>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <p 
                                className='p-content-detail'
                                key={index}
                            >
                                → {ingredient.name}: {ingredient.amount} {ingredient.unit}
                            </p>
                        ))}
                    </div>
                    <div className="processing-steps">
                        <h3 className='h3-title'>Steps</h3>
                        <p className='p-content-detail'>{recipe.processingSteps}</p>
                    </div>
                    <div className="recipe-note">
                        <h3 className='h3-title'>Note</h3>
                        <p className='p-content-detail'>{recipe.note}</p>
                    </div>
                    <div className="point">
                        <h3 className='h3-title'>Point: <span>{recipe.point}</span></h3>
                        {/* <p className='p-content-detail'>{recipe.point}</p> */}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default RecipeDetail