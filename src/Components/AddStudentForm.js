import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import StudentsApi from "../Service/StudentServiceApi";

const AddStudentForm = () => {
    const [studentId, setStudentId] = useState();
    const [studentName, setStudentName] = useState(" ");
    const [departmentId, setDepartmentId] = useState();
    const [id, setid] = useState();
    const [phoneNumber, setphoneNumber] = useState();
    const [gender, setgender] = useState(" ");
    const [addressLine1, setaddressLine1] = useState(" ")
    const [addressLine2, setaddressLine2] = useState(" ")
    const [city, setcity] = useState(" ");
    const [state, setstate] = useState(" ");
    const [pincode, setpincode] = useState();
    const [country, setcountry] = useState(" ");


    const saveStudent = () => {
        const students = { studentId, studentName, departmentId };
        const profile = {id, phoneNumber, gender, addressLine1, addressLine2, city, state, pincode, country};

        StudentsApi.addStudents(students)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        StudentsApi.addStudProf(profile)
            .then((res) => {
                console.log(res.data);
                window.location = "/"
            })
            .catch((error) => {console.log(error)
            })
    }

    const idChange = (e) => {
        setStudentId(e.target.value);
        setid(e.target.value);
    }

    return (
        <div>
            <Form className=" container">
                <Form.Group>
                    <div className="row">
                        <div className="col-sm">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label=" Student Id"
                            >
                                <Form.Control
                                    type="text"
                                    name="studentId"
                                    value={studentId}
                                    onChange={(e) => idChange(e)}
                                    required
                                />
                            </FloatingLabel> </div>


                        {/* <div className="col-sm">
          <FloatingLabel
            controlId="floatingInput"
            className="mb-3"
            label=" Student Id "
          >
            <Form.Control
              type="text"
              name="id"
              placeholder=""
              id="id"
              value={studentId}
              onChange={(e) => idChange(e)}
              onSet
              required
            />
          </FloatingLabel> </div>  */}
                    </div>


                    <FloatingLabel
                        controlId="floatingInput"
                        className="mb-3"
                        label=" Student Name"
                    >
                        <Form.Control
                            type="text"
                            name="studentName"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </FloatingLabel>


                    <div className="row">
                        <div className="col-sm" >
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label=" Department Id"
                            >
                                <Form.Control
                                    as={"select"}
                                    type="text"
                                    name="departmentId"
                                    value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                    required
                                >
                                    <option> </option>
                                    <option value="104">
                                        104 - Computer Science and Engineering
                                    </option>
                                    <option value="105">
                                        105 - Electronics and Communication Engineering
                                    </option>
                                    <option value="106"> 106 - Bio - Technology </option>
                                </Form.Control>
                            </FloatingLabel>  </div>

                        <div className="col-sm" >
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="Phone Number "
                            >
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setphoneNumber(e.target.value)}
                                    required
                                />
                            </FloatingLabel> </div> </div>

                    <FloatingLabel
                        controlId="floatingInput"
                        className="mb-3"
                        label="Gender"
                    >
                        <Form.Control
                            as={"select"}
                            type="text"
                            name="gender"
                            value={gender}
                            onChange={(e) => setgender(e.target.value)}
                            required
                        >
                            <option> </option>
                            <option value="MALE" > Male </option>
                            <option value="FEMALE" > Female </option> </Form.Control>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        className="mb-3"
                        label="Address Line 1 "
                    >
                        <Form.Control
                            type="text"
                            name="addressLine1"
                            value={addressLine1}
                            onChange={(e) => setaddressLine1(e.target.value)}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        className="mb-3"
                        label="Address Line 2 "
                    >
                        <Form.Control
                            type="text"
                            name="addressLine2"
                            value={addressLine2}
                            onChange={(e) => setaddressLine2(e.target.value)}
                            required
                        />
                    </FloatingLabel>


                    <div className="row">
                        <div className="col-sm">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="City"
                            >
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={city}
                                    onChange={(e) => setcity(e.target.value)}
                                    required
                                />
                            </FloatingLabel></div>

                        <div className="col-sm">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="State"
                            >
                                <Form.Control
                                    type="text"
                                    name="state"
                                    value={state}
                                    onChange={(e) => setstate(e.target.value)}
                                    required
                                />
                            </FloatingLabel> </div> </div>


                    <div className="row">
                        <div className="col-sm">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label=" PinCode"
                            >
                                <Form.Control
                                    type="text"
                                    name="pincode"
                                    value={pincode}
                                    onChange={(e) => setpincode(e.target.value)}
                                    required
                                />
                            </FloatingLabel></div>

                        <div className="col-sm">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="Country"
                            >
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={country}
                                    onChange={(e) => setcountry(e.target.value)}
                                    required
                                />
                            </FloatingLabel></div> </div>

                </Form.Group>
                <Button
                    variant="success"
                    type="submit"
                    onClick={(e) => saveStudent(e)}
                    data-toggle="modal"
                    block
                >
                    {" "}
                    Save{" "}
                </Button>
            </Form>
        </div>
    );
};

export default AddStudentForm;