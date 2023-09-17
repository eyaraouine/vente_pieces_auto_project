import { Nav, Row, Pagination } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";
import CarProps from "../../types/carProps";
import CarCard from "./carCard";
import { getCarsFromApi } from "../../apis/carApis";
import Paginate from "../pagination";
import { useUserRole } from "../../utils/getRole";
import { ToastContainer } from "react-toastify";

export default function CarsSection() {
  useUserRole(["admin"])
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [cars, setCars] = useState<CarProps[]>([]);
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page") ?? "1") : 1
  );

  useEffect(() => {
    getCarsFromApi(page).then((res) => {
      setCars(res.data);
     setPageNumber(res.count / 4 +1);
    });
  }, [page]);

  return (<>
    <div className="custom-container">
      <h1>
        Voitures
        <Link
          to="/admin/cars/add"
          style={{ marginLeft: "auto", cursor: "pointer" }}
        >
          <GrAddCircle size={30} />
        </Link>
      </h1>
      <Row>
        {cars.map((car) => {
          return <CarCard {...car} />;
        })}
      </Row>

      <Paginate page={page} setPage={setPage} pageNumber={pageNumber} />
      <ToastContainer position="bottom-right" />
    </div>
  </>
  );
}
