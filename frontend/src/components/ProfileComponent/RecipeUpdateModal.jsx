import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiErrorWarningFill } from 'react-icons/ri';
import { GrClose } from 'react-icons/gr';
import { updateRecipeEnd } from '../../redux/recipes.slide';
import { uploadImageCloudinaryApi } from '../../api/file.api';
import { toast } from 'react-hot-toast';
import { updateRecipeByCreatorApi } from '../../api/recipe.api';
import { offLoading, onLoading } from '../../redux/loading.slice';
import { toastStyle } from '../../configs/toastStyleConfig';
import { updateTime } from '../../redux/realtime.slice';

const RecipeUpdateModal = () => {

    const recipe = useSelector(state => state.recipes.recipe.data);
    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const dispatch = useDispatch();
    const [fileSelect, setFileSelect] = useState();
    const [fileUrl, setFileUrl] = useState();
    const [cloudImageUrl, setCloudImageUrl] = useState();
    const tokenUser = useSelector(state => state.auth.signIn.currentUser).token;
    const yup = require('yup');

    const formik = useFormik({
        initialValues: {
            creatorId: currentUser.id,
            name: recipe.name,
            description: recipe.description,
            processingSteps: recipe.processingSteps,
            note: recipe.note,
            point: recipe.point
        },
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required(),
            processingSteps: yup.string().required(),
            note: yup.string().required(),
            point: yup.number().min(0).required()
        }),
        onSubmit: values => {
            if (!fileUrl) {
                let data1 = { ...values, imageUrl: recipe.imageUrl };
                updateRecipe(recipe.id, data1, tokenUser);
            } else {
                uploadImageToCloudinary(fileSelect, tokenUser);
            }
        }
    });

    const toggleChangeImage = () => {
        const image = document.getElementById("input-change-image");
        image.click();
    }

    const handleChangeImage = (e) => {
        const formData = new FormData();
        formData.append("image_recipe", e.target.files[0]);
        const file = formData.get("image_recipe");
        setFileSelect(file);
        setFileUrl(URL.createObjectURL(file));
    }

    const uploadImageToCloudinary = async (file, token) => {
        console.log('...upload to cloud...')
        await uploadImageCloudinaryApi(file, token, dispatch)
            .then(res => {
                console.log(res.data);
                return res.data
            })
            .then((image) => {
                const data = {...formik.values, imageUrl: image};
                updateRecipe(recipe.id, data, currentUser.token);
            })
            .catch(err => {
                dispatch(offLoading());
                setTimeout(() => { toast.error("Failed to change the image of the recipe!") }, 100);
            })
    }

    const updateRecipe = (recipeId, data, token) => {
        console.log('...update...')
        updateRecipeByCreatorApi(recipeId, data, token)
            .then(res => {
                dispatch(offLoading());
                setTimeout(() => {
                    toast.success("Updated recipe successfully!");
                    dispatch(updateTime());
                }, 300);
                setTimeout(() => dispatch(updateRecipeEnd()), 200);
            }).catch(err => {
                dispatch(offLoading());
                toast.error("Failed to update this recipe!", toastStyle);
            });
    }

    return (
        <div className='confirm_popup recipe-update'>
            <div className="confirm_popup_wrapper">
                <div className="confirm_popup_header">
                    <h2>Update your recipe</h2>
                    <span className="btn-close-popup"
                        onClick={() => dispatch(updateRecipeEnd())}
                    ><GrClose /></span>
                </div>
                <div className='confirm_popup_body'>
                    <div className='image-update'>
                        <div>
                            <img src={fileUrl ? fileUrl : recipe.imageUrl} alt='' />
                        </div>
                        <button className="update-recipe-image"
                            onClick={() => toggleChangeImage()}
                        >
                            change image
                        </button>
                        <input type="file" id="input-change-image"
                            onChange={handleChangeImage}
                        />
                    </div>
                    <div id='update-recipe-form'>
                        <div className='form-input'>
                            <div className="text-div recipe_name">
                                <label htmlFor="recipe_name_input">Name</label>
                                <input type="text"
                                    id='recipe_name_input'
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.name && <RiErrorWarningFill />}</p>
                            </div>
                            <div className="text-div recipe_description">
                                <label htmlFor="recipe_description_input">Description</label>
                                <textarea
                                    name='description'
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.description && <RiErrorWarningFill />}</p>
                            </div>
                            <div className="text-div recipe_steps">
                                <label htmlFor="recipe_steps_input">Steps</label>
                                <textarea type="text"
                                    id='recipe_steps_input'
                                    name='processingSteps'
                                    value={formik.values.processingSteps}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.processingSteps && <RiErrorWarningFill />}</p>
                            </div>
                            <div className="text-div recipe_note">
                                <label htmlFor="recipe_note_input">Note</label>
                                <textarea type="text"
                                    id='recipe_note_input'
                                    name='note'
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.note && <RiErrorWarningFill />}</p>
                            </div>
                            <div className="text-div recipe_note">
                                <label htmlFor="recipe_point_input">Point</label>
                                <input type="text"
                                    id='recipe_point_input'
                                    name='point'
                                    value={formik.values.point}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.point && <RiErrorWarningFill />}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='confirm_popup_footer'>
                    <button type='button' onClick={() => formik.handleSubmit()}
                        className='confirm-update-recipe'
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )

}

export default RecipeUpdateModal;