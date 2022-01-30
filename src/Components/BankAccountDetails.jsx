import React, {useEffect, useState} from 'react';
import StudentServiceApi from "../Service/StudentServiceApi";
import {Link} from "react-router-dom";
import {Modal, ModalBody, ModalTitle, Form, FloatingLabel, Button} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import "./MainPage.css";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const BankAccount = () => {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [bankName, setBankName] = useState(" ");
    const [bankBranch, setBankBranch] = useState(" ");
    const [accountHolderName, setAccountHolderName] = useState(" ");
    const [accountNumber, setAccountNumber] = useState(" ");
    const [ifscNumber, setIfscNumber] = useState(" ");
    const [accountType, setAccountType] = useState(" ");

    useEffect(() => {
       getALlAccounts();
    }, []);

    const getALlAccounts = () => {
        StudentServiceApi.getAllBankAccounts().then((res) => {
            setBankAccounts(res.data);
            console.log(res.data);
        })
            .catch((error) => {
                console.log(error);
            })
    }

    const saveDetails = () =>{
        const accountDetails = {bankName, bankBranch, accountHolderName, accountNumber, ifscNumber, accountType};
        StudentServiceApi.addBankAccount(accountDetails).then((resp) => {
            console.log(resp.data);
            getALlAccounts();
        })
            .catch((error) => {
                console.log(error);
            })
    }

    const [add, setAdd] = useState(false);
    const showAdd = () => setAdd(true);
    const hideAdd = () => setAdd(false);


    return (
        <div>
            <br /> <br /> <br /> <br /> <br />
            <div className="card card-sm card-md card-lg shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <button
                        onClick={showAdd}
                        className="btn "
                        data-toggle="modal"
                        style={{color:"blueviolet", marginRight:10}}
                    >
                        <i className="uil uil-user-plus"/>
                    </button>
                    <Link to="/students">
                        <button className="btn" style={{color:"blueviolet"}}>
                            <i className="uis uis-arrow-circle-left"/>
                        </button>
                    </Link>

                    <table className="table table-borderless">
                        <thead className="tablehead">
                        <tr>
                            <td> Bank Name </td>
                            <td> Bank Branch </td>
                            <td> Account Holder Name</td>
                            <td> Account Number </td>
                            <td> IFSC Number </td>
                            <td> Account Type </td>
                            <td> </td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            bankAccounts.map((value,index) => (
                                <tr key={index}>
                                    <td className="col"> <h6> {value.bankName} </h6>  </td>
                                    <td className="col"> <h6> {value.bankBranch} </h6> </td>
                                    <td className="col"><h6> {value.accountHolderName} </h6>  </td>
                                    <td className="col"> <h6> {value.accountNumber} </h6> </td>
                                    <td className="col"> <h6>{value.ifscNumber} </h6> </td>
                                    <td className="col"> <h6>{value.accountType} </h6> </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                    <Modal
                    show={add}
                    onHide={hideAdd}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                        <ModalHeader closeButton>
                            <ModalTitle> Add Account </ModalTitle>
                        </ModalHeader>

                        <ModalBody>
                            <div>
                                <Form className="container">
                                    <Form.Group>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            className="mb-3"
                                            label=" Bank Name"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="bankName"
                                                value={bankName}
                                                onChange={(e) => setBankName(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingInput"
                                            className="mb-3"
                                            label=" Bank branch"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="bankBranch"
                                                value={bankBranch}
                                                onChange={(e) => setBankBranch(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingInput"
                                            className="mb-3"
                                            label=" Account Holder Name"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="accountHolderName"
                                                value={accountHolderName}
                                                onChange={(e) => setAccountHolderName(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingInput"
                                            className="mb-3"
                                            label=" Account Number"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="accountNumber"
                                                value={accountNumber}
                                                onChange={(e) => setAccountNumber(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel><FloatingLabel
                                            controlId="floatingInput"
                                            className="mb-3"
                                            label="IFSC Number"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="ifscNumber"
                                                value={ifscNumber}
                                                onChange={(e) => setIfscNumber(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>

                                        <FormControl>
                                            <FormLabel style={{fontFamily: "Poppins"}}>Account Type</FormLabel>
                                            <RadioGroup
                                                row
                                                value={accountType}
                                                onChange={(e) => setAccountType(e.target.value) }
                                            >
                                                <FormControlLabel value="SAVINGS" control={<Radio />} label="Savings" />
                                                <FormControlLabel value="CURRENT" control={<Radio />} label="Current" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Form.Group>

                                    <Button
                                        variant="success"
                                        type="submit"
                                        onClick={(e) => saveDetails(e)}
                                        data-toggle="modal"
                                        block
                                    > Save
                                    </Button>
                                </Form>


                            </div>


                        </ModalBody>

                    </Modal>




                </div>
            </div>

        </div>
    );
};

export default BankAccount;
