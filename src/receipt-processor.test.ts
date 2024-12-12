import { describe, it, expect } from 'vitest';
import { validate } from 'uuid';

import ReceiptProcessor, { Receipt } from './receipt-processor';
import calculateReceiptPoints from './points-calculator';

const receipt: Receipt = {
  retailer: 'Target',
  purchaseDate: '2022-01-01',
  purchaseTime: '13:01',
  items: [
    {
      shortDescription: 'Mountain Dew 12PK',
      price: '6.49'
    },{
      shortDescription: 'Emils Cheese Pizza',
      price: '12.25'
    },{
      shortDescription: 'Knorr Creamy Chicken',
      price: '1.26'
    },{
      shortDescription: 'Doritos Nacho Cheese',
      price: '3.35'
    },{
      shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
      price: '12.00'
    }
  ],
  total: '35.35'
};

describe('ReceiptProcessor', () => {
  it('Should return a valid uuid after processing a receipt', () => {
    const receiptProcessor = new ReceiptProcessor();
    const id = receiptProcessor.processReceipt(receipt);
    expect(validate(id)).toBe(true);
  });
  it('Should correctly return the points for a processed receipt based on the id provided upon receipt processing', () => {
    const receiptProcessor = new ReceiptProcessor();
    const id = receiptProcessor.processReceipt(receipt);
    const points = receiptProcessor.getReceiptPoints(id);
    expect(points).toBeTypeOf('number');
  });
  it('Should correctly calculate receipt points and store the result in the receipt log', () => {
    const receiptProcessor = new ReceiptProcessor();
    const expectedPoints = calculateReceiptPoints(receipt);
    const id = receiptProcessor.processReceipt(receipt);
    const points = receiptProcessor.getReceiptPoints(id);
    expect(points).toBe(expectedPoints);
  });
});
