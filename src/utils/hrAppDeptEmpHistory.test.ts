import departmentWithEmployeesHistory from "../utils/hrAppDeptEmpHistory";
import departmentsData from "../mockdata/departmentsData.json";
import employeesData from "../mockdata/employeesData.json";
describe("Test suites for hrAppDeptEmpHistory Utils", () => {
  test("Test script for departmentWithEmployeesHistory function", () => {
    const empsData = [employeesData.data.items[0]];
    const deptsData = [departmentsData.data.items[0]];
    const resultantData = [
      {
        collection_id: 200,
        department_id: 10,
        department_name: "ACCOUNTING",
        location: "NEW YORK",
        history: [
          {
            uri: {
              $ref: "https://apex.oracle.com/pls/apex/partharanjansarkar/restful/employeesfeed/1707",
            },
            collection_id: 1707,
            employee_id: 7369,
            employee_name: "ASHISH",
            job: "CLERK",
            manager_id: 7902,
            hiredate: "1980-12-17T00:00:00Z",
            salary: 800,
            commision: null,
            department_id: 10,
            media_type: "image/jpeg",
            media_title: "Bagmane.jpg",
            media_url:
              "https://apex.oracle.com/pls/apex/partharanjansarkar/image/media/1707",
          },
        ],
      },
    ];

    const result = departmentWithEmployeesHistory(empsData, deptsData);
    expect(result).toEqual(resultantData);
  });
});
