export const BaseUrl: string =
  "https://apex.oracle.com/pls/apex/partharanjansarkar/restful";

export interface ApiParams {
  baseUrl: string;
  headers: any;
  method: string;
}

export type apiParamsProps = {
  url: string;
  data?: any;
};

export const getConfig: ApiParams = {
  baseUrl: BaseUrl,
  headers: {},
  method: "get",
};

export const postConfig: ApiParams = {
  baseUrl: BaseUrl,
  headers: {},
  method: "post",
};

export const getByIdConfig: ApiParams = {
  baseUrl: BaseUrl,
  headers: {},
  method: "get",
};

export const putByIdConfig: ApiParams = {
  baseUrl: BaseUrl,
  headers: {},
  method: "put",
};

export const deleteByIdConfig: ApiParams = {
  baseUrl: BaseUrl,
  headers: {},
  method: "delete",
};
