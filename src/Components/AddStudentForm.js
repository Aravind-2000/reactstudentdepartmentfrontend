import React, {useState} from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import StudentsApi from "../Service/StudentServiceApi";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AddStudentForm = () => {
    const [studentId, setStudentId] = useState("");
    const [studentName, setStudentName] = useState(" ");
    const [departmentId, setDepartmentId] = useState();
    const [id, setid] = useState();
    const [phoneNumber, setphoneNumber] = useState();
    const [gender, setgender] = useState(" ");
    const [addressLine1, setaddressLine1] = useState(" ")
    const [addressLine2, setaddressLine2] = useState(" ")
    const [city, setcity] = useState(" ");
    const [state, setstate] = useState(" ");
    const [pincode, setpincode] = useState("");
    const [country, setcountry] = useState(" ");
    const [bankId, setBankId] = useState();
    const [bankName, setBankName] = useState("");
    const [bankBranch, setBankBranch] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscNumber, setIfscNumber] = useState("");
    const [accountType, setAccountType] = useState("");

    const saveStudent = () => {
        const students = { studentId, studentName, departmentId };
        const profile = {id, phoneNumber, gender, addressLine1, addressLine2, city, state, pincode, country};
        const bankDetails = {bankId, bankName, bankBranch, accountHolderName, accountNumber, ifscNumber, accountType};

        StudentsApi.addStudents(students)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        StudentsApi.addBankAccount(bankDetails)
            .then((respo) => {
                console.log(respo.data);
            })
            .catch((error) => {
                console.log(error);
            })

        StudentsApi.addStudProf(profile)
            .then((res) => {
                console.log(res.data);
                window.location = "/";
            })
            .catch((error) => {console.log(error)
            })
        toast.success("Student Profile Created");
    }

    const idChange = (e) => {
        setStudentId(e.target.value);
        setid(e.target.value);
        setBankId(e.target.value);
    }

    return (
        <div>
            <Form className=" container" onSubmit={() => saveStudent()}>
                <Form.Group>
                    <div className="row">
                        <div className="col-sm">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label=" Student Id"
                            >
                                <Form.Control
                                    type="number"
                                    name="studentId"
                                    placeholder="studentId"
                                    onChange={(e) => idChange(e)}
                                    required
                                />
                            </FloatingLabel> </div>

                    <div className="col">
                    <FloatingLabel
                        controlId="floatingInput"
                        className="mb-3"
                        label=" Student Name"
                    >
                        <Form.Control
                            type="text"
                            name="studentName"
                            placeholder={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </FloatingLabel></div>



                        <div className="col" >
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label=" Department Id"
                            >
                                <Form.Control
                                    as={"select"}
                                    type="text"
                                    name="departmentId"
                                    placeholder="departmentId"
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                    required
                                >
                                    <option> </option>
                                    <option value="104">
                                        104 - Computer Science
                                    </option>
                                    <option value="105">
                                        105 - Electronics and Communication
                                    </option>
                                    <option value="106"> 106 - Bio - Technology </option>
                                </Form.Control>
                            </FloatingLabel>  </div> </div>

                    <div className="row">
                        <div className="col-sm" >
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="Phone Number "
                            >
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    placeholder={phoneNumber}
                                    onChange={(e) => setphoneNumber(e.target.value)}
                                    required
                                />
                            </FloatingLabel> </div>

                    <div className="col-sm" >
                        <div className="row">
                            <FormControl>
                            <FormLabel style={{fontFamily: "Poppins"}}>Gender</FormLabel>
                            <RadioGroup
                                row
                                value={gender}
                                onChange={(e) => setgender(e.target.value) }
                            >
                                <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                                <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl> </div> </div> </div>

                    <div className="row">
                        <div className="col">
                    <FloatingLabel
                        controlId="floatingInput"
                        className="mb-3"
                        label="Address Line 1 "
                    >
                        <Form.Control
                            type="text"
                            name="addressLine1"
                            placeholder={addressLine1}
                            onChange={(e) => setaddressLine1(e.target.value)}
                            required
                        />
                    </FloatingLabel> </div>

                        <div className="col">
                    <FloatingLabel
                        controlId="floatingInput"
                        className="mb-3"
                        label="Address Line 2 "
                    >
                        <Form.Control
                            type="text"
                            name="addressLine2"
                            placeholder={addressLine2}
                            onChange={(e) => setaddressLine2(e.target.value)}
                            required
                        />
                    </FloatingLabel></div> </div>


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
                                    placeholder={city}
                                    onChange={(e) => setcity(e.target.value)}
                                    required
                                />
                            </FloatingLabel></div>

                        <div className="col-sm">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="State"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="State" id="state"   onChange={(e) => setstate(e.target.value) } required />
                        </FloatingLabel> </div> </div>
                    <div className="row">
                        <div className="col-sm">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="PinCode"
                            >
                                <Form.Control
                                    type="text"
                                    name="pincode"
                                    placeholder={pincode}
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
                                    placeholder={country}
                                    onChange={(e) => setcountry(e.target.value)}
                                    required
                                />
                            </FloatingLabel></div> </div>

                    <p> Bank Details </p>
                    <div className="row">
                        <div className="col">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="Bank Name"
                            >
                                <Form.Control
                                    type="text"
                                    name="bankName"
                                    id="bankName"
                                    placeholder={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    required
                                />
                            </FloatingLabel></div>
                        <div className="col">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="Bank Branch"
                            >
                                <Form.Control
                                    type="text"
                                    name="bankBranch"
                                    id="bankBranch"
                                    placeholder={bankBranch}
                                    onChange={(e) => setBankBranch(e.target.value)}
                                    required
                                />
                            </FloatingLabel></div> </div>

                    <div className="row">
                        <div className="col">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="Account Number"
                            >
                                <Form.Control
                                    type="text"
                                    name="accountNumber"
                                    id="accountNumber"
                                    placeholder={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    required

                                />
                            </FloatingLabel></div>

                        <div className="col">
                            <FloatingLabel
                                controlId="floatingInput"
                                className="mb-3"
                                label="IFSC Code"
                            >
                                <Form.Control
                                    type="text"
                                    name="ifscNumber"
                                    id="ifscNumber"
                                    placeholder={ifscNumber}
                                    onChange={(e) => setIfscNumber(e.target.value)}
                                    required

                                />
                            </FloatingLabel> </div> </div>

                    <FloatingLabel
                        controlId="floatingInput"
                        className="mb-3"
                        label="Account Holder Name"
                    >
                        <Form.Control
                            type="text"
                            name="accountHolderName"
                            id={accountHolderName}
                            placeholder={accountHolderName}
                            onChange={(e) => setAccountHolderName(e.target.value)}
                            required
                        />
                    </FloatingLabel>

                    <FormControl>
                        <FormLabel style={{fontFamily: "Poppins"}}>Account Type</FormLabel>
                        <RadioGroup
                            row
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value) }
                            required
                        >
                            <FormControlLabel value="SAVINGS" control={<Radio />} label="Savings" />
                            <FormControlLabel value="CURRENT" control={<Radio />} label="Current" />
                        </RadioGroup>
                    </FormControl>


                </Form.Group>
                <Button
                    variant="success"
                    type="submit"
                    data-toggle="modal"
                    block
                >
                    Save
                </Button>
                <ToastContainer/>
            </Form>
        </div>
    );
};

export default AddStudentForm;