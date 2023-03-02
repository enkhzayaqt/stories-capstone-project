import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";


function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, name, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-form-container">
      <h1 className="title">Sign Up </h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <ul className="error-container">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email: <span className="asterisk">*</span>
          <input className="input"
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username: <span className="asterisk">*</span>
          <input className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Name: <span className="asterisk">*</span>
          <input className="input"
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Password: <span className="asterisk">*</span>
          <input className="input"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password: <span className="asterisk">*</span>
          <input className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary margin-top-10">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
