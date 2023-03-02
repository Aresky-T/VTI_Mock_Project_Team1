import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { uploadImageCloudinaryApi } from '../api/file.api';
import ModalLogin from '../components/auth/ModalLogin'
import { createRecipeApi } from "../api/recipe.api";
import swal from 'sweetalert';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { addListIngredients } from '../api/recipeIngredient.api';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { RiErrorWarningFill } from 'react-icons/ri';
import { offLoading } from '../redux/loading.slice';

const CreateRecipe2 = () => {

    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const uploadRef = useRef();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const dispatch = useDispatch();

    const handleFocus = () => {
        const image = document.getElementById('input-image');
        image.click();
    }

    const upLoadFilesForCreate = (formData, token) => {
        uploadImageCloudinaryApi(formData, token, dispatch)
            .then((response) => {
                setImageURL(response.data);
            })
            .then(() => {
                dispatch(offLoading());
            })
            .catch((err) => {
                dispatch(offLoading());
                toast.error("Failed upload image!")
            })
    }

    const handleChangeImage = (event) => {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        const file = formData.get("file");
        // file.url = URL.createObjectURL(file);
        // setImageURL({ name: file.name, url: file.url })
        upLoadFilesForCreate(file, currentUser.token);
    }

    const formikRecipe = useFormik({
        initialValues: {
            name: '',
            description: '',
            processingSteps: '',
            note: '',
            point: ''

        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Required'),
            description: yup.string().required('Required'),
            processingSteps: yup.string().required('Required'),
            note: yup.string().required('Required'),
            point: yup.number().min(0, 'point must be greater than or equal 0').required('required')
        }),
        onSubmit: values => {
            const recipe = { ...values };
            if (ingredients.length > 0 && imageURL !== '') {
                createRecipeApi({
                    name: String(recipe.name),
                    description: String(recipe.description),
                    imageUrl: String(imageURL),
                    processingSteps: String(recipe.processingSteps),
                    note: recipe.note,
                    point: Number(recipe.point),
                    creator: Number(currentUser.id)
                }, currentUser.token)
                    .then(response => {
                        return response.data;
                    })
                    .then((data) => {
                        const type = typeof (data);
                        if (type === 'string') {
                            toast.error(data);
                        }
                        if (type === 'number') {
                            // toast.success("Create Recipe successfully");
                            const recipeId = data;
                            const list = [];
                            ingredients.forEach(ingredient => {
                                ingredient.recipeId = recipeId;
                                list.push(ingredient);
                            });
                            setIngredients(list);
                        }
                    })
                    .then(() => {
                        addListIngredients(ingredients, currentUser.token)
                            .then((res) => {
                                // console.log(res.data)
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                            ;
                    })
                    .then(() => {
                        swal({
                            icon: "success",
                            title: "Success",
                            text: "Your recipe has been successfully created!",
                        }).then(() => {
                            navigate('/')
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error("Create Recipe failed!");
                    })
            } else {
                ingredients.length === 0 && toast.error("You haven't added ingredients to the recipe yet!");
                imageURL === '' && toast.error("Please upload image before submit!")
            }
        }
    })

    const formikIngredient = useFormik({
        initialValues: {
            name: '',
            amount: '',
            unit: ''
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Required'),
            amount: yup.number().required('Required'),
            unit: yup.string().required('Required')
        }),
        onSubmit: values => {
            const ingredient = { ...values };
            const list = [...ingredients, ingredient];
            setIngredients(list);
            values.name = '';
            values.amount = '';
            values.unit = '';
        }
    })

    // console.log('image url: ', imageURL)
    // console.log('recipe: ', formikRecipe.values);
    // console.log('error: ', formikRecipe.errors);
    // console.log('Ingredients: ', ingredients);


    const removeIngredient = (ingredientName) => {
        const list = ingredients.filter(item => item.name !== ingredientName);
        setIngredients(list);
    }

    useEffect(() => {
        const handler = (e) => {
            if (uploadRef.current && uploadRef.current.contains(e.target)) {
                document.addEventListener('focus', handleFocus())
            }
        }

        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    })

    if (!currentUser) {
        setTimeout(() => {
            setShowModal(true);
        }, 500)
    }

    return (
        <div className='create-recipe section'>
            <div className='create-container'>
                <div className='create-container-title'>
                    <h2>🧑🏻‍🍳 Share your recipe 🍔</h2>
                </div>
                <div className='create-container-form'>
                    <form encType='multipart/form-data'>
                        <ul>
                            <li className='form-line'>
                                <label className='form-label'>Recipe Name: </label>
                                <div className='form-input'>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formikRecipe.values.name}
                                        onChange={formikRecipe.handleChange}
                                        placeholder='Enter recipe name' />
                                        {formikRecipe.errors.name && <p className='warning'><RiErrorWarningFill/></p>}
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label'>Description: </label>
                                <div className='form-input'>
                                    <textarea
                                        className='form-textarea'
                                        placeholder='Enter description'
                                        name="description"
                                        value={formikRecipe.values.description}
                                        onChange={formikRecipe.handleChange}
                                    >
                                    </textarea>
                                    {formikRecipe.errors.description && <p className='warning textarea'><RiErrorWarningFill/></p>}
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label'>Ingredients:</label>
                                <div className='form-input'>
                                    <table className='ingredient-table'>
                                        <thead>
                                            <tr id='ingredient-table-header'>
                                                <th>Name</th>
                                                <th>Amount</th>
                                                <th>Calculation Unit</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ingredients?.map((ingredient, index) => (
                                                <tr key={index}>
                                                    <td>{ingredient.name}</td>
                                                    <td>{ingredient.amount}</td>
                                                    <td>{ingredient.unit}</td>
                                                    <td>
                                                        <MdDelete id='btn-ingredient-remove'
                                                            onClick={() => removeIngredient(ingredient.name)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td>
                                                    Total: {ingredients.length}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="text" name="name"
                                                        value={formikIngredient.values.name}
                                                        onChange={formikIngredient.handleChange}
                                                        placeholder='Ex: sugar...'
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text" name="amount"
                                                        value={formikIngredient.values.amount}
                                                        onChange={formikIngredient.handleChange}
                                                        placeholder='Ex: 200'
                                                    />
                                                </td>
                                                <td>
                                                    <input type="text" name="unit"
                                                        value={formikIngredient.values.unit}
                                                        onChange={formikIngredient.handleChange}
                                                        placeholder='Ex: gram'
                                                    />
                                                </td>
                                                <td>
                                                    <button type='submit' onClick={formikIngredient.handleSubmit}
                                                    >
                                                        add
                                                    </button>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label processing'>Steps:</label>
                                <div className='form-input'>
                                    <div className='step-container'>
                                        <textarea
                                            placeholder='Enter step 1...'
                                            name="processingSteps"
                                            value={formikRecipe.values.processingSteps}
                                            onChange={formikRecipe.handleChange}
                                        ></textarea>
                                        {formikRecipe.errors.processingSteps && <p className='warning textarea'><RiErrorWarningFill/></p>}
                                    </div>
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label'>Note: </label>
                                <div className='form-input'>
                                    <textarea
                                        placeholder='Enter Note'
                                        name="note"
                                        value={formikRecipe.values.note}
                                        onChange={formikRecipe.handleChange}
                                    ></textarea>
                                    {formikRecipe.errors.note && <p className='warning textarea'><RiErrorWarningFill/></p>}
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label'>Point: </label>
                                <div className='form-input'>
                                    <input
                                        type="text"
                                        placeholder='Ex: 100'
                                        name="point"
                                        value={formikRecipe.values.point}
                                        onChange={formikRecipe.handleChange}
                                    />
                                    {formikRecipe.errors.point && <p className='warning'><RiErrorWarningFill/></p>}
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label image' htmlFor='input-image'>Image: </label>
                                <div className='form-input upload-image-container'>
                                    <div
                                        className='upload-image'
                                        title='Upload your image'
                                        ref={uploadRef}
                                    >
                                        Browse Files
                                        <div>Drag and drop files here</div>
                                    </div>
                                    <div className='input-image-container'>
                                        <input type="file"
                                            id='input-image'
                                            name='file'
                                            // multiple="multiple"
                                            onChange={handleChangeImage}
                                        />
                                    </div>
                                    <ul className='upload-list'>
                                        {imageURL && (<li className='image-container'>
                                            <div className='image-container-item'>
                                                <img src={imageURL} alt='' />
                                            </div>
                                            <span>Recipe Image</span>
                                            <span
                                                className='delete-icon'
                                                onClick={() => setImageURL(null)}
                                            >
                                                <AiOutlineDelete />
                                            </span>
                                        </li>
                                        )}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <div className='submit-button'>
                            <button type='button' onClick={formikRecipe.handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {showModal && <ModalLogin setShowModal={setShowModal} />}
            <Toaster
                position='top-right'
                reverseOrder={true}
            />
        </div>
    )
}

export default CreateRecipe2
