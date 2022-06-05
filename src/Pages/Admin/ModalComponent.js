import Form from "../Form";
import Formdata from "./Formdata";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

function ModalComponent(props) {
    const {
        id,
        name,
        email,
        age,
        occupation,
        comment,
        formValues,
        handleToggle,
        handleClose,
        handleDelete,
        toggle,
    } = props;

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    return (
        <>
            <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
                sx={{ m: "auto" }}
            >
                Form Details
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {!toggle ? (
                    <Formdata id={id} />
                ) : (
                    <Form
                        id={id}
                        name={name}
                        email={email}
                        age={age}
                        occupation={occupation}
                        comment={comment}
                        formValues={formValues}
                        handleToggle={handleToggle}
                    />
                )}
            </DialogContent>
            <DialogActions>
                {!toggle ? (
                    <Button
                        autoFocus
                        onClick={handleToggle}
                        variant="contained"
                    >
                        更新
                    </Button>
                ) : null}
                <Button autoFocus onClick={handleDelete} variant="contained">
                    削除
                </Button>
            </DialogActions>
        </>
    );
}

export default ModalComponent;
