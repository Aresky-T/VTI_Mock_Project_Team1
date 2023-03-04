import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import { uploadImageCloudinary } from '../api/file.api';
import ModalLogin from '../components/auth/ModalLogin'
import Select from 'react-select'
import { GrClose } from "react-icons/gr";
import { createRecipe, createRecipeIngredient } from "../api/recipe.api";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const CreateRecipe = () => {

    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const navigate = useNavigate();

    const uploadRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [imageURL, setImageURL] = useState();
    const [ingredient, setIngredient] = useState();
    const [listIngreDropBox, setListIngreDropBox] = useState([]);
    const [listIngreForAdd, setListIngreForAdd] = useState([]);
    const [amount, setAmount] = useState(0);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [processingSteps, setProcessingSteps] = useState("");
    const [note, setNote] = useState("");
    const [price, setPrice] = useState(1);

    const mockup_ingredients = listIngreDropBox.map((item) => ({
        value: item.id, label: item.name
    }))

    const handleFocus = () => {
        const image = document.getElementById('input-image');
        image.click();
    }

    const upLoadFilesForCreate = (formData, token) => {
        uploadImageCloudinary(formData, token)
            .then((response) => {
                setImageURL(response.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            })
    }

    const handleChangeIngredient = (event) => {
        setIngredient({
            ingredient: event.value, name: event.label, amount: amount
        })
    }

    const deleteTagIngredient = (index) => {
        let listIngreForAdd2 = listIngreForAdd.filter((item, i) => i !== index);
        setListIngreForAdd(listIngreForAdd2);
    }

    const handleChangeAmount = (event) => {
        setAmount(Number(event.target.value));
    }

    const handleChangeImage = (event) => {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        const file = formData.get("file");
        // file.url = URL.createObjectURL(file);
        // setImageURL({ name: file.name, url: file.url })
        upLoadFilesForCreate(file, currentUser.token);
    }

    const handleChangeForm = (e) => {
        switch (e.target.name) {
            case "name":
                setName(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "processingSteps":
                setProcessingSteps(e.target.value);
                break;
            case "note":
                setNote(e.target.value);
                break;
            case "price":
                setPrice(e.target.value);
                break;
            default:
                console.log("handleChange...");
        }
    }

    const handleCreateRecipe = () => {
        createRecipe({
            name: name,
            description: description,
            imageUrl: imageURL,
            processingSteps: processingSteps,
            userId: currentUser.id,
            note: note,
            price: price,
        }, currentUser.token)
            .then((response) => {
                const listIngredientNew = listIngreForAdd.map((item) => ({
                    recipes: Number(response.data.id),
                    ingredient: Number(item.ingredient),
                    amount: Number(item.amount),
                }));
                const listShare = [...listIngredientNew];
                return listShare;
            })
            .then((res) => {
                res.map((item) => {
                    createRecipeIngredient(item, currentUser.token).then((response) => {
                        console.log(response);
                    }).catch((err) => {
                        console.log(err);
                    });
                })
            })
            .then(() => {
                swal({
                    title: "Success",
                    text: "Your recipe has been successfully created!",
                    icon: "success"
                }).then(() => {
                    navigate('/')
                })
            })
            .catch((err) => {
                console.log(err);
            });
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

    // useEffect(() => {
    //     setIngredient({ ...ingredient, amount: amount })
    // }, [setAmount, amount]);

    if (!currentUser) {
        setTimeout(() => {
            setShowModal(true);
        }, 500)
    }

    const formik = useFormik({
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

        }
    })

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
                                        value={name}
                                        onChange={handleChangeForm}
                                        placeholder='Enter recipe name' />
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label'>Description: </label>
                                <div className='form-input'>
                                    <textarea
                                        className='form-textarea'
                                        placeholder='Enter description'
                                        name="description"
                                        value={description}
                                        onChange={handleChangeForm}
                                    >
                                    </textarea>
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label'>Ingredients:</label>
                                <div className='form-input ingredient-form'>
                                    <div className="input-ingredient-name">
                                        <label className="form-label">Name:</label>
                                        <Select
                                            required
                                            placeholder="Search..."
                                            options={mockup_ingredients}
                                            onChange={(e) => {
                                                handleChangeIngredient(e);
                                            }}
                                        />
                                    </div>
                                    <div className="input-ingredient-amount">
                                        <label className="form-label">Amount:</label>
                                        <input
                                            id="amount-input"
                                            min={1}
                                            type="number"
                                            value={amount}
                                            onChange={(e) => {
                                                handleChangeAmount(e);
                                            }}
                                        />
                                    </div>
                                </div>
                                <button
                                    id="btn-add-ingredient"
                                    type="button"
                                    onClick={() => {
                                        if (ingredient.name !== "") {
                                            setListIngreForAdd([...listIngreForAdd, ingredient])
                                            setAmount(0);
                                            setIngredient({ ingredient: 0, name: "", amount: 0 })
                                        }
                                    }}
                                >
                                    Add
                                </button>
                            </li>
                            <li className="form-line list-ingredients">
                                <label>List Ingredients:</label>
                                <ul className="list-tag">
                                    {listIngreForAdd.map((ingredient, index) => (
                                        <li key={index} className="ingredient-for-add-item">
                                            <span className="index">{index + 1}</span>
                                            <span>
                                                {ingredient.name} : {ingredient.amount}
                                            </span>
                                            <GrClose
                                                className="btn-remove-tag"
                                                onClick={() => deleteTagIngredient(index)}
                                            />
                                        </li>))}
                                </ul>
                            </li>
                            <li className='form-line'>
                                <label className='form-label processing'>Steps:</label>
                                <div className='form-input'>
                                    <div className='step-container'>
                                        <textarea
                                            placeholder='Enter step 1...'
                                            name="processingSteps"
                                            value={processingSteps}
                                            onChange={handleChangeForm}
                                        ></textarea>
                                    </div>
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label'>Note: </label>
                                <div className='form-input'>
                                    <textarea
                                        placeholder='Enter Note'
                                        name="note"
                                        value={note}
                                        onChange={handleChangeForm}
                                    ></textarea>
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label'>Price: </label>
                                <div className='form-input'>
                                    <input
                                        type="number"
                                        placeholder='Ex: 100'
                                        name="price"
                                        value={price}
                                        onChange={handleChangeForm}
                                    />
                                </div>
                            </li>
                            <li className='form-line'>
                                <label className='form-label image' htmlFor='input-image'>Image: </label>
                                <div className='form-input upload-image-container'>
                                    <div className='upload-image'
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
                            <button type='button' onClick={handleCreateRecipe}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {showModal && <ModalLogin setShowModal={setShowModal} />}
        </div>
    )
}

export default CreateRecipe