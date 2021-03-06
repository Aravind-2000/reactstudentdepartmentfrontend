import axios from "axios";

const GET_ALL_STUDENTS = "http://localhost:8080/students/getall";
const GET_STUD_BY_ID = "http://localhost:8080/students/get/";
const ADD_STUDENTS = "http://localhost:8080/students/add";
const DELETE_STUDENTS = "http://localhost:8080/students/delete/";
const GET_ALL_DEPTS = "http://localhost:8080/departments/getall";
const GET_DEPT_BY_ID = "http://localhost:8080/departments/get/";
const ADD_STUD_PROF = "http://localhost:8080/studentprofile/add";
const GET_PROF_BY_ID = "http://localhost:8080/studentprofile/get/";
const DELETE_STUD_PROF ="http://localhost:8080/studentprofile/delete/";
const GET_COURSES = "http://localhost:8080/courses/getall";
const ADD_COURSE = "http://localhost:8080/courses/add";
const GET_COURSE_BY_ID ="http://localhost:8080/courses/get/";
const REMOVE_STUDENT_FROM_COURSE = "http://localhost:8080/students/";
const ADD_STUD_TO_COURSE = "http://localhost:8080/students/";
const GET_ALL_BANK_ACCOUNTS = "http://localhost:8080/bankaccount/getall";
const ADD_BANK_ACCOUNT = "http://localhost:8080/bankaccount/add";
const GET_BANK_ACC_BY_ID = "http://localhost:8080/bankaccount/getall/";
const UPDATE_BANK_DETAILS = "http://localhost:8080/bankaccount/update/";


class StudentsApi {
    getStudents() {
        return axios.get(GET_ALL_STUDENTS);
    }
    getStudById(studentId){
        return axios.get(GET_STUD_BY_ID + studentId);
    }
    addStudents(students) {
        return axios.post(ADD_STUDENTS, students );
    }
    deleteStudentById(studentId) {
        return axios.delete(DELETE_STUDENTS + studentId);
    }
    getAllDepartments() {
        return axios.get(GET_ALL_DEPTS);
    }
    addStudProf(profile) {
        return axios.post(ADD_STUD_PROF, profile);
    }
    getStudProfById(studentId) {
        return axios.get(GET_PROF_BY_ID + studentId);
    }
    deleteStudProfById(studentId){
        return axios.delete(DELETE_STUD_PROF + studentId);
    }
    getDeptById(departmentId) {
        return axios.get(GET_DEPT_BY_ID + departmentId);
    }
    getCourses(){
        return axios.get(GET_COURSES);
    }
    addCourse(course){
        return axios.post(ADD_COURSE, course);
    }
    getCourseById(courseId){
        return axios.get(GET_COURSE_BY_ID + courseId);
    }
    removeStudentFromCourse(studentId, courseId){
        return axios.delete(REMOVE_STUDENT_FROM_COURSE + studentId + "/" + courseId);
    }
    addStudentToCourse(studentId, courseId){
        return axios.put(ADD_STUD_TO_COURSE + studentId + "/" + courseId);
    }
    getAllBankAccounts(){
        return axios.get(GET_ALL_BANK_ACCOUNTS);
    }
    addBankAccount(bankAccount){
        return axios.post(ADD_BANK_ACCOUNT, bankAccount);
    }
    getBankAccountById(bankId){
        return axios.get(GET_BANK_ACC_BY_ID + bankId);
    }
    updateBankAccountById(bankId, bankDetails){
        return axios.patch(UPDATE_BANK_DETAILS + bankId, bankDetails);
    }
}

export default new StudentsApi();