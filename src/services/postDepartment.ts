import { apiParamsProps } from "../types/servicesType";
import { postDepartmentApi } from "./departmentsApi";

const postDepartment = (url: string, bodyData: any, callBackFun: any) => {
  const postDepartmentArgs: apiParamsProps = {
    url: url,
    data: bodyData,
  };

  postDepartmentApi(postDepartmentArgs)
    .then((postDeptResponse) => {
      if (postDeptResponse.status === 200) callBackFun();
      else console.log("postDeptResponse !== 200", postDeptResponse);
    })
    .catch((postDeptError) => console.log(postDeptError));
};
export default postDepartment;
