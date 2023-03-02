import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { signInUserApi } from '../../api/auth.api'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess, clearRedux } from '../../redux/auth.slice'
import swal from 'sweetalert'
import * as yup from 'yup'
import { offLoading } from '../../redux/loading.slice'

const ModalLoginForVoting = ({ setShowModal }) => {

    const [showPassword, setShowPassword] = useState(false);
    const errorMessage = useSelector(state => state.auth.signIn.signInErrorMessage)
    const dispatch = useDispatch()

    if (errorMessage) {
        setTimeout(() => {
            dispatch(clearRedux())
        }, 2000)
    }

    const closeModal = () => {
        setShowModal(false);
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
                        setShowModal(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })

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

export default ModalLoginForVoting