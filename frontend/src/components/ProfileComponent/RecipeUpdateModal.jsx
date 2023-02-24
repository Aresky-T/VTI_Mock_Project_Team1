import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {RiErrorWarningFill} from 'react-icons/ri';
import {GrClose} from 'react-icons/gr';
import { hiddenUpdateRecipePopup } from '../../redux/recipes.slide';

const RecipeUpdateModal = () => {

    const recipe = useSelector(state => state.recipes.recipe.data);
    const dispatch = useDispatch();

    console.log(recipe)

    const yup = require('yup');

    const formik = useFormik({
        initialValues: {
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

        }
    });

    console.log(recipe)

    return (
        <div className='confirm_popup recipe-update'>
            <div className="confirm_popup_wrapper">
                <div className="confirm_popup_header">
                    <h2>Update your recipe</h2>
                    <span className="btn-close-popup"
                        onClick={() => dispatch(hiddenUpdateRecipePopup())}
                    ><GrClose/></span>
                </div>
                <div className='confirm_popup_body'>
                    <div className='image-update'>
                        <div>
                            <img src={recipe.imageUrl} alt='' />
                        </div>
                        <input type="file" name="" id="" />
                    </div>
                    <form id='update-recipe-form'>
                        <div className='form-input'>
                            <div className="text-div recipe_name">
                                <label htmlFor="recipe_name_input">Name</label>
                                <input type="text"
                                    id='recipe_name_input'
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.name && <RiErrorWarningFill/>}</p>
                            </div>
                            <div className="text-div recipe_description">
                                <label htmlFor="recipe_description_input">Description</label>
                                <textarea
                                    name='description'
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.description && <RiErrorWarningFill/>}</p>
                            </div>
                            <div className="text-div recipe_steps">
                                <label htmlFor="recipe_steps_input">Steps</label>
                                <textarea type="text"
                                    id='recipe_steps_input'
                                    name='processingSteps'
                                    value={formik.values.processingSteps}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.processingSteps && <RiErrorWarningFill/>}</p>
                            </div>
                            <div className="text-div recipe_note">
                                <label htmlFor="recipe_note_input">Note</label>
                                <textarea type="text"
                                    id='recipe_note_input'
                                    name='note'
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.note && <RiErrorWarningFill/>}</p>
                            </div>
                            <div className="text-div recipe_note">
                                <label htmlFor="recipe_point_input">Point</label>
                                <input type="text"
                                    id='recipe_point_input'
                                    name='point'    
                                    value={formik.values.point}
                                    onChange={formik.handleChange}
                                />
                                <p className="error-btn">{formik.errors.point && <RiErrorWarningFill/>}</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='confirm_popup_footer'>
                    <button onClick={() => formik.handleSubmit()}
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