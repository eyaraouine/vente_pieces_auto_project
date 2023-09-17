import { deleteData, getData, patchData, postData } from "./generic"

// route (/categories) : get all categories
// route (/subcategories/:id) : get all subcategories by category id
const getCategoriesFromApi = async (id?: number) => {
    try {
      let data = id
        ? await getData("categories/subcategories/" + id)
        : await getData("categories")
    return data
    } catch (error) {
        console.log(error);
    }
};

const getCategoryFromApi = async (id: number) => {
    try {
        let data = await getData("categories/" + id);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const postCategory = async (data: any) => {
    try {
        await postData("categories/add", data);
    } catch (error) {
        console.log(error);
    }
};

const patchCategory = async (id:number, data: any) => {
    await patchData("categories/update/" + id, data);
}

const deleteCategory = async (id: number) => {
    await deleteData("categories/delete/", id)
}
const getPiecesInfosApisBySubCategory = async (id: number) => {
    try {
      const response = await getData("categories/piecesinfos/"+ id);
      //console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
const getCategoryAndSubCategoryByPieceCode = async(code:string) => {
    try {
        const response = await getData("categories/search?pieceCode="+ code );
        //console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }

}
   

export { getCategoriesFromApi, getCategoryFromApi, getPiecesInfosApisBySubCategory, getCategoryAndSubCategoryByPieceCode, postCategory, patchCategory, deleteCategory };