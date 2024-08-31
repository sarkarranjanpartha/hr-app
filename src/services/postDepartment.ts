import { apiParamsProps } from "../types/servicesType";
import { postDepartmentApi } from "./departmentsApi";

const postDepartment = (url: string, bodyData: any) => {
  const postDepartmentArgs: apiParamsProps = {
    url: url,
    data: bodyData,
  };

  postDepartmentApi(postDepartmentArgs)
    .then((postDeptResponse) => {
      return postDeptResponse;
    })
    .catch((postDeptError) => console.log(postDeptError));
};
export default postDepartment;
