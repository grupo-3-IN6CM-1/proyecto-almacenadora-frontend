import { useState } from "react";
import { useLogin } from '../shared/hooks'
import {
    emailValidationMessage,
    validateEmail,
    validatePasswordMessage,
    validatePassword
} from '../shared/validators';

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        }
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }));
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        login(formState.email.value, formState.password.value);
    }

    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid;

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
             style={{ backgroundImage: 'url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM2Ny1iaW5uLTM0LWphcGFuZXNlcGF0dGVybl8yLmpwZw.jpg)', backgroundSize: 'cover' }}>
            <div className="card shadow-lg p-4 rounded-3 bg-dark text-light" style={{ width: '100%', maxWidth: '500px', padding: '30px' }}>
                <div className="text-center mb-4">
                    <h4>Login to Your Account</h4>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${formState.email.showError ? 'is-invalid' : ''}`}
                            id="email"
                            value={formState.email.value}
                            onChange={(e) => handleInputValueChange(e.target.value, 'email')}
                            onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'email')}
                            placeholder="Enter your email"
                        />
                        {formState.email.showError && (
                            <div className="invalid-feedback">{emailValidationMessage}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${formState.password.showError ? 'is-invalid' : ''}`}
                            id="password"
                            value={formState.password.value}
                            onChange={(e) => handleInputValueChange(e.target.value, 'password')}
                            onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'password')}
                            placeholder="Enter your password"
                        />
                        {formState.password.showError && (
                            <div className="invalid-feedback">{validatePasswordMessage}</div>
                        )}
                    </div>

                    <div className="d-grid gap-2 mb-4">
                        <button className="btn btn-primary" type="submit" disabled={isSubmitButtonDisable}>
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>

                    <div className="text-center">
                        <a href="#!" className="text-muted">Forgot password?</a>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button onClick={switchAuthHandler} className="btn btn-outline-primary">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
