import { deleteData, getData, patchData, postData } from "./generic"

//Get all cars
const getCarsFromApi = async (page?: number) => {
    try {
      let data = await getData("cars?page=" + page)
    return data
    } catch (error) {
        console.log(error);
    }
};

//Get car by id
const getCarByIdFromApi = async (id: string) => {
    try {
        let data = await getData("cars/" + id)
        return data
    } catch (error) {
        console.log(error);
    }
};

//Get the available brands for cars
const getCarBrands = async () => {
    try {
        let data = await getData("cars/brands")
        return data
    } catch (error) {
        console.log(error);
    }
};


//Get the available models for a brand
const getCarModels = async (brand: string) => {
    try {
        let data = await getData("cars/models?brand=" + brand)
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }
};

//Get the available motorizations for a brand and model
const getCarMotorization = async (brand: string, model: string) => {
    try {
        let data = await getData("cars/motorization?brand=" + brand + "&model=" + model)
        return data
    } catch (error) {
        console.log(error);
    }
};
const getCarByCode = async (carCode: string) => {
    try {
        let data = await getData("cars/code?code=" + carCode)
        return data
    } catch (error) {
        console.log(error);
    }
};
const getCodeByCar = async (brand:string, model:string, motorization:string) => {
    try {
        let data = await getData("cars/searchbycar?brand=" + brand + "&model="+ model + "&motorization="+ motorization)
        return data
    } catch (error) {
        console.log(error);
    }
}
const postCar = async (data: any) => {
    try {
        postData("cars/add", data);
    } catch (error) {
        console.log(error);
    }
};

const patchCar = async (id: string, data: any) => {
    patchData("cars/edit/" + id, data);
}

const deleteCar = async (id: string) => {
    console.log(id);
    deleteData("cars/delete/", id)
}

export { getCarsFromApi, getCarByIdFromApi, getCarBrands, getCarModels, getCarMotorization, getCarByCode, getCodeByCar, postCar, patchCar, deleteCar };