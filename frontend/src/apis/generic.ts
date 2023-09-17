import axios from "axios";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import store from "../store";

export const toastOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  rtl: false,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: true,
};

const getData = async (
  uri: string,
  setData?: React.Dispatch<React.SetStateAction<any>>
) => {
  const config = {
    headers: { Authorization: `Bearer ${store.getState().token.value}` }
  };
  const link = "http://localhost:3001/" + uri;
  try {
    let response = await axios
      .get(link, config)
      .then((res ) => res)
      .catch((err ) => {
        throw Error(err);
      });
    setData && setData(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const postData = async (uri: string, data: any) => {
  console.log(store.getState());

  const config = {
    headers: { Authorization: `Bearer ${store.getState().token.value}` }
  };
  const toastId = toast.loading("Votre message est en cours d'envoi!");
  const link = "http://localhost:3001/" + uri;
  try {
    await axios.post(link, data, config);
    console.log(toastId)
    toast.update(toastId, {
      ...toastOptions,
      render: "Une nouvelle donnée a été ajoutée!",
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

const patchData = async (uri: string, data: any) => {
  const config = {
    headers: { Authorization: `Bearer ${store.getState().token.value}` }
  };
  const toastId = toast.loading("Votre message est en cours d'envoi!");
  const link = "http://localhost:3001/" + uri;
  try {
    await axios.patch(link, data, config);
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

const deleteData = async (uri: string, id: string | Number) => {
  const config = {
    headers: { Authorization: `Bearer ${store.getState().token.value}` }
  };
  const toastId = toast.loading("Votre message est en cours d'envoi!");
  const link = "http://localhost:3001/" + uri + id .toString();
  try {
    await axios.delete(link, config);
    toast.update(toastId, {
      ...toastOptions,
      render: "La donnée a été supprimée avec succées!",
      type: "success",
      isLoading: false,
    });
  } catch (error : any ) {
    toast.update(toastId, {
      ...toastOptions,
      render: 'Une erreur est survenue, veuillez réessayer',
      type: "error",
      isLoading: false,
    });
  }
};

const handleChange = (
  e: FormEvent<HTMLFormElement>,
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
  const { name, value } = e.target as HTMLInputElement;
  setFormData({ ...formData, [name]: value });
};

export { getData, postData, patchData, deleteData, handleChange };
