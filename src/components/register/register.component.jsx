import React from "react";
import "./register.styles.scss";
import { useRouteUpdate } from "../../RouteContext";
import { useState, useRef } from "react";
// import { signUp } from "../../firebase/firebase.utils";
const Register = ({ currentUser, loadUser }) => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const onRouteChange = useRouteUpdate();
  // //Firebase Method
  // async function handleSignUp(e) {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await signUp(
  //       nameRef.current.value,
  //       emailRef.current.value,
  //       passwordRef.current.value
  //     );
  //   } catch (err) {
  //     alert(err);
  //   }
  //   setLoading(false);
  // }

  // //Using backend method
  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);

    if (passwordRef.current.value.length >= 6) {
      fetch("http://localhost:3000/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          name: nameRef.current.value,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user.id) {
            loadUser(user);
            onRouteChange("home");
          } else {
            alert(user);
          }
        });
    } else {
      alert("password must contain at least 6 characters");
    }

    setLoading(false);
  }

  return (
    <div className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy " htmlFor="name">
                Name
              </label>
              <input
                className="pa2 br2  input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                ref={nameRef}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy " htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 br2  input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                ref={emailRef}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy " htmlFor="password">
                Password
              </label>
              <input
                className="b br2  pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
              />
            </div>
          </fieldset>
          <div className="mt3">
            <input
              onClick={handleSignUp}
              className="b br2  ph3 pv2 input-reset ba b--black bg-transparent grow pointer  dib"
              type="submit"
              value="Register"
              disabled={loading || currentUser}
            />
          </div>
          <div className="lh-copy mt3"></div>
        </form>
      </main>
    </div>
  );
};

export default Register;
