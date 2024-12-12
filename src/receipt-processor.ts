import { v4 as uuidv4 } from 'uuid';

import calculateReceiptPoints from './points-calculator';

export interface ReceiptItem {
  shortDescription: string;
  price: string;
}

export interface Receipt {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  items: ReceiptItem[];
  total: string;
}

interface ReceiptPointsLogItem {
  id: string;
  points: number;
}

class ReceiptProcessor {
  private receiptPointsLog: ReceiptPointsLogItem[];

  constructor() {
    this.receiptPointsLog = [];
  }

  processReceipt(receipt: Receipt): string {
    const id = uuidv4();
    const points = calculateReceiptPoints(receipt);
    this.receiptPointsLog.push({ id, points });
    return id;
  }

  getReceiptPoints(id: string): number | undefined {
    const logItem = this.receiptPointsLog.find(x => x.id === id);
    return logItem?.points;
  }
}

export default ReceiptProcessor;
