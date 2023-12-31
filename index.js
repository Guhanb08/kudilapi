const express = require('express')
const app = express()
const pdf = require("./pdf.js");
var cors = require('cors')
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.post('/quotation', async (req, res) => {
    try {
        let quotationData = await pdf.pdfcreate(req.body);
        if (quotationData) {
            res.status(200).send({
                data: quotationData
            })
        } else {
            res.status(500).send({
                message: 'Something Went Wrong'
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
})


app.listen(process.env.PORT || 3000)