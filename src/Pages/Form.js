import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
    TextField,
    FormControl,
    InputLabel,
    FormHelperText,
    Grid,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Select, MenuItem, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Form = (props) => {
    const { name, email, age, occupation, comment, formValues, id } = props;

    const [toggle, setToggle] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().min(4).required("お名前をご入力ください。"),
        email: yup
            .string()
            .email()
            .required("メールアドレスをご入力ください。"),
        age: yup
            .number()
            .typeError("Age must be a number")
            .positive("Age is greater than zero")
            .required("年齢をご入力ください。"),
        occupation: yup.string().required("希望職種を選択してください。"),
        comment: yup.string().min(10).required("希望理由をご入力ください。"),
    });

    const formik = useFormik({
        initialValues: {
            id: id ? id : "",
            name: name ? name : "",
            email: email ? email : "",
            age: age ? age : "",
            occupation: occupation ? occupation : "",
            comment: comment ? comment : "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            formValues(values);
            setToggle(!toggle);
        },
    });

    const occupationCategories = [
        "ソフトウェアエンジニア",
        "フロントエンドディベロッパー",
        "ディレクター",
        "デザイナー",
    ];

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            {!localStorage.getItem("accessToken") ? (
                <div style={{ textAlign: "center" }}>
                    <NavLink to={`/admin`}>ADMIN PANEL</NavLink>
                    <br />
                    <br />
                    <br />
                    {!toggle ? (
                        <LockIcon fontSize="large" />
                    ) : (
                        <CircularProgress />
                    )}
                    <br />
                    <br />
                    <br />
                </div>
            ) : null}

            <center>
                <div style={{ width: "70%" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} className="mmo">
                            <label> 氏名</label>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                margin="normal"
                                autoComplete="off"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                                style={{ width: "80%" }}
                            />
                        </Grid>
                        <Grid item xs={4} className="mmo">
                            <label>Email</label>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="email"
                                name="email"
                                placeholder="example@gmail.com"
                                label="Enter your Email"
                                margin="normal"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                                style={{ width: "80%" }}
                            />
                        </Grid>
                        <Grid item xs={4} className="mmo">
                            <label>年齢</label>
                        </Grid>
                        <Grid item xs={8} className="mmo">
                            <TextField
                                id="age"
                                name="age"
                                label="Age"
                                margin="normal"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                style={{ width: "75%" }}
                                error={
                                    formik.touched.age &&
                                    Boolean(formik.errors.age)
                                }
                                autoComplete="off"
                                helperText={
                                    formik.touched.age && formik.errors.age
                                }
                            />
                            &nbsp;&nbsp; 歳
                        </Grid>
                        <Grid item xs={4} className="mmo">
                            <label>希望職種</label>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl style={{ width: "80%" }}>
                                <InputLabel
                                    error={Boolean(
                                        formik.touched.occupation &&
                                            formik.errors.occupation
                                    )}
                                    htmlFor="category"
                                >
                                    選択してください
                                </InputLabel>
                                <Select
                                    label="occupation"
                                    id="occupation"
                                    name="occupation"
                                    value={formik.values.occupation}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.occupation &&
                                        Boolean(formik.errors.occupation)
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {occupationCategories.map((ele) => {
                                        return (
                                            <MenuItem key={ele} value={ele}>
                                                {ele}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText sx={{ color: "#d32f2f" }}>
                                    {formik.touched.occupation &&
                                        formik.errors.occupation}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} className="mmo">
                            <label>希望理由</label>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="comment"
                                name="comment"
                                label="Comment"
                                margin="normal"
                                autoComplete="off"
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.comment &&
                                    Boolean(formik.errors.comment)
                                }
                                helperText={
                                    formik.touched.comment &&
                                    formik.errors.comment
                                }
                                style={{ width: "80%" }}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Button variant="contained" type="submit">
                        {!localStorage.getItem("accessToken")
                            ? "申込み"
                            : "保存"}
                    </Button>
                </div>
            </center>
        </form>
    );
};

export default Form;
