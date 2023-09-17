import SearchPieceProps from "../types/searchPieceProps";
import { deleteData, getData, patchData, postData } from "./generic";

const getPiecesFromApi = async (page?: number) => {
  try {
    let data = await getData("pieces?page=" + page);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPiecesByProvider = async (id: string) => {
  try {
    let data = await getData("pieces/provider/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPieceByIdFromApi = async (id: string) => {
  try {
    let data = await getData("pieces/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Get all pieces if
const searchPieces = async (formData: SearchPieceProps, page: number) => {
  try {
    let data = await getData(
      "pieces/search?page=" +
        page +
        "&brand=" +
        formData.brand +
        "&model=" +
        formData.model +
        "&motorization=" +
        formData.motorization +
        "&sortBy=" +
        formData.sortBy
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
const searchPiecesByCriteria = async (criteria:string,page:number) => {
  try {
    let data = await getData("pieces/searchpieces?criteria=" + criteria+"&page="+page);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const searchPiecesByCategory = async (
  id: any,
  formData: SearchPieceProps,
  page: number
) => {
  console.log("pieces/search/" +id +"?page=" +
  page +
  "&brand=" +
  formData.brand +
  "&model=" +
  formData.model +
  "&motorization=" +
  formData.motorization +
  "&sortBy=" +
  formData.sortBy)
  try {
    let data = await getData(
      "pieces/search/" +id +"?page=" +
        page +
        "&brand=" +
        formData.brand +
        "&model=" +
        formData.model +
        "&motorization=" +
        formData.motorization +
        "&sortBy=" +
        formData.sortBy
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postPiece = async (data: any) => {
  try {
    postData("pieces/add", data);
  } catch (err) {
    console.log(err);
  }
};

const patchPiece = async (id: string, data: any) => {
  try {
    patchData("pieces/update/" + id, data);
  } catch (err) {
    console.log(err);
  }
};

const deletePiece = async (id: string) => {
  try {
    deleteData("pieces/delete/", id);
  } catch (err) {
    console.log(err);
  }
};

export {
  searchPieces,
  searchPiecesByCriteria,
  patchPiece,
  getPiecesByProvider,
  deletePiece,
  searchPiecesByCategory,
  postPiece,
  getPieceByIdFromApi,
  getPiecesFromApi,
};
