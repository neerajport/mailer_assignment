import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../Form";

const UserForm = (props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formValues = (values) => {
        setLoading(!loading);
        axios
            .post(
                "http://localhost:5001/admin-userform/us-central1/app/api/create",
                values
            )
            .then((response) => {
                localStorage.setItem("finish", "finishPage");
                navigate("/finish");
            })

            .catch((err) => {
                console.log(err.message);
            });
    };

    return <Form formValues={formValues} loading={loading} />;
};

export default UserForm;
