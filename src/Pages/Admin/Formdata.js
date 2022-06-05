import { Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CircularProgress } from "@mui/material";

const Formdata = (props) => {
    const { id } = props;
    const [userDetails, setUserDetails] = useState({});

    // retreveinig data based on id
    useEffect(() => {
        const fetchSingleData = async () => {
            try {
                const docRef = doc(db, "form", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchSingleData();
    }, []);

    return (
        <center>
            <div style={{ width: "568px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={4} className="mmo">
                        <label> 氏名</label>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography gutterBottom>
                            {!userDetails.name ? (
                                <CircularProgress size="1rem" />
                            ) : (
                                userDetails.name
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className="mmo">
                        <label>Email</label>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography gutterBottom>
                            {!userDetails.email ? (
                                <CircularProgress size="1rem" />
                            ) : (
                                userDetails.email
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className="mmo">
                        <label>年齢</label>
                    </Grid>
                    <Grid item xs={8} className="mmo">
                        <Typography gutterBottom>
                            {!userDetails.age ? (
                                <CircularProgress size="1rem" />
                            ) : (
                                userDetails.age
                            )}
                            歳
                        </Typography>
                        &nbsp;&nbsp;
                    </Grid>
                    <Grid item xs={4} className="mmo">
                        <label>希望職種</label>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography gutterBottom>
                            {!userDetails.occupation ? (
                                <CircularProgress size="1rem" />
                            ) : (
                                userDetails.occupation
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className="mmo">
                        <label>希望理由</label>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography gutterBottom>
                            {!userDetails.comment ? (
                                <CircularProgress size="1rem" />
                            ) : (
                                userDetails.comment
                            )}
                        </Typography>
                    </Grid>
                </Grid>

                <br />
            </div>
        </center>
    );
};
export default Formdata;
