import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { signInUser } from '../../api/auth.api'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { signInEnd, signInSuccess, clearRedux } from '../../redux/auth.slice'
import Loading from '../Loading'
import swal from 'sweetalert'
import * as yup from 'yup'

const ModalLogin = ({ setShowModal }) => {

    const [showPassword, setShowPassword] = useState(false);
    const isLoading = useSelector(state => state.auth.signIn.isLoading);
    const errorMessage = useSelector(state => state.auth.signIn.signInErrorMessage)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    if(errorMessage){
        setTimeout(() => {
            dispatch(clearRedux())
        }, 2000)
    }

    const closeModal = () => {
        setShowModal(false);
        navigate(-1);
    }

    const onClickToSignIn = () => {
        formik.handleSubmit();
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            username: yup.string().required("required"),
            password: yup.string().required("required")
        }),
        onSubmit: (values) => {
            console.log(values);
            signInUser(values, dispatch)
                .then((account) => {
                    console.log(account);
                    if (!account.token) {
                        dispatch(signInEnd());
                        const warning = "Your account is not active. Please check your email to activate account!"
                        swal({
                            title: "Warning!",
                            text: warning,
                            icon: "warning",
                            buttons: "OK",
                        });
                    } else {
                        localStorage.setItem("userLoggedIn", JSON.stringify(account));
                        dispatch(signInSuccess(account));
                        setShowModal(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })

    console.log(formik.errors);

    return (
        <div className='modal-page'>
            <div
                className='modal-container'
            >
                <div className='modal-header'>
                    You must login if you want to create a recipe
                </div>
                <div className='modal-body'>
                    <div>
                        <label>Username: </label>
                        <input
                            name='username'
                            type='text'
                            value={formik.values.username}
                            placeholder='Enter your username'
                            onChange={(e) => {
                                formik.handleChange(e);
                                dispatch(clearRedux());
                            }}
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            name='password'
                            type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            onChange={(e) => {
                                formik.handleChange(e);
                                dispatch(clearRedux());
                            }}
                            placeholder='Enter your password'
                        />
                        <span className='eye-icon'>
                            {showPassword ?
                                <AiFillEye onClick={() => setShowPassword(!showPassword)} />
                                :
                                <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} />
                            }
                        </span>
                    </div>
                </div>
                <span id='err-message'>
                    {errorMessage}
                    {(formik.errors.username || formik.errors.password)  && <> Account can't be blank! </>}
                </span>
                <div className='modal-footer'>
                    <button onClick={closeModal} type="button" className="btn-close">
                        Cancel
                    </button>
                    <button onClick={onClickToSignIn} type="button" className="btn-submit" >
                        Sign In
                    </button>
                </div>
            </div>
            <Loading isLoading={isLoading} />
        </div>
    )
}

export default ModalLogin