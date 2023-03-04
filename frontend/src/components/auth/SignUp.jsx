import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { signUpUser } from '../../api/auth.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';
import ConfirmSignUpSuccess from '../ConfirmSignUpSuccess';
import { MdError } from 'react-icons/md';
import {REGEX_EMAIL, REGEX_USERNAME, REGEX_PASSWORD} from './../../constant/Regex'

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.signUp.isLoading);
    const signUpErrorMessage = useSelector(state => state.auth.signUp.signUpErrorMessage);
    const signUpSuccessMessage = useSelector(state => state.auth.signUp.signUpSuccessMessage);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
        },
        validationSchema: yup.object().shape({
            username: yup.string().min(5, 'Too Short').required('Required').matches(REGEX_USERNAME, 'Username may include _ and – having a length of 5 to 30 characters'),
            email: yup.string().required('Required').matches(REGEX_EMAIL, 'Email invalid'),
            password: yup.string().required('Required').matches(REGEX_PASSWORD, 'Password must be 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!'),
            confirmPassword: yup.string().required('Required').oneOf([yup.ref("password"), null], 'Confirmed password must match password'),
            firstName: yup.string().required('Required'),
            lastName: yup.string().required('Required')
        }),
        onSubmit: values => {
            const { firstName, lastName, username, email, password } = values;
            signUpUser({ firstName, lastName, username, email, password }, dispatch, toast, setShowPopup);
        }
    })

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            {!showPopup && <div className='container-signup'>
                <div className='container-signup-img'>
                    <img src='https://6f3ebe2ff971707.cmccloud.com.vn/tour/wp-content/uploads/2021/12/banh-trang-cuon-thit-heo.jpg' alt="" />
                </div>
                <div className='wrap-signup'>
                    <form className='signup-form' onSubmit={formik.handleSubmit}>
                        <span className='signup-form-title'>Sign Up</span>

                        <div className='wrap-input'>
                            <input
                                type="text"
                                id='username'
                                name='username'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                className='input'
                                placeholder="Username"
                            />
                            <label htmlFor="username" className='form-label'>Username</label>
                            {formik.errors.username &&
                                (
                                    <div className='wrap-input-err'>
                                        <MdError className='validate-error-icon' />
                                        <span className="err-text">{formik.errors.username}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className='wrap-input'>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className='input'
                                placeholder="Enter your email"
                            />
                            <label htmlFor="email" className='form-label'>Email</label>
                            {formik.errors.email &&
                                (
                                    <div className='wrap-input-err'>
                                        <MdError className='validate-error-icon' />
                                        <span className="err-text">{formik.errors.email}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className='wrap-input'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name='password'
                                value={formik.values.password}
                                className='input'
                                onChange={formik.handleChange}
                                placeholder="Password"
                            />
                            <label htmlFor="password" className='form-label'>Password</label>
                            {formik.errors.password &&
                                (
                                    <div className='wrap-input-err'>
                                        <MdError className='validate-error-icon' />
                                        <span className="err-text">{formik.errors.password}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className='wrap-input'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='confirmPassword'
                                name='confirmPassword'
                                value={formik.values.confirmPassword}
                                className='input'
                                onChange={formik.handleChange}
                                placeholder="Confirm Password"
                            />
                            <label htmlFor="confirmPassword" className='form-label'>Confirm password</label>
                            {formik.errors.confirmPassword &&
                                (
                                    <div className='wrap-input-err'>
                                        <MdError className='validate-error-icon' />
                                        <span className="err-text">{formik.errors.confirmPassword}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className='wrap-input'>
                            <input
                                type="text"
                                id='firstName'
                                name='firstName'
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                className='input'
                                placeholder='Enter your first name'
                            />
                            <label htmlFor="firstName" className='form-label'>First Name</label>
                            {formik.errors.firstName &&
                                (
                                    <div className='wrap-input-err'>
                                        <MdError className='validate-error-icon' />
                                        <span className="err-text">{formik.errors.firstName}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className='wrap-input'>
                            <input
                                type="text"
                                id='lastName'
                                name='lastName'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                className='input'
                                placeholder='Enter your last name'
                            />
                            <label htmlFor="lastName" className='form-label'>Last Name</label>
                            {formik.errors.lastName &&
                                (
                                    <div className='wrap-input-err'>
                                        <MdError className='validate-error-icon' />
                                        <span className="err-text">{formik.errors.lastName}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className='show-password'>
                            <input type='checkbox'
                                id='show-pass'
                                checked={showPassword}
                                onChange={togglePassword}
                            />
                            <label htmlFor='show-pass'>Show password</label>
                        </div>
                        <div className='signup-form-btn'>
                            <button type="submit" className='signup-btn'>Create Account</button>
                        </div>
                        <div className='signup-more'>
                            <ul>
                                <li>
                                    <span className='txt1'> ⭐ Already have an account? <Link className='txt2' to='/auth/sign-in'>Sign in</Link></span>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>}
            <Loading isLoading={isLoading} />
            {showPopup && <ConfirmSignUpSuccess signUpSuccessMessage={signUpSuccessMessage} setShowPopup={setShowPopup} showPopup={showPopup} />}
            <ToastContainer />
        </>
    )
}
export default SignUp;