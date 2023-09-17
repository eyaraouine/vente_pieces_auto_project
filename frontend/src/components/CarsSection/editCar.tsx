import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  NavLink,
} from "react-bootstrap";
import CarProps from "../../types/carProps";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { getCarBrands, getCarByIdFromApi, getCarModels, patchCar, postCar } from "../../apis/carApis";
import { useUserRole } from "../../utils/getRole";

interface CarFormProps extends Partial<CarProps> { }

export default function EditCar({ newElement }: { newElement: boolean }) {
  useUserRole(["admin"])
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<CarFormProps>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValidate, setIsValidate] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [newBrand, setNewBrand] = useState<boolean>(false);
  const [newModel, setNewModel] = useState<boolean>(false);

  useEffect(() => {
    if (!newElement && id) {
      getCarByIdFromApi(id).then((res) => {
        setFormData(res);
      });
    }
  }, [id]);

  const validateForm = (values: CarFormProps) => {
    const errors: { [key: string]: string } = {};
    if (!values.brand) {
      errors.brand = "⚠ Veuillez remplir ce champ";
    }
    if (!values.model) {
      errors.model = "⚠ Veuillez remplir ce champ";
    }
  
    if(newBrand && brands.includes(values.brand as string)){
      errors.brand = "⚠ Cette marque existe déjà";
    }

    if(newModel && models.includes(values.model as string)){
      errors.model = "⚠ Ce modéle existe déjà";
    }

    if (!values.motorization) {
      errors.motorization = "⚠ Veuillez remplir ce champ";
    }
    if (!values.carCode) {
      errors.carCode = "⚠ Veuillez remplir ce champ";
    }

    if (errors.brand || errors.model || errors.motorization) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
    return errors;
  };

  useEffect(() => {
    console.log(formData);
    setErrors(validateForm(formData));
  }, [formData, newBrand, newModel]);

  useEffect(() => {
    getCarBrands().then((res) => {
      setBrands(res);
    });
  }, []);

  useEffect(() => {
    if (formData.brand !== "" && !newBrand) {
      getCarModels(formData.brand as string).then((res) => {
        setModels(res);
      });
    } else {
      setModels([]);
    }
  }, [formData.brand]);

  const EditCar = async (formData: CarFormProps) => {
    patchCar(id ?? "", formData as CarProps);
  };

  const AddCar = async (formData: CarFormProps) => {
    postCar(formData as CarProps);
    setFormData({ brand: "", model: "", motorization: "" });

  };

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    let { name, value } = e.target as HTMLInputElement;
    const suffix = "Select";

    if (name.endsWith(suffix)) {
      name = name.slice(0, -suffix.length).trim();
    }
    console.log(name);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className={`custom-container`}>
        <h4>{newElement ? "Ajouter " : "Modifier "}une voiture</h4>
        <div className="mb-3">
          <FormLabel>Marque: </FormLabel>
          <Form.Select
            className={newBrand ? "d-none" : "d-block"}
            value={formData.brand}
            name={"brandSelect"}
            onChange={(e: any) => handleChange(e)}
          >
            <option value="">Choisir une marque</option>
            {Array.isArray(brands) &&
              brands.map((brand) => <option value={brand}>{brand}</option>)}
          </Form.Select>
          <FormControl
            className={newBrand ? "d-block" : "d-none"}
            type={"text"}
            value={formData.brand ?? ""}
            name={"brand"}
            onChange={(e: any) => handleChange(e)}
          />
          <NavLink
            className="text-primary"
            onClick={() => setNewBrand(!newBrand)}
          >
            {!newBrand
              ? "Ajouter une nouvelle marque"
              : "Choisir une marque existante"}
          </NavLink>
          <p className="text-danger">{!isValidate && errors["brand"]}</p>
        </div>

        <div className="mb-3">
          <FormLabel>Modéle: </FormLabel>
          <Form.Select
            className={newModel ? "d-none" : "d-block"}
            defaultValue={formData.model ?? ""}
            name={"modelSelect"}
            onChange={(e: any) => handleChange(e)}
          >
            <option value="">Choisir un modéle</option>
            {Array.isArray(models) &&
              models.map((model) => <option value={model}>{model}</option>)}
          </Form.Select>
          <FormControl
            className={newModel ? "d-block" : "d-none"}
            type={"text"}
            defaultValue={formData.model}
            name={"model"}
            onChange={(e: any) => handleChange(e)}
          />
          <NavLink
            className="text-primary"
            onClick={() => setNewModel(!newModel)}
          >
            {!newModel
              ? "Ajouter un nouveau modéle"
              : "Choisir un modéle existant"}
          </NavLink>
          <p className="text-danger">{!isValidate && errors["model"]}</p>
        </div>

        <div className="mb-3">
          <FormLabel>Motorisation: </FormLabel>
          <FormControl
            type={"text"}
            value={formData.motorization}
            name={"motorization"}
            onChange={(e: any) => handleChange(e)}
          />
          <p className="text-danger">{!isValidate && errors["motorization"]}</p>
        </div>
        <div className="mb-3">
          <FormLabel>Code: </FormLabel>
          <FormControl
            type={"text"}
            value={formData.carCode}
            name={"carCode"}
            onChange={(e: any) => handleChange(e)}
          />
          <p className="text-danger">{!isValidate && errors["carCode"]}</p>
        </div>

        <Button
          name="Submit"
          type="submit"
          disabled={!isValidate}
          className="m-3"
          onClick={() => {
            newElement
              ? AddCar(formData)
              : EditCar(formData);
          }}
        >
          Enregistrer
        </Button>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
