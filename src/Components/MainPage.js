import React, { useState, useEffect } from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentsApi from "../Service/StudentServiceApi";
import {
    Button,
    Modal,
    Form,
    FloatingLabel,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import AddStudentForm from "./AddStudentForm";
import StudentServiceApi from "../Service/StudentServiceApi";
import "./MainPage.css";

const ListAllStudents = () => {
    const [students, setStudents] = useState([]);
    const [courses, setcourses] = useState([]);
    const [enrolledCourses, setenrolledCourses] = useState([]);
    const [courseid, setcourseid] = useState([]);
    const [profilebyId, setprofilebyId] = useState([]);
    const [bankDetails, setBankDetails] = useState();
    const [record, setRecord] = useState(" ");
    const [specific, setspecific] = useState(" ");

    const viewtooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            View Details
        </Tooltip>
    );

    const addcoursestooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Courses
        </Tooltip>
    );

    const deletetooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
    );

    const addtooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Add Student
        </Tooltip>
    );

    useEffect(() => {
        getAllStudents();
    }, []);

    const [add, setAdd] = useState(false);
    const handleAddShow = () => setAdd(true);
    const handleAddClose = () => setAdd(false);

    const profile = (students) =>{
        StudentServiceApi.getStudProfById(students.studentId)
            .then((res) => {
                setprofilebyId(res.data);
                setBankDetails(res.data.bankAccount);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [update, setUpdate] = useState(false);
    const handleUpdateShow = (students) => {
        setRecord(students);
        profile(students);
        setUpdate(true);
    };
    const handleUpdateClose = () => setUpdate(false);

    const [viewcourse, setviewcourse] = useState(false);
    const showcourse = (students) => {
        setspecific(students);
        StudentServiceApi.getStudById(students.studentId)
            .then((response) => {
                setenrolledCourses(response.data.courses);
            })
            .catch((error) => {
                console.log(error);
            });
        setviewcourse(true);
    }
    const hidecourse = () => {
        courseid.length = 0;
        setviewcourse(false);
    }

    const getAllStudents = () => {
        StudentsApi.getStudents()
            .then((response) => {
                setStudents(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        StudentsApi.getCourses()
            .then((respo) =>{
                setcourses(respo.data);
                console.log(respo.data);
            })
            .catch((error) =>{
                console.log(error);
            })
    };

    const editChange = (e) => {
        const { value, id } = e.target;
        setRecord({ ...record, [id]: value });
    };

    const editChange1 = (e) => {
        const { value, id } = e.target;
        setprofilebyId({ ...profilebyId, [id]: value });
    };

    const editChange2 = (e) => {
        const {value , id} = e.target;
        setBankDetails({...bankDetails, [id]: value});
    }

    const onEdit = () => {
        document.getElementById("edit").onclick = function () {
            document.getElementById("studentName").readOnly = false;
            document.getElementById("phoneNumber").readOnly = false;
            document.getElementById("gender").disabled = false;
            document.getElementById("departmentId").disabled = false;
            document.getElementById("country").readOnly = false;
            document.getElementById("state").readOnly = false;
            document.getElementById("city").readOnly = false;
            document.getElementById("pincode").readOnly = false;
            document.getElementById("addressLine1").readOnly = false;
            document.getElementById("addressLine2").readOnly = false;
            document.getElementById("bankName").readOnly = false;
            document.getElementById("bankBranch").readOnly = false;
            document.getElementById("accountHolderName").readOnly = false;
            document.getElementById("accountNumber").readOnly = false;
            document.getElementById("ifscNumber").readOnly = false;
            document.getElementById("accountType").disabled = false;
        };
    };

    const deletStudent = (studentId) => {
        StudentsApi.deleteStudentById(studentId)
            .then((respo) => {
                console.log(respo.data);
                getAllStudents();
            })
            .catch((error) => {
                console.log(error);
            })

    };

    const addstudent = (studid,course) =>{
        course.map((i) =>(
            StudentsApi.addStudentToCourse(studid,i).then((respo) =>{
                console.log(respo.data);
                toast.success('Course Added', { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
            })
                .catch((error) =>{
                    console.log(error);
                })
        ))
        courseid.length = 0;
    }

    const removeStudFromCourse = (coursebyid, enrolledstudid) => {
        StudentServiceApi.removeStudentFromCourse(coursebyid, enrolledstudid).then((respo) =>
        {
            console.log(respo.data);
            toast.error('Course Removed', { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
        })
            .catch((error) =>{
                console.log(error);
            })
    }

    const editFormSubmit = () => {
        new Promise((resolve, reject) => {
            fetch(`http://localhost:8080/students/update/${record.studentId}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(record),
            })
                .then((resp) => resp.json())
                .then((resp) => {
                    console.log(resp);
                    resolve();
                });
        });

        new Promise((resolve, reject) => {
            fetch(`http://localhost:8080/studentprofile/update/${record.studentId}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(profilebyId),
            })
                .then((resp) => resp.json())
                .then((resp) => {
                    console.log(resp);
                    resolve();
                });
        });

        StudentsApi.updateBankAccountById(profilebyId.bankId, bankDetails).then((response) => {
            console.log(response);
            window.location = "/";
        })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div>
            <br /> <br /> <br />
            <div className="card  card-sm card-md card-lg shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <p> </p>
                    <div className="container container-md container-sm">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 100, hide: 0 }}
                            overlay={addtooltip}
                        >
                            <button
                                onClick={handleAddShow}
                                className="btn "
                                data-toggle="modal"
                                style={{color:"blueviolet"}}
                            >
                                <i className="uil uil-user-plus"/>
                            </button>
                        </OverlayTrigger>
                        <p/>
                        <table className="table table-borderless">
                            <thead className="tablehead">
                            <tr>
                                <td className="col"> <h4 style={{fontFamily: 'Poppins'}}> Student ID </h4> </td>
                                <td className="col">  <h4 style={{fontFamily: 'Poppins'}}> Student Name</h4> </td>
                                <td className="col"> <h4 style={{fontFamily: 'Poppins'}}>  Department ID </h4> </td>
                                <td className="col"> <h4 style={{fontFamily: 'Poppins', marginLeft:50}}> Actions </h4> </td>
                            </tr>
                            </thead>

                            <tbody className="tablebody">
                            {students.map((students, index) => (
                                <tr key={index}>
                                    <td> <h6 style={{color:"blueviolet",fontFamily: 'Poppins', marginLeft:20 }}> {students.studentId} </h6></td>
                                    <td> <h6 style={{color:"blueviolet", fontFamily: 'Poppins'}}>{students.studentName}</h6> </td>
                                    <td> <h6 style={{color:"blueviolet", fontFamily: 'Poppins', marginLeft:60}}>{students.departmentId} </h6></td>
                                    <td>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 100, hide: 0 }}
                                            overlay={addcoursestooltip}
                                        >
                                            <button
                                                className="btn"
                                                onClick={() => showcourse(students)}
                                                style={{color:"blueviolet"}}
                                            >
                                                <i className="uil uil-book-open"/>
                                            </button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 100, hide: 0 }}
                                            overlay={viewtooltip}
                                        >
                                            <button
                                                className="btn"
                                                onClick={() => handleUpdateShow(students)}
                                                style={{color:"blueviolet" , marginLeft:25}}
                                            >
                                                <i className="uil uil-eye"/>
                                            </button>
                                        </OverlayTrigger>


                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 100, hide: 0 }}
                                            overlay={deletetooltip}
                                        >
                                            <button
                                                className="btn"
                                                onClick={() => deletStudent(students.studentId)}
                                                style={{color:"blueviolet" , marginLeft:25}}
                                            >
                                                <i className="uil uil-trash"/>
                                            </button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <Modal
                        show={add}
                        onHide={handleAddClose}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header style={{fontFamily:"Poppins"}} closeButton>
                            <Modal.Title > Add Students Details </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{fontFamily:"Poppins"}}>
                            <AddStudentForm />
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={viewcourse}
                        onHide={hidecourse}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header style={{fontFamily:"Poppins"}} closeButton>

                        </Modal.Header>
                        <Modal.Body style={{fontFamily:"Poppins"}}>
                            <p> Courses Available</p>
                            <Form className="container">
                                <Form.Group>
                                    {
                                        courses.map((value) => (
                                            <Form.Check
                                                type="checkbox"
                                                label={value.courseName}
                                                value={value.courseId}
                                                onChange={(e) => {
                                                    if(e.target.checked){
                                                        courseid.push(e.target.value);
                                                        setcourseid(courseid);
                                                    }
                                                }}
                                            />
                                        ))
                                    }
                                    <i className="uil uil-plus" style={{marginTop:20, cursor:"pointer"}}  onClick={() => addstudent(specific.studentId, courseid)} >  </i>
                                    <ToastContainer/>
                                </Form.Group>
                            </Form>
                            <br/> <br/>
                            <p> Enrolled Courses </p>
                            <div className="container">
                                <table className="table table-borderless">
                                    <tbody>
                                    {
                                        enrolledCourses.map((value, index) => (
                                            <tr key={index}>
                                                <td> {value.courseName} </td>
                                                <td> <i className="uil uil-trash" style={{color:"red", cursor:"pointer"}} onClick={() => removeStudFromCourse( specific.studentId,value.courseId)}  > </i> </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>




                    <Modal
                        show={update}
                        onHide={handleUpdateClose}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        size="lg"
                    >
                        <Modal.Header  style={{fontFamily:"Poppins"}} closeButton>
                            <Modal.Title>
                                {" "}
                                Student Profile{" "}
                                <Button
                                    id="edit"
                                    className="btn btn-light"
                                    onClick={() => onEdit()}
                                    style={{color:"blueviolet"}}
                                >
                                    {" "}
                                    <i className="uil uil-edit" onClick={() => onEdit()}/>
                                </Button>{" "}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{fontFamily:"Poppins"}}>
                            <Form>
                                <Form.Group>
                                    <FloatingLabel className="mb-3" label="Student ID">
                                        <Form.Control
                                            type="text"
                                            name="studentId"
                                            value={record.studentId}
                                            id="studentId"
                                            readOnly
                                            required
                                        />{" "}
                                    </FloatingLabel>

                                    <FloatingLabel className="mb-3" label="Student Name">
                                        <Form.Control
                                            type="text"
                                            name="studentName"
                                            value={record.studentName}
                                            id="studentName"
                                            onChange={(e) => editChange(e)}
                                            readOnly
                                            required
                                        />{" "}
                                    </FloatingLabel>

                                    <FloatingLabel className="mb-3" label="Department ID">
                                        <Form.Control
                                            as="select"
                                            type="text"
                                            name="departmentId"
                                            value={record.departmentId}
                                            id="departmentId"
                                            onChange={(e) => editChange(e)}
                                            disabled
                                        >
                                            <option value="104">
                                                104 - Computer Science and Engineering
                                            </option>
                                            <option value="105">
                                                105 - Electronics and Communication Engineering
                                            </option>
                                            <option value="106"> 106 - Bio - Technology </option>
                                        </Form.Control>
                                    </FloatingLabel>

                                    <div className="row">
                                        {/* <div className="col-sm" >
              <FloatingLabel className="mb-3">
                <Form.Control
                  type="text"
                  name="id"
                  value={profilebyId.id}
                  id="id"
                  readOnly
                  required
                />
              </FloatingLabel> </div> */}
                                        <div className="col-sm">
                                            <FloatingLabel
                                                className="mb-3"
                                                label="Phone Number "
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="phoneNumber"
                                                    id="phoneNumber"
                                                    value={profilebyId.phoneNumber}
                                                    onChange={(e) => editChange1(e)}
                                                    readOnly
                                                />
                                            </FloatingLabel>{" "}
                                        </div>
                                        <div className="col-sm">
                                            <FloatingLabel
                                                className="mb-3"
                                                label="Gender"
                                            >
                                                <Form.Control
                                                    as="select"
                                                    type="text"
                                                    name="gender"
                                                    id="gender"
                                                    value={profilebyId.gender}
                                                    onChange={(e) => editChange1(e)}
                                                    disabled
                                                >
                                                    <option value="MALE"> Male </option>
                                                    <option value="FEMALE"> Female </option>
                                                </Form.Control>
                                            </FloatingLabel>{" "}
                                        </div>{" "}
                                    </div>

                                    <FloatingLabel
                                        className="mb-3"
                                        label="Address Line 1 "
                                    >
                                        <Form.Control
                                            type="text"
                                            name="addressLine1"
                                            id="addressLine1"
                                            value={profilebyId.addressLine1}
                                            onChange={(e) => editChange1(e)}
                                            readOnly
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        className="mb-3"
                                        label="Address Line 2 "
                                    >
                                        <Form.Control
                                            type="text"
                                            name="addressLine2"
                                            id="addressLine2"
                                            value={profilebyId.addressLine2}
                                            onChange={(e) => editChange1(e)}
                                            readOnly
                                        />
                                    </FloatingLabel>

                                    <div className="row">
                                        <div className="col-sm">
                                            <FloatingLabel
                                                className="mb-3"
                                                label="City"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    value={profilebyId.city}
                                                    onChange={(e) => editChange1(e)}
                                                    readOnly
                                                />
                                            </FloatingLabel>
                                        </div>
                                        <div className="col-sm">
                                            <FloatingLabel
                                                className="mb-3"
                                                label="State"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    value={profilebyId.state}
                                                    onChange={(e) => editChange1(e)}
                                                    readOnly
                                                />
                                            </FloatingLabel>{" "}
                                        </div>{" "}
                                    </div>

                                    <div className="row">
                                        <div className="col-sm">
                                            <FloatingLabel
                                                className="mb-3"
                                                label=" PinCode"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="pincode"
                                                    id="pincode"
                                                    value={profilebyId.pincode}
                                                    onChange={(e) => editChange1(e)}
                                                    readOnly
                                                />
                                            </FloatingLabel>
                                        </div>
                                        <div className="col-sm">
                                            <FloatingLabel
                                                className="mb-3"
                                                label="Country"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="country"
                                                    id="country"
                                                    value={profilebyId.country}
                                                    onChange={(e) => editChange1(e)}
                                                    readOnly
                                                />
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                    <p> Bank Details </p>
                                    <div className="row">
                                        <div className="col">
                                    <FloatingLabel
                                        className="mb-3"
                                        label="Bank ID"
                                        >
                                        <Form.Control
                                            type="text"
                                            name="bankId"
                                            id="bankId"
                                            value={bankDetails?.bankId}
                                            onChange={(e) => editChange2(e)}
                                            readOnly
                                        />
                                    </FloatingLabel></div>
                                        <div className="col">
                                    <FloatingLabel
                                        className="mb-3"
                                        label="Bank Name"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="bankName"
                                            id="bankName"
                                            value={bankDetails?.bankName}
                                            onChange={(e) => editChange2(e)}
                                            readOnly
                                        />
                                    </FloatingLabel></div>
                                        <div className="col">
                                    <FloatingLabel
                                        className="mb-3"
                                        label="Bank Branch"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="bankBranch"
                                            id="bankBranch"
                                            value={bankDetails?.bankBranch}
                                            onChange={(e) => editChange2(e)}
                                            readOnly
                                        />
                                    </FloatingLabel></div> </div>

                                    <div className="row">
                                        <div className="col">
                                    <FloatingLabel
                                        className="mb-3"
                                        label="Account Number"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="accountNumber"
                                            id="accountNumber"
                                            value={bankDetails?.accountNumber}
                                            onChange={(e) => editChange2(e)}
                                            readOnly
                                        />
                                    </FloatingLabel></div>

                                        <div className="col">
                                    <FloatingLabel
                                        className="mb-3"
                                        label="IFSC Code"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="ifscNumber"
                                            id="ifscNumber"
                                            value={bankDetails?.ifscNumber}
                                            onChange={(e) => editChange2(e)}
                                            readOnly
                                        />
                                    </FloatingLabel> </div> </div>

                                    <FloatingLabel
                                        className="mb-3"
                                        label="Account Holder Name"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="accountHolderName"
                                            id="accountHolderName"
                                            value={bankDetails?.accountHolderName}
                                            onChange={(e) => editChange2(e)}
                                            readOnly
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        className="mb-3"
                                        label="Account Type"
                                    >
                                        <Form.Control
                                            as = "select"
                                            type="text"
                                            name="accountType"
                                            id="accountType"
                                            value={bankDetails?.accountType}
                                            onChange={(e) => editChange2(e)}
                                            disabled
                                        >
                                            <option> </option>
                                            <option value="SAVINGS"> Savings </option>
                                            <option value="CURRENT"> Current </option>
                                        </Form.Control>
                                    </FloatingLabel>
                                </Form.Group>
                                <Button
                                    variant="success"
                                    type="submit"
                                    id="savebtn"
                                    onClick={(e) => editFormSubmit(e)}
                                    data-toggle="modal"
                                    block
                                >
                                    Save
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>{" "}
            </div>{" "}
        </div>
    );
};

export default ListAllStudents;