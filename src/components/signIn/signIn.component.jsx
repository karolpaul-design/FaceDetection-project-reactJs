import React from "react";
import "./signIn.styles.scss";
import { useRouteUpdate } from "../../RouteContext";
import { useState, useRef } from "react";
// import { signIn } from "../../firebase/firebase.utils";
// import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
const SignIn = ({ loadUser }) => {
  const [loading, setLoading] = useState(false);
  const onRouteChange = useRouteUpdate();
  const emailRef = useRef();
  const passwordRef = useRef();

  // //Firebase Method
  // function handleSubmitSignIn(event) {
  //   event.preventDefault();
  //   setLoading(true);
  //   try {
  //     signIn(emailRef.current.value, passwordRef.current.value);
  //   } catch (err) {
  //     alert(err);
  //   }
  //   setLoading(false);
  // }

  // //Using backend method
  function handleSubmitSignIn(event) {
    event.preventDefault();
    setLoading(true);

    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
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

    setLoading(false);
  }

  return (
    <div className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy " htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 br2  input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email-address"
                ref={emailRef}
              />
            </div>
            <div className="mv3">
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
          <div className="">
            <input
              className="b br2  ph3 pv2 input-reset ba b--black bg-transparent grow pointer  dib"
              type="submit"
              value="Sign in"
              onClick={handleSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              href="#0"
              className="pointer link dim black db"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
