import { useState, useEffect } from "react";
import { FormDataProps } from "../../types/FormDataProps";
import { handleChange } from "../../apis/generic";
import { FormLabel, Form } from "react-bootstrap";
import CarProps from "../../types/carProps";
import { getCarBrands, getCarModels, getCarMotorization } from "../../apis/carApis";

interface CarsSearchFormProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: FormDataProps | CarProps;
  isValidate?: boolean;
  errors?: { [key: string]: string };
}

export default function CarsSearchForm({
  setFormData,
  formData,
  isValidate,
  errors,
  
}: CarsSearchFormProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [motorizations, setMotorizations] = useState<string[]>([]);

  useEffect(() => {
    getCarBrands().then((res) => {
      setBrands(res);
    });
  }, []);

  useEffect(() => {
    if (formData.brand !== "" && formData.brand !== undefined ) {
      getCarModels(formData.brand).then((res) => {
        setModels(res);
      });
    } else {
      setModels([]);
      setMotorizations([]);
    }
  }, [formData.brand]);

  useEffect(() => {
    if (formData.model !== "" && formData.brand !== "" && formData.model !== undefined && formData.brand !== undefined ) {
      getCarMotorization(formData.brand, formData.model).then((res) => {
        setMotorizations(res);
      });
    } else {
      setMotorizations([]);
    }
  }, [formData.model, formData.brand]);

  return (
    <>
     <legend style={{ fontSize: "20px", paddingBottom: "20px" }}>
        Choisir une voiture
      </legend>
      <div className="mb-3">
        <FormLabel>Marque</FormLabel>
        <Form.Select
          value={formData.brand}
          name={"brand"}
          onChange={(e: any) => handleChange(e, formData, setFormData)}
        >
          <option value="">Choisir une marque</option>
          {brands && brands.map((brand) => (
            <option value={brand}>{brand}</option>
          ))}
        </Form.Select>
        {isValidate!== undefined && errors !== undefined && (
          <p className="text-danger">{!isValidate && errors["brand"]}</p>
        )}
      </div>
      <div className="mb-3">
        <FormLabel>Modèle</FormLabel>
        <Form.Select
          value={formData.model}
          name={"model"}
          onChange={(e: any) => handleChange(e, formData, setFormData)}
        >
          <option value="">Choisir un modèle</option>
          {models &&
            models.map((model) => <option value={model}>{model}</option>)}
        </Form.Select>
        {isValidate!== undefined && errors !== undefined && (
          <p className="text-danger">{!isValidate && errors["model"]}</p>
        )}
      </div>
      <FormLabel>Génération</FormLabel>
      <Form.Select
        value={formData.motorization}
        name={"motorization"}
        onChange={(e: any) =>{  handleChange(e, formData, setFormData)}}
      >
        <option value="">Choisir une génération</option>
        {motorizations.map((motorization) => (
          <option value={motorization}>{motorization}</option>
        ))}
      </Form.Select>
      {isValidate!== undefined && errors !== undefined && (
        <p className="text-danger">{!isValidate && errors["motorization"]}</p>
      )}
    </>
  );
}
