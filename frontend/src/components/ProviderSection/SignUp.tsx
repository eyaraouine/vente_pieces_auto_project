import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TokenSignUpProps from "../../types/tokenSignUP";
import { getProviderByIdFromApi } from "../../apis/providerApis";

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState<TokenSignUpProps>({
    id: "",
    email: "",
    password: "",
    role: "",
    username: "",
  });

  const [errorMessage] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const t = searchParams.get("token");
    if (t !== "") {
      try {
      const u = jwt_decode<TokenSignUpProps>(t as string);

      getProviderByIdFromApi(u.id)
        .then((res) => {
          setUser(u);
        })
        .catch((err) => {
          navigate("/error");
        });
      } catch (error) {
        navigate("/error");
      }
    }
  }, []);

  const handleSubmit = () => {
    console.log(user);
    axios.post("http://localhost:3001/auth/register", user).then((response) => {
      navigate("/login");
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
                <h2 className="fw-bold mb-2 text-uppercase">
                  Confirmer votre Compte
                </h2>
                <p className="text-primary-50 mb-5">
                  Entrez votre login et votre mot de passe !
                </p>

                <div className="form-outline form-primary mb-4">
                  <label className="form-label" htmlFor="typeEmailX">
                    Username
                  </label>
                  <input
                    type="text"
                    id="typeEmailX"
                    className="form-control form-control-lg"
                    value={user.username}
                    name="username"
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
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
