import { useFormik } from 'formik';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom';


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    return (
        <div className='container-signin'>
            <div className='container-signin-img'>
                <img src='https://6f3ebe2ff971707.cmccloud.com.vn/tour/wp-content/uploads/2021/12/banh-trang-cuon-thit-heo.jpg' alt="" />
            </div>
            <div className='wrap-signin'>
                <form className='signin-form'>
                    <span className='signin-form-title'>Sign Up</span>

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
                        <label for="username" className='form-label'>Username</label>
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
                        <label for="username" className='form-label'>Email</label>
                    </div>
                    <div className='wrap-input'>
                        <input
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={formik.values.password}
                            className='input'
                            onChange={formik.handleChange}
                            placeholder="Password"
                        />
                        <span className='btn-eye'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {
                                showPassword ?
                                    <AiFillEye />
                                    :
                                    <AiFillEyeInvisible />
                            }
                        </span>
                        <label for="username" className='form-label'>Password</label>
                    </div>
                    <div className='wrap-input'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='confirmPassword'
                            name='confirmPassword'
                            value={formik.values.confirmPassword}
                            className='input'
                            onChange={formik.handleChange}
                            placeholder="Password"
                        />
                        <span className='btn-eye'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {
                                showPassword ?
                                    <AiFillEye />
                                    :
                                    <AiFillEyeInvisible />
                            }
                        </span>
                        <label for="username" className='form-label'>Confirm password</label>
                    </div>
                    <div className='signin-form-btn'>
                        <button type="submit" className='signin-btn'>Create Account</button>
                    </div>
                    <div className='signin-more'>
                        <ul>
                            <li>
                                <span className='txt1'> ⭐ Already have an account? <Link className='txt2' to='/auth/sign-in'>Sign in</Link></span>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignUp;