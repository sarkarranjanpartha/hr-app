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

export const getDepartments = async (
  getDepartmentParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...getConfig,
    url: `${getConfig.baseUrl}/${getDepartmentParams.url}`,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const postDepartmentApi = async (
  postDepartmentParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...postConfig,
    url: `${postConfig.baseUrl}/${postDepartmentParams.url}`,
    data: postDepartmentParams.data,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const getDepartmentsById = async (
  getDepartmentsByIdParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...getByIdConfig,
    url: `${getByIdConfig.baseUrl}/${getDepartmentsByIdParams.url}`,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const putDepartmentsById = async (
  putDepartmentsByIdParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...putByIdConfig,
    url: `${putByIdConfig.baseUrl}/${putDepartmentsByIdParams.url}`,
    data: putDepartmentsByIdParams.data,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const deleteDepartmentsById = async (
  deleteDepartmentsByIdParams: apiParamsProps
): Promise<any> => {
  return await axios({
    ...deleteByIdConfig,
    url: `${deleteByIdConfig.baseUrl}/${deleteDepartmentsByIdParams.url}`,
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};
