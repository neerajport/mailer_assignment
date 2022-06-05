import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import {
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    InputAdornment,
    FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { Button, Grid } from "@mui/material";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import swal from "sweetalert";

const AdminLogin = (props) => {
    const [showHidePassword, setShowHidePassword] = useState(false);
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup
            .string()
            .email()
            .required("メールアドレスをご入力ください。"),
        password: yup
            .string()
            .min(8)
            .max(18)
            .required("パスワードをご入力ください。"),
    });

    const handleClick = () => {
        setShowHidePassword(!showHidePassword);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: function (values, { resetForm }) {
            setToggle(!toggle); //for loading button
            const { email, password } = values;
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;

                    localStorage.setItem("accessToken", user.accessToken);

                    resetForm({ values: "" });
                    navigate("/admin/dashboard");
                })
                .catch((error) => {
                    console.log(error.message);
                    setToggle(false); //for loading button
                    swal("Sorry!", error.message, "error");
                });
        },
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div style={{ textAlign: "center" }}>
                <h3>Admin</h3>
                <br />
                <br />
                <br />
                {!toggle ? <LockIcon fontSize="large" /> : <CircularProgress />}
                <br />
                <br />
                <br />
            </div>

            <center>
                <div style={{ width: "50%" }}>
                    <Grid container spacing={2}>
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
                            <label>Password</label>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl
                                variant="outlined"
                                style={{ width: "80%" }}
                            >
                                <InputLabel
                                    error={Boolean(
                                        formik.touched.password &&
                                            formik.errors.password
                                    )}
                                    htmlFor="password"
                                >
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="password"
                                    name="password"
                                    label="Password"
                                    margin="dense"
                                    type={
                                        showHidePassword ? "text" : "password"
                                    }
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClick}
                                                edge="end"
                                            >
                                                {!showHidePassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText sx={{ color: "#d32f2f" }}>
                                    {formik.touched.password &&
                                        formik.errors.password}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <br />

                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
            </center>

            {/* <h3 className='loginLink' onClick={handleToggleComponent}>Register as an Admin </h3> */}
        </form>
    );
};

export default AdminLogin;
