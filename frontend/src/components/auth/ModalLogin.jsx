import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { signInUserApi } from '../../api/auth.api'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess, clearRedux, hiddenSignInPopup, signInError } from '../../redux/auth.slice'
import swal from 'sweetalert'
import * as yup from 'yup'
import { offLoading } from '../../redux/loading.slice'

const ModalLogin = () => {

    const [showPassword, setShowPassword] = useState(false);
    const errorMessage = useSelector(state => state.auth.signIn.signInErrorMessage)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();

    if (errorMessage) {
        setTimeout(() => {
            dispatch(clearRedux())
        }, 2000)
    }

    const closeModal = () => {
        dispatch(hiddenSignInPopup());
        if (location.pathname === "/create-recipe") {
            navigate(-1);
        }
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
            signInUserApi(values, dispatch)
                .then((res) => {
                    if (!res.data.token) {
                        dispatch(offLoading());
                        const warning = "Your account is not active. Please check your email to activate account!"
                        swal({
                            title: "Warning!",
                            text: warning,
                            icon: "warning",
                            buttons: "OK",
                        });
                    } else {
                        localStorage.setItem("userLoggedIn", JSON.stringify(res.data));
                        dispatch(signInSuccess(res.data));
                        dispatch(offLoading());
                        dispatch(hiddenSignInPopup())
                    }
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(offLoading());
                    dispatch(signInError("Username or password invalid. Please try again!"))
                });
        }
    })

    return (
        <div className='modal-page'>
            <div
                className='modal-container'
            >
                <div className='modal-header'>
                    SIGN IN
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
                    {(formik.errors.username || formik.errors.password) && <> Account can't be blank! </>}
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
        </div>
    )
}

export default ModalLogin