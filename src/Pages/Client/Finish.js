import { Typography } from "@mui/material";
import { useEffect } from "react";

const Finish = () => {
    useEffect(() => {
        localStorage.removeItem("finish");
    }, []);
    return (
        <>
            {localStorage.getItem("finish") ? (
                <Typography variant="h6" component="h6">
                    この度は応募頂きありがとうございます。
                    後日担当者よりご連絡させていただきます。
                </Typography>
            ) : (
                <Typography variant="h6" component="h6">
                    エラーメッセージ。
                </Typography>
            )}
        </>
    );
};

export default Finish;
