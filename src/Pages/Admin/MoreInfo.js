import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import swal from "sweetalert";
import ModalComponent from "./ModalComponent";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function MoreInfo(props) {
    const { id, name, email, age, occupation, comment, fetchData } = props;
    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = async () => {
        setOpen(true);
    };
    const handleClose = () => {
        fetchData();
        setOpen(false);
        setToggle(false);
    };

    const handleToggle = (values) => {
        setToggle(!toggle);
    };

    //Update values
    const formValues = async (data) => {
        try {
            const ref = doc(db, "form", id);

            await updateDoc(ref, {
                name: data.name,
                email: data.email,
                age: data.age,
                occupation: data.occupation,
                comment: data.comment,
            });
            swal("Good job!", "updated successfully", "success");
            handleClose();
        } catch (err) {
            console.log(err.message);
        }
    };

    //delete doc
    const handleDelete = async () => {
        var confirmBox = window.confirm("Sure, You want to delete it ?");
        if (confirmBox) {
            await deleteDoc(doc(db, "form", id));
            swal("Good job!", "Deleted successfully", "success");
            handleClose();
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                詳細
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <ModalComponent
                    id={id}
                    name={name}
                    email={email}
                    age={age}
                    occupation={occupation}
                    comment={comment}
                    formValues={formValues}
                    handleToggle={handleToggle}
                    handleClose={handleClose}
                    handleDelete={handleDelete}
                    toggle={toggle}
                />
            </BootstrapDialog>
        </div>
    );
}
