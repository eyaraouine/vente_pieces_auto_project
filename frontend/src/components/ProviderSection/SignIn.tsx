import { useState } from "react";
import axios from "axios";
import { LoginProps } from "../../types/LoginProps";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../../utils/getRole";
import { useDispatch } from "react-redux";
import { setToken } from "../../store";


export default function SignIn() {
  useUserRole(["provider", "admin", ""]);
  const [user, setUser] = useState<LoginProps>({
    login: "",
    password: "",
  });

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  let navigate = useNavigate();

  const handleSubmit = () => {
    console.log(user);
    axios
      .post("http://localhost:3001/auth/login", user)
      .then((response) => {
        console.log(response);
        const t = response.data.token;
        localStorage.setItem("token", t);
        dispatch(setToken(t))
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <section
      className="vh-100 gradient-custom"
      style={{ backgroundImage: 'url("../background.png")' }}
    >
      <div className="container py-5 d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card bg-light text-primary"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Connexion</h2>
                <p className="text-primary-50 mb-5">
                  Entrez votre login et votre mot de passe !
                </p>

                <div className="form-outline form-primary mb-4">
                  <label className="form-label" htmlFor="typeEmailX">
                    Email
                  </label>
                  <input
                    type="text"
                    name="login"
                    id="typeEmailX"
                    className="form-control form-control-lg"
                    value={user.login}
                    onInput={handleInputChange}
                  />
                </div>

                <div className="form-outline form-primary mb-4">
                  <label className="form-label" htmlFor="typePasswordX">
                    Password
                  </label>
                  <input
                    type="password"
                    id="typePasswordX"
                    name="password"
                    value={user.password}
                    className="form-control form-control-lg"
                    onInput={handleInputChange}
                  />
                </div>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <button
                  className="btn btn-outline-primary "
                  style={{ marginTop: "70px" }}
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  Se connecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
