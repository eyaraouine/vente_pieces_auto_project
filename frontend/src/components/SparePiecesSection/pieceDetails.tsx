import { Link, useParams } from "react-router-dom";
import { ProductProps } from "../../types/ProductProps";
import { useEffect, useState } from "react";
import { deletePiece, getPieceByIdFromApi } from "../../apis/piecesApis";
import CarCard from "../CarsSection/carCard";
import { CiMoneyBill } from "react-icons/ci";
import { IoConstructSharp } from "react-icons/io5";
import { MdDescription, MdComment } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import ErrorPage from "../errorPage";
import { Button, Toast } from "react-bootstrap";
import { getRole, useUserRole } from "../../utils/getRole";
import { getUserId } from "../../utils/getUserId";
import { ToastContainer } from "react-toastify";
import { getImagePath } from "../../utils/getImagePath";

export default function PieceDetails() {
  useUserRole(["admin", "", "provider"]);
  const { id } = useParams<{ id: string }>();
  const role = getRole();
  const [piece, setPiece] = useState<ProductProps | null>(null);

  useEffect(() => {
    id &&
      getPieceByIdFromApi(id).then((data) => {
        console.log(data);
        setPiece(data);
      });
  }, [id]);
  return (
    <div className="container">
      {piece ? (
        <div>
          <div
            style={{ display: "flex", flexDirection: "row", paddingTop: "50px" }}
          >
            <div className="image-profile" style={{ flex: 1 }}>
              <img
                src={piece.image? getImagePath(piece.image) : "https://via.placeholder.com/150"}
                style={{ width: "300px" }}
                alt=""
              />
            </div>
            <div className="credentials" style={{ paddingLeft: "20px" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button variant="outline-primary" style={{ marginRight: "10px" }}>
                  {piece.category.label}
                </Button>
                {piece.subCategory && (
                  <Button variant="outline-danger">
                    {piece.subCategory.label}
                  </Button>
                )}
              </div>
  
              <ul style={{ listStyle: "none", paddingTop: "10px" }}>
                <li style={{ paddingBottom: "30px" }}>
                  <h1 className="text-4xl font-bold">{piece.piece} </h1>
                </li>
                <li style={{ paddingBottom: "30px" }}>
                  <CiMoneyBill size={30} />
                  {piece.price} DT
                </li>
                <li style={{ paddingBottom: "30px" }}>
                  <IoConstructSharp size={30} />
                  {piece.constructorReference}
                </li>
                <li style={{ paddingBottom: "30px" }}>
                  <MdDescription size={30} />
                  {piece.description ?? "Pas de description"}
                </li>
                <li style={{ paddingBottom: "30px" }}>
                  <MdComment size={30} />
                  {piece.comments ?? "Pas de commentaires"}
                </li>
  
                <li style={{ paddingBottom: "30px", width: 800 }}>
                  <AiFillCar size={30} /> Voiture
                  {piece.cars && <CarCard {...piece.cars} edit={false} />}
                </li>
              </ul>
              <div
                style={{ display: "flex", flexDirection: "row",gap:"60px",marginBottom:"10px" }}
              >
                <Link
                  to={`/providers/${piece.provider && piece.provider.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className="btn btn-primary" style={{ width: "150px" }}>
                    Voir Fournisseur
                  </button>
                </Link>
                {(getUserId() === piece.provider.id) && (
                  <div >
                    <Link to={"/pieces/edit/" + id}> 
                      <button className="btn btn-primary " style={{marginRight:"60px"}}>Modifier</button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deletePiece(piece.id);
                      }}
                    >
                      Supprimer 
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      ) : (
        <ErrorPage message="404 - Pièce introuvable" />
      )}
    </div>
  );
  
}
