import { toast } from "react-toastify";
import { deleteData, getData, patchData, postData, toastOptions } from "./generic";

const getProvidersFromApi = async (active: string, page?: number) => {
  try {
    let data = await getData("providers?active=" + active + "&page=" + page);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProviderByIdFromApi = async (id: string) => {
  try {
    let data = await getData("providers/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProviderDeleted = async (id: string) => {
  try {
    let data = await getData("providers/all/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postProvider = async (data: any) => {
  try {
    postData("providers/add", data);
  } catch (error) {
    console.log(error);
  }
};

const patchProvider = async (id: string, data: any) => {
  patchData("providers/update/" + id, data);
};

const deleteProvider = async (id: string) => {
  deleteData("providers/delete/", id);
};

const restoreProvider = async (id: string) => {
  const toastId = toast.loading("Votre message est en cours d'envoi!");;
  try {
    await getData("providers/restore/" + id);
    toast.update(toastId, {
      ...toastOptions,
      render: "La donnée a été modifiée avec succées!",
      type: "success",
      isLoading: false,
    });
  } catch (error) {
    toast.update(toastId, {
      ...toastOptions,
      render: 'Une erreur est survenue, veuillez réesséyer',
      type: "error",
      isLoading: false,
    });
  }
};

export {
  getProvidersFromApi,
  getProviderByIdFromApi,
  postProvider,
  patchProvider,
  deleteProvider,
  restoreProvider,
  getProviderDeleted,
};
