import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import '../css/loginpage.css';
import { userLogin } from '../api/authenticationService';
import { Alert, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';



const LoginPage = ({ loading, error, ...props }) => {

    const [values, setValues] = useState({
        userName: '',
        password: ''
    });




    const handleSubmit = (e) => {
        e.preventDefault();
        props.authenticate();

        userLogin(values).then((response) => {
            console.log("response", response);
            if (response.status === 200) {
                props.setUser(response.data);
                props.history.push('/dashboard');
            }
            else {
                props.loginFailure('Something Wrong!Please Try Again');
            }
            
        }).catch((err) => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                            props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                        case 403:
                            this.props.loginFailure("Authorization Failed.Bad Credentials");
                            break;
                    default:
                        props.loginFailure('Something Wrong!Please Try Again');
                }

            }
            else {
                props.loginFailure('Something Wrong!Please Try Again');
            }
        });
        console.log("Loading again", loading);


    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    console.log("Loading ", loading);

    return (
        <div className="login-page">
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center h-100">
                        <div className="card-wrapper">
                            <div className="card fat">
                                <div className="card-body">
                                    <h4 className="card-title  text-center">Login</h4>
                                    <form className="my-login-validation" onSubmit={handleSubmit} noValidate={false}>
                                        <div className="form-group">
                                            <label htmlFor="email">User Name</label>
                                            <input id="username" type="text" className="form-control" minLength={4} value={values.userName} onChange={handleChange} name="userName" required />

                                            <div className="invalid-feedback">
                                                UserId is invalid
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Password
                                                <a href="/#" className="float-right">
                                                    Forgot Password?
                                                </a>
                                            </label>
                                            <input id="password" type="password" className="form-control" minLength={5} value={values.password} onChange={handleChange} name="password" required />
                                            <div className="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                            </div>
                                        </div>
                                        <div className="form-group m-0">
                                            <button type="submit" className="btn btn-primary mt-2">
                                                Login
                                                {loading && (
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                )}

                                            </button>

                                            <Link to="/register" style={{ marginLeft: "10px" }} className="btn btn-primary mt-2">
                                                Register
                                            </Link>

                                        </div>
                                    </form>
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                    />

                                    {error &&
                                        <Alert style={{ marginTop: '20px' }} variant="danger">
                                            {error}
                                        </Alert>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error
    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);