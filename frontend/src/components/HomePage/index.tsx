import ProductCard from "./productCard";
import "./home.css";
import { Row } from "react-bootstrap";
import CategoriesList from "./categoryList";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./sideBar";
import { useEffect, useState } from "react";
import { ProductProps } from "../../types/ProductProps";
import { useSearchParams } from "react-router-dom";
import {
  getPiecesFromApi,
  searchPieces,
  searchPiecesByCategory,
  searchPiecesByCriteria,
} from "../../apis/piecesApis";
import Paginate from "../pagination";
import { useUserRole } from "../../utils/getRole";
import SearchPieceProps from "../../types/searchPieceProps";
import CustomSearchBar from "../SearchBar/searchBar";

export function HomePage() {
  useUserRole(["", "admin", "provider"]);
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [selected, setSelected] = useState([] as number[]);
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page") ?? "1") : 1
  );
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    motorization: "",
    sortBy: "",
  } as SearchPieceProps);
  const [search, setSearch] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchBarTerm,setSearchBarTerm] = useState("");

  useEffect(() => {
    search
      ? handleSearch(page): searchBar ?
      handleSearchBar(page)
      : getPiecesFromApi(page).then((res:any) => {
          setProducts(res.data);
          setPageNumber(res.count /4  + 1);
        });
  }, [page]);
  useEffect(()=>{
    console.log(searchBarTerm)
  },[searchBarTerm])

  useEffect(() => {
    setFormData({
      brand: "",
      model: "",
      motorization: "",
      sortBy: "",
    } as SearchPieceProps);
    if (selected.length !== 0) 
      handleSearch();
  }, [selected]);
  useEffect(() => {
    if (searchBarTerm !== "") 
      handleSearchBar();
  }, [searchBarTerm]);


  const handleSearchBar = (page?: number) => {
  
    setSearchBar(true);
  
    if (!page) {
      page = 1;
      setPage(1);
    }
    
console.log("page moi",page)
      searchPiecesByCriteria(searchBarTerm, page).then((res) => {
        setProducts(res.data);
        setPageNumber(res.count / 4+ 1);
        if (res.data == "" || res.data == undefined){
          console.log("tester")
          getPiecesFromApi(page).then((res) => {
            setProducts(res.data);
            setPageNumber(res.count /4  + 1);
          })
        }
      });
  };
  useEffect(()=>{
    console.log("produits",products)
  },[products])
  const handleSearch = (page?: number) => {
    setSearch(true);
    if (!page) {
      page = 1;
      setPage(1);
    }
    if (selected.length > 0) {
      searchPiecesByCategory(selected[selected.length - 1], formData, page).then((res) => {
        setProducts(res.data);
        setPageNumber(res.count / 4+ 1);
      });
    } else {
      searchPieces(formData, page).then((res) => {
        setProducts(res.data);
        setPageNumber(res.count / 4+ 1);
      });
    }
    setFormData({
      brand: "",
      model: "",
      motorization: "",
    } as SearchPieceProps); 
  };
  useEffect(()=>{
 console.log("page 15 lk",page)
  },[page])

  return (
    <>
      <div className="custom-container">
        <h4 >Catégories</h4>
           <CategoriesList selected={selected} setSelected={setSelected} />
      </div>
      <div className="d-flex flex-row justify-items-between">
        <SideBar
          formData={formData}
          setFormData={setFormData}
          handleSearch={handleSearch}
        />
        <div
          className="p-2 "
          style={{
            width: "75%",
            marginLeft: "50px",
          }}
        >
      <CustomSearchBar searchBarTerm={searchBarTerm} setSearchBarterm={setSearchBarTerm} handleSearchBar={handleSearchBar} />
          <Row style={{ gap: 30 ,paddingTop: 90}}>
            {Object.values(products).map((product, i) => {
              return <ProductCard key={i} product={product} />;
            })}
          </Row>
          {pageNumber !== 0 && (
            <Paginate page={page} setPage={setPage} pageNumber={pageNumber} />
          )}
        </div>
      </div>
    </>
  );
}
