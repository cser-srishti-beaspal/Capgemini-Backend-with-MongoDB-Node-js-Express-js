### **------------------PROJECTION ASSIGNMNET QUESTIONS:--------------------**

## **1. WRITE A QUERY TO DISPLAY ALL THE DETAILS FROM THE EMPLOYEE TABLE** 
db.emp.find({})
## **2. WAQTD NAME, MGR OF ALL THE EMPLOYEES**
db.emp.find({}, { _id:0, ename:1, mgr:1 })
## **3. WAQTD NAME AND SALARY GIVEN TO ALL THE EMPLOYEES**
db.emp.find({}, { _id:0, ename:1, sal:1 })
## **4. WAQTD NAME AND COMMISSION GIVEN TO ALL THE EMPLOYEES**
db.emp.find({}, { _id:0, ename:1, comm:1 })
## **5. WAQTD EMPLOYEE ID AND DEPARTMENT NUMBER OF ALL THE EMPLOYEES IN EMP TABLE**
db.emp.find({}, { _id:0, empno:1, deptno:1 })
## **6. WAQTD ENAME AND HIREDATE OF ALL THE EMPLOYEES**
db.emp.find({}, { _id:0, ename:1, hiredate:1 })
## **7. WAQTD NAME AND DESIGNATION OF ALL THE EMPLOYEES**
db.emp.find({}, { _id:0, ename:1, job:1 })
## **8. WAQTD NAME, JOB AND SALARY GIVEN TO ALL THE EMPLOYEES**
db.emp.find({}, { _id:0, ename:1, job:1, sal:1 })
## **9. WAQTD DNAMES PRESENT IN DEPARTMENT TABLE**
db.dept.find({}, { _id:0, dname:1 })
## **10. WAQTD DNAME AND LOCATION PRESENT IN DEPT TABLE.**
db.dept.find({}, { _id:0, dname:1, loc:1 })


### **------------------ASSIGNMENT QUESTIONS ON SINGLE FILTER CONDITION ------------------:**

## **1.WAQTD THE SALARY OF THE EMPLOYEE WHOS NAME IS  SMITH**
db.emp.find({ ename:"smith" }, { _id:0, sal:1 })
## **2.WAQTD NAME OF THE EMPLOYEES WORKING AS CLERK**
db.emp.find({ job:"clerk" }, { _id:0, ename:1 })
## **3.WAQTD SALARY OF THE EMPLOYEES WHO ARE WORKING AS SALESMAN**
db.emp.find({ job:"salesman" }, { _id:0, sal:1 })
## **4.WAQTD DETAILS OF THE EMP WHO EARNS  2000**
db.emp.find({ sal:2000 })
## **5.WAQTD DETAILS OF THE EMP WHOS NAME IS JONES**
db.emp.find({ ename:"jones" })
## **6.WAQTD DETAILS OF EMPLOYEES WORKING AS AN N ANALYST**
db.emp.find({ job:"analyst" })
## **7.WAQTD NAME AND SAL ALONG WITH HIS ANNUAL SALARY IF THE  SALARY IS 1250**
db.emp.aggregate([
  { $match: { sal:1250 } },
  { $project: {
      _id:0,
      ename:1,
      sal:1,
      annualSalary: { $multiply:["$sal",12] }
  }}
])
## **8.WAQTD EMPNO OF THE EMPLOYEES WHO ARE WORKING IN DEPT    30** 
db.emp.find({ deptno:30 }, { _id:0, empno:1 })
## **9.WAQTD DETAILS OF THE EMPLOYEES WORKING AS MANAGER**
db.emp.find({ job:"manager" })
## **10.WAQTD NAME AND SALARY GIVEN TO AN EMPLOYEE IF EMPLOYEE EARNS A COMMISSION OF RUPEES 1400 .**
db.emp.find({ comm:1400 }, { _id:0, ename:1, sal:1 })