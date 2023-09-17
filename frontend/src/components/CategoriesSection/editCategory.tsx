import { useEffect, useState } from "react";
import { Button, FormControl, FormLabel, InputGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { GrClose } from "react-icons/gr";
import "../../custom.css";
import { handleChange } from "../../apis/generic";
import {
  getCategoryFromApi,
  patchCategory,
  postCategory,
} from "../../apis/categoryApis";
import { useDispatch } from "react-redux";
import { update } from "../../store";
import { PieceInfo } from "../../types/pieceInfosProps";

interface CategoryFormProps {
  id?: number;
  parent?: number;
  label?: string;
  image?: File;
  piecesInfos?: PieceInfo[];
}

interface FormProps extends CategoryFormProps {
  isHidden: boolean;
  hide: () => void;
}

const setData = (data: CategoryFormProps) => {
  let formData = new FormData();
  if (data.image && data.image.name)
    formData.append("image", data.image, data.image?.name ?? "");
  data.parent && formData.append("parent", data.parent.toString());
  formData.append("label", data.label ?? "");
  data.piecesInfos?.forEach((piece, index) => {
    formData.append(`piecesInfos[${index}][name]`, piece.name);
    formData.append(`piecesInfos[${index}][code]`, piece.code);
  });

  return formData as CategoryFormProps;
};

export default function EditCategory({
  id,
  parent,
  isHidden,
  hide,
}: FormProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<CategoryFormProps>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [piecesInfos, setPiecesInfos] = useState<PieceInfo[]>([{ name: '', code: '' }]);
  const [isValidate, setIsValidate] = useState(false);

  const handlePieceInfosChange = (index: number, newPiece: PieceInfo) => {
    const newPieces = [...piecesInfos];
    newPieces[index] = newPiece;
    setPiecesInfos(newPieces);
  };
  useEffect(() => {
    // Update formData when piecesInfos changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      piecesInfos: piecesInfos,
    }));
  }, [piecesInfos]);

  const handleAddPieceInfos = () => {
    setPiecesInfos([...piecesInfos, { name: '', code: '' }]);
  };

  const handleRemovePieceInfos = (index: number) => {
    const newPieces = [...piecesInfos];
    newPieces.splice(index, 1);
    setPiecesInfos(newPieces);
  };

  const getFormData = async () => {
    console.log("id", id);
    if (id && id !== -1) {
      const data = await getCategoryFromApi(id);
      console.log("fetched data :",data);
      setFormData(data);
    } else {
      const newFormData: CategoryFormProps = {
        id: id,
        parent: parent,
      };
      setFormData(newFormData);
    }
  };

  useEffect(() => {
    getFormData();
  }, [id, parent]);

  const validateForm = (values: CategoryFormProps) => {
    const errors: { [key: string]: string } = {};
    if (!values.label) {
      errors.label = "⚠ Veuillez remplir ce champ";
    } else if (values.label.length < 2) {
      errors.label = "⚠ Veuillez entrer au moins 2 caractères";
    }
    if (errors.label) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
    return errors;
  };

  useEffect(() => {
    setErrors(validateForm(formData));
  }, [formData]);


  // const EditCategory = async () => {
  //   const data = setData(formData);
    
  //   if (formData.parent !== null) {
  //     data.piecesInfos = piecesInfos; // Ajouter les informations des pièces au formulaire de données
  //   }
    
  //   await patchCategory(id ?? -1, data).then(() => {
  //     setFormData({ label: "", image: undefined });
  //     setPiecesInfos([{ name: '', code: '' }]); // Réinitialiser les informations des pièces
  //     dispatch(update());
  //   });
  // };
  const EditCategory = async () => {
    const updatedData = setData(formData); // Créez une copie mise à jour des données du formulaire
    
    // Si le parent n'est pas nul, mettez à jour les informations des pièces
    // if (formData.parent !== null) {
    //   updatedData.piecesInfos = formData.piecesInfos;
    // }
    
    // // Mettez à jour uniquement les champs pertinents du formulaire
    // updatedData.label = formData.label;
    // updatedData.image = formData.image;
  
    await patchCategory(id ?? -1, updatedData).then(() => {
      // Réinitialisez uniquement les informations des pièces
      //setPiecesInfos([{ name: '', code: '' }]);
      dispatch(update());
    });
  };
  
  
  const AddCategory = async () => {
    const data = setData(formData);

    if (formData.parent !== null) {
      data.piecesInfos = piecesInfos; // Ajouter les informations des pièces au formulaire de données
    } 
    await postCategory(data).then(() => {
      setFormData({ label: "", image: undefined });
      setPiecesInfos([{ name: '', code: '' }]); // Réinitialiser les informations des pièces
      dispatch(update());
    });
  };
  
  

  return (
    <div className={`prompt ${isHidden && "d-none"}`}>
      <GrClose
        onClick={() => hide()}
        size={20}
        style={{ marginLeft: "98%", cursor: "pointer" }}
      />
      <h4>{id === -1 ? "Ajouter " : "Modifier "} une {parent && "sous "} catégorie</h4>
      <div className="mb-3">
        <FormLabel>Nom: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.label}
          name={"label"}
          onChange={(e: any) => handleChange(e, formData, setFormData)}
        />
        <p className="text-danger">{!isValidate && errors.label}</p>
      </div>
      
        <div className="mb-3">
          <FormLabel>Image: </FormLabel>
          <FormControl
            type={"file"}
            name={"image"}
  
            onChange={(e: any) =>       
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
      
      {parent && (
        <div className="mb-3">
          <FormLabel>Pièces associées: </FormLabel>
          {formData.piecesInfos?.map((piece, index) => (
            <InputGroup key={index} className="mb-2">
              <FormControl
                type="text"
                placeholder="Nom de la pièce"
                value={piece.name}
                onChange={(e) =>
                  handlePieceInfosChange(index, { ...piece, name: e.target.value })
                }
              />
              <FormControl
                type="text"
                placeholder="Code de la pièce"
                value={piece.code}
                onChange={(e) =>
                  handlePieceInfosChange(index, { ...piece, code: e.target.value })
                }
              />
              <Button variant="outline-secondary" onClick={() => handleRemovePieceInfos(index)}>
                Supprimer
              </Button>
            </InputGroup>
          ))}
          <Button variant="primary" onClick={handleAddPieceInfos}>
            Ajouter une pièce
          </Button>
        </div>
      )}


      <Button
        name="Submit"
        type="submit"
        disabled={!isValidate}
        className="m-3"
        onClick={() => {
          id === -1 ? AddCategory() : EditCategory();
          hide();
        }}
      >
        Enregistrer
      </Button>
    </div>

  );
}
