import { useFormik } from 'formik';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { signInUser } from '../../api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdError } from 'react-icons/md';
import Loading from '../Loading';
import { signInSuccess, signInEnd, clearRedux } from '../../redux/auth.slice'
import swal from 'sweetalert';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.auth.signIn.signInErrorMessage)
    const isLoading = useSelector(state => state.auth.signIn.isLoading);

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
            signInUser(values, dispatch)
                .then(account => {
                    if (!account.token) {
                        const warning = "Your account is not active. Please check your email to activate account!"
                        dispatch(signInEnd());
                        swal({
                            title: "Warning!",
                            text: warning,
                            icon: "warning",
                            buttons: "OK",
                            // timer: 3000,
                        });
                    } else {
                        localStorage.setItem("userLoggedIn", JSON.stringify(account));
                        dispatch(signInSuccess(account));
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })

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
                            onChange={(e) => {
                                formik.handleChange(e);
                                dispatch(clearRedux());
                            }}
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
                            onChange={(e) => {
                                formik.handleChange(e);
                                dispatch(clearRedux());
                            }}
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
                        <label htmlFor="password" className='form-label'>Password</label>
                    </div>
                    <div className='error-message'>
                        {errorMessage && <span><MdError /> {errorMessage}</span>}
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
            <Loading isLoading={isLoading} />
            {/* <ToastContainer /> */}
        </div>
    )
}

export default SignIn;