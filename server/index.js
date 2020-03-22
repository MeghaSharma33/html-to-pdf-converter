const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const router = express.Router();
const cors = require('cors');

const pdfTemplate = require('./documents/index');

const app = express();

const port = process.env.PORT || 9000;

router.use(cors());
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

router.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/rezultati.pdf`)
})

app.listen(port, () => console.log(`Listening on port ${port}`));
