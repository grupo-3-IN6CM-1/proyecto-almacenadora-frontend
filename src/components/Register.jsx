import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/register.css";
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
    successMessage: "",
    errorMessage: ""
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
      .then(res => {
        if (!res.ok) {
          throw new Error('Error en el servidor');
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setFormState(prev => ({ ...prev, successMessage: "Registration successful!" }));
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setFormState(prev => ({
            ...prev,
            errorMessage: data.msg || "An error occurred. Please try again."
          }));
        }
      })
      .catch(err => {
        setFormState(prev => ({
          ...prev,
          errorMessage: "Network error, please try again later."
        }));
        console.error(err);
      });
  };

  const isDisabled = !Object.values(formState).every(
    f => typeof f !== "string" ? f.isValid !== false : true
  );

  return (
    <div className="register-page-wrapper">
      <div className="register-card">
        <div className="register-panel-left">
          <h2>Hola, Bienvenido!</h2>
          <p className="text-center">Si ya tienes una cuenta puedes iniciar sesión aquí</p>
          <button className="btn btn-outline-light mt-3" onClick={switchAuthHandler}>Log in</button>
        </div>

        <div className="register-panel-right">
          <h3 className="text-center mb-4">Crea una cuenta</h3>
          <form onSubmit={handleRegister}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className={`form-control ${formState.name.showError ? "is-invalid" : ""}`}
                  placeholder="First Name"
                  value={formState.name.value}
                  onChange={(e) => handleInputValueChange(e.target.value, "name")}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, "name")}
                />
                {formState.name.showError && <div className="invalid-feedback">First name is required.</div>}
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className={`form-control ${formState.surname.showError ? "is-invalid" : ""}`}
                  placeholder="Last Name"
                  value={formState.surname.value}
                  onChange={(e) => handleInputValueChange(e.target.value, "surname")}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, "surname")}
                />
                {formState.surname.showError && <div className="invalid-feedback">Last name is required.</div>}
              </div>
            </div>

            <input
              type="text"
              className={`form-control mb-3 ${formState.username.showError ? "is-invalid" : ""}`}
              placeholder="Username"
              value={formState.username.value}
              onChange={(e) => handleInputValueChange(e.target.value, "username")}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, "username")}
            />
            {formState.username.showError && <div className="invalid-feedback">{validateUsernameMessage}</div>}

            <input
              type="email"
              className={`form-control mb-3 ${formState.email.showError ? "is-invalid" : ""}`}
              placeholder="Email"
              value={formState.email.value}
              onChange={(e) => handleInputValueChange(e.target.value, "email")}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, "email")}
            />
            {formState.email.showError && <div className="invalid-feedback">{emailValidationMessage}</div>}

            <input
              type="password"
              className={`form-control mb-3 ${formState.password.showError ? "is-invalid" : ""}`}
              placeholder="Password"
              value={formState.password.value}
              onChange={(e) => handleInputValueChange(e.target.value, "password")}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, "password")}
            />
            {formState.password.showError && <div className="invalid-feedback">{validatePasswordMessage}</div>}

            <input
              type="password"
              className={`form-control mb-3 ${formState.passwordConfir.showError ? "is-invalid" : ""}`}
              placeholder="Confirm Password"
              value={formState.passwordConfir.value}
              onChange={(e) => handleInputValueChange(e.target.value, "passwordConfir")}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, "passwordConfir")}
            />
            {formState.passwordConfir.showError && <div className="invalid-feedback">{passwordConfirmationMessage}</div>}

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary" disabled={isDisabled}>
                Register
              </button>
            </div>

            {formState.successMessage && (
              <div className="alert alert-success mt-3 text-center">
                {formState.successMessage}
              </div>
            )}

            {formState.errorMessage && (
              <div className="alert alert-danger mt-3 text-center">
                {formState.errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
