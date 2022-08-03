import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthProvider } from "../contexts/auth";
import Doctors from "../pages/Doctors";
import Home from "../pages/home";
import RegisterPatient from "../pages/home/Register";
import RegisterDoctors from "../pages/Doctors/Register";
import RegisterResident from "../pages/Resident/Register";
import RegisterTeacher from "../pages/Teachers/Register";
import Resident from "../pages/Resident";
import Signin from "../pages/Signin";
import Teachers from "../pages/Teachers";
import RegisterExamRequests from "../pages/ExamRequest/Register";
import ExamRequestPage from "../pages/ExamRequest";
import ExamPage from "../pages/Exams";
import ExamsRegister from "../pages/Exams/Register";

const Private = ({ Item }: any) => {
    const token = localStorage.getItem("user_token");
    return token ? (
        <Fragment>
            <Sidebar />
            <Item />
        </Fragment>
    ) : (
        <Signin />
    );
};

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <AuthProvider>
                    <Routes>
                        <Route path="/home" element={<Private Item={Home} />} />
                        <Route path="/examRequests/:id/:name" element={<Private Item={ExamRequestPage} />} />
                        <Route path="examRequests/Register/:id/:name" element={<Private Item={RegisterExamRequests} />} />
                        <Route path="examRequests/Edit/:id/:type" element={<Private Item={RegisterExamRequests} />} />
                        <Route path="/exam/:id" element={<Private Item={ExamPage} />} />
                        <Route path="exam/Register/:id/:type" element={<Private Item={ExamsRegister} />} />
                        <Route path="exam/Edit/:id/:Edit" element={<Private Item={ExamsRegister} />} />
                        <Route path="exam/details/:id/:requestId/:details" element={<Private Item={ExamsRegister} />} />
                        <Route path="/doctors" element={<Private Item={Doctors} />} />
                        <Route path="/doctors/:id" element={<Private Item={RegisterDoctors} />} />
                        <Route path="/register/doctor" element={<Private Item={RegisterDoctors} />} />
                        <Route path="/resident" element={<Private Item={Resident} />} />
                        <Route path="/resident/:id" element={<Private Item={RegisterResident} />} />
                        <Route path="/register/resident" element={<Private Item={RegisterResident} />} />
                        <Route path="/teachers" element={<Private Item={Teachers} />} />
                        <Route path="/teachers/:id" element={<Private Item={RegisterTeacher} />} />
                        <Route path="/register/teacher" element={<Private Item={RegisterTeacher} />} />
                        <Route path="/patient" element={<Private Item={RegisterPatient} />} />
                        <Route path="/patient/:id" element={<Private Item={RegisterPatient} />} />
                        <Route path="/" element={<Signin />} />
                        <Route path="/home" element={<Private Item={Home} />} />
                    </Routes>{" "}
                </AuthProvider>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;
