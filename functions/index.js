const functions = require("firebase-functions");
var admin = require("firebase-admin");
var serviceAccount = require("./permissions.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const app = express();
const db = admin.firestore();

const cors = require("cors");
app.use(cors({ origin: true }));

// Defining a UUID
const uuid = require("uuid");
require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
    `${process.env.SENDGRID_API_KEY}`
);

app.get("/hello", (req, res) => {
    return res.status(200).send("hello-world");
});

app.post("/api/create", async (req, res) => {
    try {
        let newId = uuid.v1();
        await db
            .collection("form")
            .doc("/" + newId + "/")
            .create({
                id: newId,
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                occupation: req.body.occupation,
                comment: req.body.comment,
            });

        const msg = {
            to: req.body.email,
            from: "worktestflow75@gmail.com", // Use the email address or domain you verified above
            subject: "応募確認",
            text: "この度は応募頂きありがとうございます。 後日担当者よりご連絡させていただきます。",
            html:
                req.body.name +
                " 様" +
                "<br/></strong>この度は応募頂きありがとうございます。 後日担当者よりご連絡させていただきます。</strong>",
        };

        sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode);
                console.log(response[0].headers);

                return res.status(200).send();
            })

            .catch((error) => {
                console.log(error);
            });

        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

exports.app = functions.https.onRequest(app);
