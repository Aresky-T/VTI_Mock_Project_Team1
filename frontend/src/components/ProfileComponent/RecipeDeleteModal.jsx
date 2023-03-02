import React from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRecipeEnd } from '../../redux/recipes.slide';
import { deleteRecipeByIdApi } from '../../api/recipe.api';
import { toast } from 'react-hot-toast';
import {updateTime} from '../../redux/realtime.slice';

const RecipeDeleteModal = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const recipe = useSelector(state => state.recipes.recipe.data);

    const deleteRecipe = () => {
        const data = {
            recipeId: recipe.id,
            creatorId: currentUser.id
        }
        deleteRecipeByIdApi(data)
            .then(res => {
                switch (res.data) {
                    case "success":
                        setTimeout(() => {toast.success("Deleted recipe successfully!")}, 100)
                        dispatch(updateTime())
                        dispatch(deleteRecipeEnd());
                        break;
                    case "delete failed":
                        setTimeout(() => {toast.error("Deleted recipe failed!")}, 100)
                        dispatch(deleteRecipeEnd());
                        break;
                    default:
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch(deleteRecipeEnd());
                setTimeout(() => {toast.error("Deleted recipe failed!")}, 100)
            });
    }

    return (
        <div className="confirm_popup">
            <div className="confirm_wrapper">
                <div className="confirm_wrapper_top">
                    <p>
                        This action will permanently delete your recipe and can't be restore again, are you sure you want to delete this recipe?
                    </p>
                    <MdClose id='close-popup-btn'
                        onClick={() => dispatch(deleteRecipeEnd())}
                    />
                </div>
                <div className="confirm_wrapper_bottom">
                    <button className="confirm_wrapper_btn"
                        onClick={deleteRecipe}
                    >
                        I'm sure
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeDeleteModal
