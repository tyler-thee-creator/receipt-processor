import { describe, it, expect } from 'vitest';

import validateReceipt from './validate-receipt';
import { Receipt } from './receipt-processor';

const receiptStub: Receipt = {
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

describe('validateReceipt', () => {
  it('Should return true for a valid receipt', () => {
    const isValid = validateReceipt(receiptStub);
    expect(isValid).toBe(true);
  });
  it('Should return false for a receipt with an invalid retailer name', () => {
    const stub = { ...receiptStub };
    stub.retailer = 'Target@#$';
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
  it('Should return false for a receipt with an invalid purchaseDate', () => {
    const stub = { ...receiptStub };
    stub.purchaseDate = '2022-01-01abc';
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
  it('Should return false for a receipt with a purchaseDate of incorrect format', () => {
    const stub = { ...receiptStub };
    stub.purchaseDate = '01/01/2022';
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
  it('Should return false for a receipt with an invalid purchaseTime', () => {
    const stub = { ...receiptStub };
    stub.purchaseTime = '13:01abc';
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
  it('Should return false for a receipt with a purchaseTime of incorrect format', () => {
    const stub = { ...receiptStub };
    stub.purchaseTime = '13:01:32';
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
  it('Should return false for a receipt with an item with an invalid shortDescription', () => {
    const stub = { ...receiptStub };
    stub.items[0] = { shortDescription: 'Mountain Dew 12PK@#$', price: '6.49' };
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
  it('Should return false for a receipt with an item with an invalid price', () => {
    const stub = { ...receiptStub };
    stub.items[0] = { shortDescription: 'Mountain Dew 12PK', price: '6.49abc' };
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
  it('Should return false for a receipt with an item with a price of incorrect format', () => {
    const stub = { ...receiptStub };
    stub.items[0] = { shortDescription: 'Mountain Dew 12PK', price: '6.49123' };
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
  it('Should return false for a receipt with an invalid total cost', () => {
    const stub = { ...receiptStub };
    stub.total = '35.35abc';
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
  it('Should return false for a receipt with a total cost of incorrect format', () => {
    const stub = { ...receiptStub };
    stub.total = '35.35123';
    const isValid = validateReceipt(stub);
    expect(isValid).toBe(false);
  });
});
