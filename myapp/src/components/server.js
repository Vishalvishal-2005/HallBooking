// server.js
const express = require('express');
const IronPDF = require('ironpdf');

const app = express();
const port = 3001;

app.use(express.json());

app.post('/generate-pdf', async (req, res) => {
  const { htmlContent } = req.body;

  try {
    const pdf = await IronPDF.HtmlToPdf(htmlContent);
    const pdfBuffer = await pdf.toBuffer();

    res.setHeader('Content-Disposition', 'attachment; filename=invitation.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
