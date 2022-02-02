import React,{useState, useEffect} from "react";
import StudentServiceApi from '../Service/StudentServiceApi';
import {Form, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import "./MainPage.css";
import StudentsApi from "../Service/StudentServiceApi";
import AddCourse from "./AddCourse";

const EnrolledCourses = () => {


    useEffect(() => {
        getAllCourses();
        StudentServiceApi.getStudents()
            .then((res) => {
                setStudents(res.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    const getAllCourses = () =>
    {
        StudentServiceApi.getCourses().then((response) =>
        {
            setcourses(response.data);
            console.log(response.data);
        })
            .catch((error) => {
                console.log(error);
            })
    }

    const getCoursesById = (courses) =>{
        StudentServiceApi.getCourseById(courses.courseId).then((res) =>
        {
            setenrolledStuds(res.data.enrolledStudents);
            console.log(res.data.enrolledStudents);
        })
            .catch((error) =>{
                console.log(error);
            })
    }


    // const [studId, setstudId] = useState();
    const [courses, setcourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [enrolledStuds, setenrolledStuds] = useState([]);
    const [viewstuds, setviewstuds] = useState(false);
    const showstuds = (courses) => {
        getCoursesById(courses);
        setSpecific(courses);
        setviewstuds(true);
    };
    const hidestuds = () => {
        transferStuds.length = 0;
        setviewstuds(false);
    }
    const [add, setAdd] = useState(false);
    const ShowAdd = () => setAdd(true);
    const HideAdd = () => setAdd(false);
    const [transferStuds, setTransferStuds] = useState([]);
    const [specific, setSpecific] = useState(" ");

    const addstud = (studids,course) =>{
        studids.map((i) =>(
            StudentsApi.addStudentToCourse(i,course).then((respo) =>{
                console.log(respo.data);
            })
                .catch((error) =>{
                    console.log(error);
                })
        ))
        transferStuds.length = 0;
    }

    return (
        <div>
            <br/> <br/> <br/>
            <div className="card  card-sm card-md card-lg shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <button
                        onClick={ShowAdd}
                        className="btn "
                        data-toggle="modal"
                        style={{color:"blueviolet", marginRight:20}}
                    >
                        <i className="uil uil-user-plus"/>
                    </button>

                    <Link to="/students">
                        <button className="btn" style={{color:"blueviolet"}}>
                            <i className="uis uis-arrow-circle-left"> </i>
                        </button>
                    </Link>
                    <br/> <br/>
                    <table className="table table-borderless">
                        <thead className="tablehead">
                        <tr>
                            <td className="col"> <h4 >Course Name</h4> </td>
                            <td className="col"> <h4 >Course Fee (In Rupees)</h4> </td>
                            <td className="col"> <h4 > Course Duration </h4> </td>
                            <td className="col"> <h4> Enrolled Students </h4> </td>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            courses.map((courses, index) =>(
                                <tr key={index}>
                                    <td className="col"> <h6 > {courses.courseName} </h6> </td>
                                    <td className="col"> <h6 style={{marginLeft:75}}> {courses.courseFee} </h6> </td>
                                    <td className="col"> <h6 style={{marginLeft:50}}>{courses.months} Months </h6> </td>
                                    <td>
                                        <Tooltip placement="right"  title="View Enrolled Students">
                                            <button
                                                className="btn"
                                                style={{color:"blueviolet", marginLeft:30}}
                                                onClick={() => showstuds(courses)}
                                            >
                                                <i className="uil uil-eye"/>
                                            </button></Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal
                        show={viewstuds}
                        onHide={hidestuds}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Form className="container">
                                    <Form.Group>
                                        {
                                            students.map((value) => (
                                                <Form.Check
                                                    type="checkbox"
                                                    label={value.studentName}
                                                    value={value.studentId}
                                                    onChange={(e) => {
                                                        if(e.target.checked){
                                                            transferStuds.push(e.target.value);
                                                            setTransferStuds(transferStuds);
                                                        }
                                                        else if(!e.target.checked){
                                                            transferStuds.pop();
                                                        }
                                                    }}
                                                />
                                            ))
                                        }
                                    </Form.Group>
                                    <i
                                        className="uil uil-plus"
                                        onClick={(e) => addstud(transferStuds, specific.courseId) }
                                        style={{marginTop:50, cursor:"pointer"}}
                                    />
                                </Form>
                            </div>

                            <br/> <br/>
                            <p> Students Enrolled</p>
                            <table className="table table-borderless">
                                <tbody>
                                {enrolledStuds.map((value,index) => (
                                    <tr key={index}>
                                        <td> {value} </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer/>
                    </Modal>

                    <Modal
                        show={add}
                        onHide={HideAdd}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title> Add Course</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddCourse/>
                        </Modal.Body>
                    </Modal>


                </div>
            </div>
        </div>
    )
}

export default EnrolledCourses