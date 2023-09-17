import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProviderProps from "../../types/ProviderProps";
import { getProviderDeleted } from "../../apis/providerApis";
import ErrorPage from "../errorPage";
import { getRole, useUserRole } from "../../utils/getRole";
import { getUserId } from "../../utils/getUserId";
import { Button } from "react-bootstrap";
import { getImagePath } from "../../utils/getImagePath";

export default function ProviderDetails() {
  useUserRole(["admin", "provider", ""]);
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<ProviderProps>({
    id: id ?? "",
    name: "",
    logo: "",
    city: "",
    address: "",
    email: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    messenger: "",
    observation: "",
    createdAt: "",
    deletedAt: "",
  });

  useEffect(() => {
    getProviderDeleted(id ?? "-1").then((res) => {
      setProvider(res);
      console.log(res.logo);
    });
    
  }, []);

  return (
    <>
      {provider ? (
        <>
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "50px",
            }}
          >
            <div className="image-profile" style={{ flex: 1 }}>
              <img
                src={provider.logo? getImagePath(provider.logo) : "https://via.placeholder.com/150"}
                className="img-fluid rounded-circle "
                style={{ width: "300px" }}
                alt=""
              />
            </div>
            <div
              className="credentials"
              style={{ flex: 2, paddingLeft: "20px" }}
            >
              <ul style={{ listStyle: "none", paddingTop: "10px" }}>
                <li style={{ paddingBottom: "30px" }}>
                  <h1 className="text-4xl font-bold">
                    {provider.name.charAt(0).toUpperCase() +
                      provider.name.slice(1)}{" "}
                  </h1>
                </li>
                <li style={{ paddingBottom: "30px" }}>
                  <i
                    className="fa fa-phone"
                    style={{ color: "#34A853", paddingRight: "3px" }}
                  ></i>{" "}
                  {provider.phone}
                </li>
                <li style={{ paddingBottom: "30px" }}>
                  <i
                    className="fa-brands fa-whatsapp"
                    style={{
                      color: "#34A853",
                      paddingRight: "3px",
                      fontSize: "23px",
                    }}
                  ></i>
                  {provider.whatsapp ? (
                    <a href={provider.whatsapp}>Lien Whatsapp</a>
                  ) : (
                    "Non Fourni"
                  )}
                </li>
                <li style={{ paddingBottom: "30px" }}>
                  <i
                    className="fa-brands fa-facebook"
                    style={{ color: "#405DE6", paddingRight: "3px" }}
                  ></i>{" "}
                  {provider?.facebook ? (
                    <a href={provider?.facebook}>Lien Facebook</a>
                  ) : (
                    "Non Fourni"
                  )}
                </li>
                <li style={{ paddingBottom: "30px" }}>
                  <i
                    className="fa-brands fa-facebook-messenger"
                    style={{ color: "#405DE6", paddingRight: "3px" }}
                  ></i>
                  {provider.messenger ? (
                    <a href={provider.messenger}>Lien Messenger</a>
                  ) : (
                    "Non Fourni"
                  )}
                </li>
                <li style={{ paddingBottom: "30px" }}>
                  <a href="mailto:johndoe@gmail.com">
                    <i
                      className="fa fa-envelope"
                      style={{
                        color: "#EA4335",
                        fontSize: "15px",
                        paddingRight: "3px",
                      }}
                    ></i>
                    {provider?.email ? provider.email : "Non Fourni"}
                  </a>
                </li>

                <li style={{ paddingBottom: "20px" }}>
                  <i
                    className="fas fa-map-marker-alt"
                    style={{ paddingRight: "3px", color: "#ffa500" }}
                  ></i>
                  {provider.address}, {provider.city}
                </li>
                <li style={{ paddingBottom: "20px" }}>
                  <i
                    className="fa-solid fa-comment"
                    style={{ paddingRight: "3px" }}
                  ></i>
                  {provider.observation
                    ? provider.observation
                    : "Aucune observation disponible"}
                </li>
                <li>
                  <Link
                    to={"/pieces/provider/" + provider.id}
                    className="focus-visible:outline-none"
                  >
                    <Button variant="primary" className="focus-visible:outline-none" style={{width:"200px"}}>
                    Voir les pièces
                  </Button>
                  </Link>
                  
                </li>
              </ul>
              {provider.id === getUserId() && (
            <div> 
              <Link to={"/admin/providers/edit/" + provider.id}>
                <button className="btn btn-primary">Modifier</button>
              </Link>
            </div>
          )}
            </div>
          </div>
        </>
      ) : (
        <ErrorPage message="404 - Fournisseur introuvable" />
      )}
    </>
  );
}
