const express = require("express");
const app = express();
const pdf = require("./pdf.js");
var nodemailer = require("nodemailer");
var cors = require("cors");
app.use(express.json());
// app.use(cors());
var fs = require("fs");

let corsOptions = {
  origin: ["http://localhost" , "https://quotation.kudilagam.com"]
};

app.use(cors());

app.use(express.urlencoded({ extended: true }));

var transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  auth: {
    user: "service@kudilagam.com",
    pass: "Abcd@1234",
  },
});

// health check
app.get("/kudilapi/index", (req, res) => {
  res.status(200).json({
    message: "Welcome to Common Service",
  });
});

app.post("/kudilapi/quotation", async (req, res) => {
  try {
    let quotationData = await pdf.pdfcreate(req.body);
    if (quotationData.invoiceno) {
      const pdfAttachment = fs.readFileSync(
        `${__dirname}/pdfs/${quotationData.invoiceno}.pdf`
      );
      var mailOptions = {
        from: "service@kudilagam.com",
        to: quotationData.email,
        subject: `Quotation ${quotationData.invoiceno} - Thank You for Reaching Us`,
        text: `Dear ${quotationData.name},\n\nThank you for reaching out to us. We appreciate your interest in our services. Please find attached the quotation (Quotation_${quotationData.invoiceno}.pdf) for your reference.\n\nIf you have any questions or require further assistance, feel free to contact us.\n\nBest regards,\nThe Kudilagam Team`,
        attachments: [
          {
            filename: `Quotation_${quotationData.invoiceno}.pdf`, 
            content: pdfAttachment,
            encoding: "base64",
          },
        ],
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).send({
            message: "Something Went Wrong",
          });
        } else {
          res.status(200).send({
            data: quotationData,
          });
        }
      });
     /*  res.status(200).send({
        data: quotationData,
      }); */
    } else {
      res.status(500).send({
        message: "Something Went Wrong",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

app.listen(process.env.PORT || 7001);

app.listen(7000, () => {
  console.log(`Kudil Service listening to  7001`);
});
