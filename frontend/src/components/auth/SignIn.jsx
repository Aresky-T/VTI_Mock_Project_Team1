import { useFormik } from 'formik';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { signIn } from '../../api/auth.api';
import { useDispatch } from 'react-redux';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: yup.object().shape({
            username: yup.string().required('Required'),
            password: yup.string().required('Required')
        }),
        onSubmit: values => {
            console.log(values);
            signIn(values, dispatch);
        }
    })

    console.log(formik.errors);

    return (
        <div className='container-signin'>
            <div className='container-signin-img'>
                <img src='https://6f3ebe2ff971707.cmccloud.com.vn/tour/wp-content/uploads/2021/12/banh-trang-cuon-thit-heo.jpg' alt="" />
            </div>
            <div className='wrap-signin'>
                <form className='signin-form' onSubmit={formik.handleSubmit}>
                    <span className='signin-form-title'>Sign In</span>
                    <span className='signin-form-avatar'>
                        <img src={require('../../imgs/user-128.png')} alt='' />
                    </span>
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
                    </div>
                    <div className='wrap-input'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
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
                                <AiFillEye/>
                                :
                                <AiFillEyeInvisible/>
                        }
                        </span>
                        <label htmlFor="username" className='form-label'>Password</label>
                    </div>
                    <div className='signin-form-btn'>
                        <button type="submit" className='signin-btn'>Sign In</button>
                    </div>
                    <ul className='signin-more'>
                        <li>
                            <span className='txt1'> ⭐ Forgot </span>
                            <Link className='txt2'> Username / Password </Link>
                        </li>
                        <li>
                            <span className='txt1'> ⭐ Don't have an account? </span>
                            <Link className='txt2' to='/auth/sign-up'> Sign up</Link>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default SignIn;