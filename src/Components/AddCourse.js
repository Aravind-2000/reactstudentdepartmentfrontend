import React , {useState} from 'react';
import StudentServiceApi from "../Service/StudentServiceApi";
import {FloatingLabel, Form} from "react-bootstrap";

const AddCourse = () => {

    const [courseId, setCourseId] = useState(" ");
    const [courseName, setCourseName] = useState(" ");
    const [months, setMonths] = useState(" ");
    const [courseFee, setCourseFee] = useState(" ");

    const saveCourse = () => {
        const course ={courseId, courseName, months, courseFee};
        StudentServiceApi.addCourse(course)
            .then((res) => {
                console.log(res.data);
                AddCourse();
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div>
            <Form className="container" onSubmit={(e) => saveCourse() }>
                <Form.Group>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Course ID"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="course ID" id={courseId} onChange={(e) => setCourseId(e.target.value)} required />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Course Name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="course Name" id={courseId} onChange={(e) => setCourseName(e.target.value)} required/>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Course Fee"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="course Fee" id={courseId} onChange={(e) => setCourseFee(e.target.value)} required/>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Course Duration"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="course Duration" id={courseId} onChange={(e) => setMonths(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                <button
                    className="btn"
                    type="submit"
                    style={{color:"darkolivegreen", backgroundColor:"lightgray"}}
                >

                    Add Course
                </button>
            </Form>
            
        </div>
    );
};

export default AddCourse;
