import axios from "axios";
import {
  apiParamsProps,
  deleteByIdConfig,
  getByIdConfig,
  getConfig,
  postConfig,
  putByIdConfig,
} from "../types/servicesType";
// https://dev.to/tuasegun/cleaner-and-better-way-for-calling-apis-with-axios-in-your-react-typescript-applications-3d3k
// https://medium.com/@diegogauna.developer/restful-api-using-typescript-and-react-hooks-3d99bdd0cd39

export const getEmployees = async (
  getEmployeeParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...getConfig,
    url: `${getConfig.baseUrl}/${getEmployeeParams.url}`,
  })
    .then((response) => {
      // console.log("getEmployees response", response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      // console.log("getEmployees error", error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const postEmployees = async (
  postEmployeeParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...getConfig,
    url: `${postConfig.baseUrl}/${postEmployeeParams.url}`,
  })
    .then((response) => {
      // console.log("getEmployees response", response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      // console.log("getEmployees error", error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const getEmployeesById = async (
  getEmployeesByIdParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...getByIdConfig,
    url: `${getByIdConfig.baseUrl}/${getEmployeesByIdParams.url}`,
  })
    .then((response) => {
      // console.log("getEmployees response", response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      // console.log("getEmployees error", error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const putEmployeesById = async (
  putEmployeesByIdParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...putByIdConfig,
    url: `${putByIdConfig.baseUrl}/${putEmployeesByIdParams.url}`,
  })
    .then((response) => {
      // console.log("getEmployees response", response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      // console.log("getEmployees error", error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const deleteEmployeesById = async (
  deleteEmployeesByIdParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...deleteByIdConfig,
    url: `${deleteByIdConfig.baseUrl}/${deleteEmployeesByIdParams.url}`,
  })
    .then((response) => {
      // console.log("getEmployees response", response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      // console.log("getEmployees error", error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};
