import { useEffect, useState } from "react";
import { FormDataProps } from "../../types/FormDataProps";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { handleChange } from "../../apis/generic";
import CarsSearchForm from "../SearchForm/carsSearchForm";
import { CategoryProps } from "../../types/categoryProps";
import { getCategoriesFromApi, getCategoryAndSubCategoryByPieceCode, getPiecesInfosApisBySubCategory } from "../../apis/categoryApis";
import { getUserId } from "../../utils/getUserId";
import { ToastContainer } from "react-toastify";
import { postPiece, patchPiece } from "../../apis/piecesApis";
import { getPieceByIdFromApi } from "../../apis/piecesApis";
import { useUserRole } from "../../utils/getRole";
import { PieceInfo } from "../../types/pieceInfosProps";
import { getCarByCode, getCodeByCar } from "../../apis/carApis";

export default function EditPiece({ newElement }: { newElement: boolean }) {
  useUserRole(["admin", "provider"]);
  const [formData, setFormData] = useState<FormDataProps>({
    motorization: "",
    brand: "",
    model: "",
  } as FormDataProps);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [subCategories, setSubCategories] = useState<CategoryProps[]>([]);
  const { id } = useParams<{ id: string }>();
  const [isValidate, setIsValidate] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [pieces, setPieces] = useState<PieceInfo[]>([]);
  const [pieceCode, setPieceCode] = useState<string>("");
  const [carCode, setCarCode] = useState<string>("");


  useEffect(() => {
    if (!newElement && id) {
      getPieceByIdFromApi(id).then((res) => {
        setFormData(res);
        if (res.provider.id !== getUserId()) {
          navigate("/error")
        }
      });
    }
  }, [id]);

  useEffect(() => {
    setErrors(validateForm(formData));
  }, [formData]);

  const validateForm = (values: FormDataProps) => {
    const errors: { [key: string]: string } = {};
    if (values.description && values.description.length < 10) {
      errors.description =
        "⚠ La description doit contenir au moins 10 caractères !";
    }
    if (values.comments && values.comments.length < 5) {
      errors.comments =
        "⚠ Les commentaires doivent contenir au moins 5 caractères !";
    }
    if (values.price && values.price < 0) {
      errors.price = "⚠ Le prix ne peut pas être négatif !";
    }
    if (!values.brand) {
      errors.brand = "⚠ Veuillez choisir la marque !";
    }
    if (!values.model) {
      errors.model = "⚠ Veuillez choisir le modéle !";
    }
    if (!values.motorization) {
      errors.motorization = "⚠ Veuillez choisir la génération !";
    }
    if (!values.category) {
      errors.category = "⚠ Veuillez choisir la catégorie !";
    }
    if (!values.subCategory) {
      errors.subCategory = "⚠ Veuillez choisir la sous catégorie !";
    }
    if (!values.piece) {
      errors.piece = "⚠ Veuillez choisir la piéce !";
    }
    if(!values.carCode){
      errors.carCode = "⚠ Veuillez saisir le code de la voiture !";
    }

    if (
      errors.brand ||
      errors.model ||
      errors.motorization ||
      errors.category ||
      errors.subCategory ||
      errors.piece ||
      errors.description ||
      errors.comments ||
      errors.price
    ) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
    return errors;
  };

  const handleSubmit = async () => {
    const data = new FormData();
    if (formData.image && formData.image.name) {
      data.append("image", formData.image, formData.image.name);
    }
    data.append("brand", formData.brand ?? "");
    data.append("model", formData.model ?? "");
    data.append("motorization", formData.motorization ?? "");
    data.append("carCode", formData.carCode ?? "");
    data.append("category", formData.category ?? "");
    data.append("subCategory", formData.subCategory ?? "");
    data.append("piece", formData.piece ?? "");
    data.append("pieceCode", formData.pieceCode ?? "" )
    data.append("description", formData.description ?? "");
    data.append("comments", formData.comments ?? "");
    data.append("price", formData.price ? formData.price.toString() : "");
    data.append("provider", getUserId() ?? "");
    data.append(
      "constructorReference",
      formData.constructorReference ?? ""
    );

    if (newElement) {
      postPiece(data);
    } else {
      patchPiece(id ?? "", data);
    }
  };

  useEffect(() => {
    try {
  
      getCategoriesFromApi().then((res) => {
        setCategories(res);
      });
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    if (formData.category !== "" && formData.category !== undefined) {
      getCategoriesFromApi((formData.category as unknown) as number).then(
        (res) => {
          setSubCategories(res);
        }
      );
    } else {
      setSubCategories([]);
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.subCategory !== "" && formData.subCategory !== undefined ) {
      getPiecesInfosApisBySubCategory((formData.subCategory as unknown) as number).then((res) => {
        setPieces(res);
        //console.log(res)
      });
    } else {
      setPieces([]);
    }
  }, [formData.subCategory]);

  useEffect(() => {
    if (formData.piece !== "" && formData.piece !== undefined && pieceCode !== undefined && pieceCode !=="") {
      const selectedPiece = pieces.find(piece => piece.name === formData.piece);
      if (selectedPiece && typeof selectedPiece !== 'number') {
        setPieceCode(selectedPiece.code);
        console.log(pieceCode)
      }
    } else {
      setPieceCode("");
    }} , [formData.piece,pieces]);

    useEffect(() => {
      setFormData({...formData,pieceCode:pieceCode});
     if (pieceCode !=="" && pieceCode !== undefined){
       if (formData.category =="" || formData.category == undefined ){
       getCategoryAndSubCategoryByPieceCode(pieceCode).then((res) =>{
          console.log("donnees",res.category.label)
          setFormData((prevFormData) => ({
            ...prevFormData,
            category: res?.category?.id,
            subCategory: res?.subCategory?.id,
            piece: res?.pieceName,
          }));

      })}}
    }, [pieceCode,formData.category, formData.subCategory]);
    useEffect(() => {
      setFormData({...formData,carCode:carCode});
     if (carCode !=="" && carCode !==undefined
     ){
       if (formData.brand =="" || formData.brand == undefined ){
       getCarByCode(carCode).then((res) =>{
         console.log("donnees",res?.brand)
          setFormData((prevFormData) => ({
            ...prevFormData,
            brand: res?.brand,
            model: res?.model,
            motorization: res?.motorization,
          }));
        
      })}}
    }, [carCode,formData.brand,formData.model,formData.motorization]);
    useEffect(()=>{

    if (formData.motorization !== "" && formData.motorization !== undefined && carCode !== undefined ) {
        getCodeByCar(formData.brand,formData.model,formData.motorization).then((res) =>
        {console.log("data fetched:" ,res)
          setCarCode(res);})
      
    } else {
      setCarCode("");
    }},[formData.motorization])
  return (
    <>
      <div
        className={`custom-container`}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          marginTop: "50px",
          height: "100%",
          width: "80%",
        }}
      >
        <fieldset
          style={{ border: "2px solid ", margin: "20px", padding: "20px" }}
        >
          <CarsSearchForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          
            isValidate={isValidate}
          />
             <FormLabel style={{ marginRight: "10px" }}> Code </FormLabel>
            <FormControl
              type={"text"}
              name= {"carCode"}
              value={formData.carCode}
              onChange={(e: any) => {setCarCode(formData.carCode)
                handleChange(e, formData, setFormData)}}
            />
                     <p className="text-danger">{!isValidate && errors["carCode"]}</p>
        </fieldset>

        <fieldset
          style={{ border: "2px solid ", margin: "20px", padding: "20px" }}
        >
          <legend style={{ fontSize: "20px", padding: "20px" }}>
            Choisir une piéce
          </legend>
          <div className="mb-3">
         
            <FormLabel>Catégorie</FormLabel>
            <Form.Select
              value={formData.category}
              name={"category"}
              onChange={(e: any) => handleChange(e, formData, setFormData) }
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((category) => (
                <option value={category.id}>{category.label}</option>
              ))}
            </Form.Select>
            <p className="text-danger">{!isValidate && errors["category"]}</p>
          </div>
          <div className="mb-3">
            <FormLabel>Sous Catégorie </FormLabel>
            <Form.Select
              value={formData.subCategory}
              name={"subCategory"}
              onChange={(e: any) => handleChange(e, formData, setFormData)}
            >
              <option value="">Choisir une sous catégorie</option>
              {subCategories.map((subCategory) => (
                <option value={subCategory.id}>{subCategory.label}</option>
              ))}
            </Form.Select>
            <p className="text-danger">
              {!isValidate && errors["subCategory"]}
            </p>
          </div>
          <div className="mb-3">
          <FormLabel>Nom de la piéce </FormLabel>
            <Form.Select
              value={formData.piece}
              name={"piece"}

              onChange={(e: any) =>{
             
                 const selectedPiece = pieces.find(piece => piece.name === e.target.value);
    if (selectedPiece && typeof selectedPiece !== 'number') {
      setPieceCode(selectedPiece.code);
      console.log(selectedPiece.code)
    } else {
      setPieceCode("");
    }
    handleChange(e, formData, setFormData)
  }}
            >
              <option value="">Choisir le nom de la piéce</option>
              {pieces && pieces.map((piece) => (
                <option value={piece.name}>{piece.name}</option>
              ))}

            </Form.Select>
            <p className="text-danger">{!isValidate && errors["piece"]}</p>
          </div>
        </fieldset>
        <fieldset
          style={{ border: "2px solid ", margin: "20px", padding: "20px" }}
        >
          <legend style={{ fontSize: "20px", padding: "20px" }}>
            Saisir les détails de la piéce
          </legend>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormLabel style={{ marginRight: "10px" }}> Image </FormLabel>
            <FormControl
              type={"file"}
              name={"image"}
              onChange={(e: any) => {
                console.log(e.target.files);
                setFormData({
                  ...formData,
                  image: e.target.files && e.target.files[0],
                });
              }}
              accept="image/*"
              style={{ width: "500px" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center",paddingTop:"20px" }}>
            <FormLabel style={{ marginRight: "10px" }}> Code </FormLabel>
            <FormControl
              type={"text"}
              name= {"pieceCode"}
              value={formData.pieceCode}
              onChange={(e: any) => {setPieceCode(formData.pieceCode)
                handleChange(e, formData, setFormData)}}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <FormLabel style={{ marginRight: "10px" }}>Prix</FormLabel>
            <FormControl
              type={"number"}
              value={formData.price}
              name={"price"}
              onChange={(e: any) => handleChange(e, formData, setFormData)}
              style={{ width: "500px" }}
            />
            <p className="text-danger">{!isValidate && errors["price"]}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <FormLabel style={{ marginRight: "10px" }}>Description</FormLabel>

            <FormControl
              type={"text"}
              value={formData.description}
              name={"description"}
              onChange={(e: any) => handleChange(e, formData, setFormData)}
              style={{ width: "500px" }}
            />
          </div>
          <p className="text-danger">{!isValidate && errors["description"]}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <FormLabel style={{ marginRight: "10px" }}>
              Référence du constructeur
            </FormLabel>

            <FormControl
              type={"text"}
              value={formData.constructorReference}
              name={"constructorReference"}
              onChange={(e: any) => handleChange(e, formData, setFormData)}
              style={{ width: "500px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <FormLabel style={{ marginRight: "10px" }}>Commentaires</FormLabel>
            <FormControl
              type={"text"}
              value={formData.comments}
              name={"comments"}
              onChange={(e: any) => handleChange(e, formData, setFormData)}
              style={{ width: "500px" }}
            />
            <p className="text-danger">{!isValidate && errors["comments"]}</p>
          </div>
        </fieldset>
        <Button
          name="Submit"
          type="submit"
          disabled={!isValidate}
          onClick={() => {
            handleSubmit();
          }}
        >
          Enregistrer la piéce
        </Button>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}