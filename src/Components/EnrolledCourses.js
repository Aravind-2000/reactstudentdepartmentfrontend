import React,{useState, useEffect} from "react";
import StudentServiceApi from '../Service/StudentServiceApi';
import {Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import "./MainPage.css";

const EnrolledCourses = () => {


    useEffect(() => {
        getAllCourses();
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
            setcoursebyId(res.data);
            setenrolledStuds(res.data.enrolledStudents);
            console.log(res.data.enrolledStudents);
        })
            .catch((error) =>{
                console.log(error);
            })
    }


    // const [studId, setstudId] = useState();
    const [courses, setcourses] = useState([]);
    const [coursebyId, setcoursebyId] = useState();
    const [enrolledStuds, setenrolledStuds] = useState([]);
    const [viewstuds, setviewstuds] = useState(false);
    const showstuds = (courses) => {
        getCoursesById(courses);
        setviewstuds(true);
    };
    const hidestuds = () => setviewstuds(false);


    return (
        <div>
            <br/> <br/> <br/>
            <div className="card  card-sm card-md card-lg shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <Link to="/students">
                        <button className="btn" style={{color:"blueviolet"}}>
                            <i className="uis uis-arrow-circle-left"> </i> {" "}
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
                            <Modal.Title> Enrolled Students  </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table table-borderless">
                                <thead className="tablehead">
                                <tr>
                                    <td className="col"> <h5> Student Name </h5></td>
                                    <td className="col"> </td>
                                </tr>
                                </thead>
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
                </div>
            </div>
        </div>
    )
}

export default EnrolledCourses