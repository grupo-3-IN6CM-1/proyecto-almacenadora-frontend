import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirPassword,
  emailValidationMessage,
  validateUsernameMessage,
  validatePasswordMessage,
  passwordConfirmationMessage
} from "../shared/validators";

export const Register = ({ switchAuthHandler }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: { value: "", isValid: false, showError: false },
    username: { value: "", isValid: false, showError: false },
    name: { value: "", isValid: false, showError: false },
    surname: { value: "", isValid: false, showError: false },
    password: { value: "", isValid: false, showError: false },
    passwordConfir: { value: "", isValid: false, showError: false },
    successMessage: ""
  });

  const handleInputValueChange = (value, field) => {
    setFormState(prev => ({
      ...prev,
      [field]: { ...prev[field], value }
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "username":
        isValid = validateUsername(value);
        break;
      case "name":
      case "surname":
        isValid = value.trim().length > 0;
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      case "passwordConfir":
        isValid = validateConfirPassword(formState.password.value, value);
        break;
      default:
        break;
    }
    setFormState(prev => ({
      ...prev,
      [field]: { ...prev[field], isValid, showError: !isValid }
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = {
      name: formState.name.value,
      surname: formState.surname.value,
      username: formState.username.value,
      email: formState.email.value,
      password: formState.password.value
    };

    fetch("http://localhost:3001/Almacenadora/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFormState(prev => ({ ...prev, successMessage: "Registration successful!" }));
          setTimeout(() => navigate("/login"), 2000);
        } else {
          console.error(data.msg);
        }
      })
      .catch(console.error);
  };

  const isDisabled = !Object.values(formState).every(
    f => typeof f !== "string" ? f.isValid !== false : true
  );

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center p-0"
         style={{ backgroundImage: 'url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjM2Ny1iaW5uLTM0LWphcGFuZXNlcGF0dGVybl8yLmpwZw.jpg)', 
                 backgroundSize: 'cover', 
                 backgroundPosition: 'center', 
                 backgroundRepeat: 'no-repeat' }}>
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow p-4 bg-dark text-light border-0">
          <h3 className="text-center mb-4">Create Account</h3>
          <form onSubmit={handleRegister}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${formState.name.showError ? "is-invalid" : ""}`}
                  value={formState.name.value}
                  onChange={(e) => handleInputValueChange(e.target.value, "name")}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, "name")}
                />
                {formState.name.showError && (
                  <div className="invalid-feedback">First name is required.</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${formState.surname.showError ? "is-invalid" : ""}`}
                  value={formState.surname.value}
                  onChange={(e) => handleInputValueChange(e.target.value, "surname")}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, "surname")}
                />
                {formState.surname.showError && (
                  <div className="invalid-feedback">Last name is required.</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${formState.email.showError ? "is-invalid" : ""}`}
                value={formState.email.value}
                onChange={(e) => handleInputValueChange(e.target.value, "email")}
                onBlur={(e) => handleInputValidationOnBlur(e.target.value, "email")}
                placeholder="name@example.com"
              />
              {formState.email.showError && (
                <div className="invalid-feedback">{emailValidationMessage}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className={`form-control ${formState.username.showError ? "is-invalid" : ""}`}
                value={formState.username.value}
                onChange={(e) => handleInputValueChange(e.target.value, "username")}
                onBlur={(e) => handleInputValidationOnBlur(e.target.value, "username")}
              />
              {formState.username.showError && (
                <div className="invalid-feedback">{validateUsernameMessage}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${formState.password.showError ? "is-invalid" : ""}`}
                value={formState.password.value}
                onChange={(e) => handleInputValueChange(e.target.value, "password")}
                onBlur={(e) => handleInputValidationOnBlur(e.target.value, "password")}
              />
              {formState.password.showError && (
                <div className="invalid-feedback">{validatePasswordMessage}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${formState.passwordConfir.showError ? "is-invalid" : ""}`}
                value={formState.passwordConfir.value}
                onChange={(e) => handleInputValueChange(e.target.value, "passwordConfir")}
                onBlur={(e) => handleInputValidationOnBlur(e.target.value, "passwordConfir")}
              />
              {formState.passwordConfir.showError && (
                <div className="invalid-feedback">{passwordConfirmationMessage}</div>
              )}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success" disabled={isDisabled}>
                Register
              </button>
            </div>

            {formState.successMessage && (
              <div className="alert alert-success mt-3 text-center">
                {formState.successMessage}
              </div>
            )}

            <div className="text-center mt-3">
              <span className="text-muted">Already have an account?</span>{" "}
              <button
                type="button"
                className="btn btn-link p-0 small"
                onClick={switchAuthHandler}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
