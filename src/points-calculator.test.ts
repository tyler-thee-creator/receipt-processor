import { describe, it, expect } from 'vitest';

import calculateReceiptPoints from './points-calculator';
import { Receipt } from './receipt-processor';

const zeroPointsReceipt: Receipt = {
  retailer: '',
  purchaseDate: '2022-01-02',
  purchaseTime: '13:01',
  items: [],
  total: '35.35'
};

describe('calculateReceiptPoints', () => {
  it('Should correctly calculate points for the retailer name', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.retailer = 'Target';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(6);
  });
  it('Should correctly calculate points for the retailer name #2', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.retailer = 'Baskin-Robbins';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(13);
  });
  it('Should correctly calculate points for the retailer name #3', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.retailer = '   Harley-Davidson 123   ';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(17);
  });
  it('Should correctly calculate points for a total with a round dollar amount with zero cents', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.total = '0.00';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(50);
  });
  it('Should correctly calculate points for a total with a non-round dollar amount with cents', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.total = '1.01';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(0);
  });
  it('Should correctly calculate points for a total that is a multiplier of 0.25', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.total = '12.25';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(25);
  });
  it('Should correctly calculate points for the number of items on a receipt based on items length', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.items = [ ...zeroPointsReceipt.items ];
    const mockItem = { shortDescription: 'Chips', price: '2.50' };
    receipt.items.push(mockItem);
    receipt.items.push(mockItem);
    receipt.items.push(mockItem);
    receipt.items.push(mockItem);
    receipt.items.push(mockItem);
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(10);
  });
  it('Should correctly calculate points for the number of items on a receipt based on items length #2', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.items = [ ...zeroPointsReceipt.items ];
    const mockItem = { shortDescription: 'Chips', price: '2.50' };
    receipt.items.push(mockItem);
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(0);
  });
  it('Should correctly calculate points for the number of items on a receipt based on items length #3', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.items = [ ...zeroPointsReceipt.items ];
    const mockItem = { shortDescription: 'Chips', price: '2.50' };
    receipt.items.push(mockItem);
    receipt.items.push(mockItem);
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(5);
  });
  it('Should correctly calculate points for the number of items on a receipt based on item short description', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.items = [ ...zeroPointsReceipt.items ];
    receipt.items.push({ shortDescription: 'Spaghetti', price: '15.75' });
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(4);
  });
  it('Should correctly calculate points for the number of items on a receipt based on item short description #2', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.items = [ ...zeroPointsReceipt.items ];
    receipt.items.push({ shortDescription: 'Ham', price: '21.63' });
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(5);
  });
  it('Should correctly calculate points for the number of items on a receipt based on item short description #3', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.items = [ ...zeroPointsReceipt.items ];
    receipt.items.push({ shortDescription: '       Spaghetti  ', price: '15.75' });
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(4);
  });
  it('Should correctly calculate points for a purchaseDate that is odd', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.purchaseDate = '2024-12-09';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(6);
  });
  it('Should correctly calculate points for a purchaseDate that is even', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.purchaseDate = '2024-12-12';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(0);
  });
  it('Should correctly calculate points for a purchaseTime that is between 2:00pm and 4:00pm', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.purchaseTime = '14:01';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(10);
  });
  it('Should correctly calculate points for a purchaseTime that is not between 2:00pm and 4:00pm', () => {
    const receipt = { ...zeroPointsReceipt };
    receipt.purchaseTime = '18:42';
    const points = calculateReceiptPoints(receipt);
    expect(points).toBe(0);
  });
});
