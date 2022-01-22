import React, { useState, useEffect } from "react";
import StudentServiceApi from "../Service/StudentServiceApi";
import { Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MainPage.css";

const ListDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [dept, setdept] = useState([]);



    useEffect(() => {
        getAllDepts();
    }, []);

    const getAllDepts = () => {
        StudentServiceApi.getAllDepartments()
            .then((res) => {
                setDepartments(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [viewStuds, setviewStuds] = useState(false);
    const viewOpen = (departments) => {
        StudentServiceApi.getDeptById(departments.deptId)
            .then((res) => {
                setdept(res.data.students);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setviewStuds(true);
    };

    const viewClose = () => setviewStuds(false);

    return (
        <div>
            <br /> <br /> <br /> <br /> <br />
            <div className="card card-sm card-md card-lg shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <Link to="/students">
                        <button className="btn" style={{color:"blueviolet"}}>
                            <i className="uis uis-arrow-circle-left"> </i> {" "}
                        </button>
                    </Link>
                    <br />
                    <br />

                    <table className="table table-borderless">
                        <thead className="tablehead">
                        <tr>
                            <td className="col"> <h4> Department ID </h4></td>
                            <td className="col"> <h4>Department Name </h4></td>
                            <td className="col"> <h4> Actions </h4> </td>
                        </tr>
                        </thead>

                        <tbody>
                        {departments.map((departments, index) => (
                            <tr key={index}>
                                <td> <h6> {departments.deptId} </h6> </td>
                                <td> <h6> {departments.deptName} </h6></td>
                                <td>
                                    <button
                                        className="btn"
                                        onClick={() => viewOpen(departments)}
                                        style={{marginLeft:20, color:"blueviolet"}}
                                    >
                                        <i className="uil uil-eye" onClick={() => viewOpen(departments)}
                                           style={{color:"blueviolet"}}></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Modal
                        show={viewStuds}
                        onHide={viewClose}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title> Students </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table table-borderless">
                                <thead className="tablehead">
                                <tr>
                                    <td className="col"> Student ID</td>
                                    <td className="col"> Student Name</td>
                                </tr>
                                </thead>

                                <tbody>
                                {dept.map((value, index) => (
                                    <tr key={index}>
                                        <td> {value.studentId} </td>
                                        <td> {value.studentName} </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer/>
                    </Modal>
                </div>{" "}
            </div>{" "}
        </div>
    );
};

export default ListDepartments;