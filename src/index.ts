import express from 'express';
import bodyParser from 'body-parser';

import validateReceipt from './validate-receipt';
import ReceiptProcessor from './receipt-processor';

const port = 3000;

const app = express();
app.use(bodyParser.json()); // parse JSON request body

const receiptProcessor = new ReceiptProcessor();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/receipts/process', (req, res) => {
  try {
    const { body: receipt } = req;

    const isValid = validateReceipt(receipt);
    if (!isValid) {
      res.status(400).send('The receipt is invalid.');
      return;
    }

    const id = receiptProcessor.processReceipt(receipt);
    res.send({ id });
  } catch (error) {
    res.status(500).send(`Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

app.get('/receipts/:id/points', (req, res) => {
  try {
    const { id } = req.params;

    const points = receiptProcessor.getReceiptPoints(id);
    if (!points) {
      res.status(404).send('No receipt found for that ID.');
      return;
    }

    res.send({ points });
  } catch (error) {
    res.status(500).send(`Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});
