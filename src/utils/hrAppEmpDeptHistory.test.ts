import employeesWithDepartmentHistory from "../utils/hrAppEmpDeptHistory";
import departmentsData from "../mockdata/departmentsData.json";
import employeesData from "../mockdata/employeesData.json";
describe("Test suites for hrAppDeptEmpHistory Utils", () => {
  test("Test script for departmentWithEmployeesHistory function", () => {
    const empsData = [employeesData.data.items[0]];
    const deptsData = [departmentsData.data.items[0]];
    const resultantData = [
      {
        uri: {
          $ref: "https://apex.oracle.com/pls/apex/partharanjansarkar/restful/employeesfeed/1451",
        },
        collection_id: 1451,
        employee_id: 7782,
        employee_name: "CLARK",
        job: "MANAGER",
        manager_id: 7839,
        hiredate: "1981-06-09T00:00:00Z",
        salary: 2450,
        commision: null,
        department_id: 10,
        history: [
          {
            collection_id: 200,
            department_id: 10,
            department_name: "ACCOUNTING",
            location: "NEW YORK",
          },
        ],
      },
    ];

    const result = employeesWithDepartmentHistory(empsData, deptsData);
    expect(result).toEqual(resultantData);
  });
});
