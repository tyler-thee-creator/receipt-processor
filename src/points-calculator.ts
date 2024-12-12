import { Receipt, ReceiptItem } from './receipt-processor';

const calcPointsFromRetailerName = (retailerName: string): number => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  let alphanumericCount = 0;
  for (const char of retailerName) {
    if (alphanumericRegex.test(char)) alphanumericCount++;
  }
  return alphanumericCount;
}

const calcPointsFromTotalCost = (totalCost: string): number => {
  let points = 0;

  const decimal = totalCost.indexOf('.');
  if (totalCost.slice(decimal + 1) === '00') points += 50; // if total is a round dollar amount

  if (totalCost !== '0.00' && +totalCost % 0.25 === 0) points += 25; // if total is a mulitplier of 0.25

  return points;
}

const calcPointsFromItems = (items: ReceiptItem[]): number => {
  let points = 0;

  points += Math.floor(items.length / 2) * 5; // 5 points for every 2 items

  for (const item of items) {
    if (item.shortDescription.trim().length % 3 === 0) points += Math.ceil(+item.price * 0.2); // if trimmed item description is multiple of 3
  }

  return points;
}

const calcPointsFromDate = (date: string): number => {
  const d = new Date(date + 'T00:00:00Z'); // 'T00:00:00Z' ensures date is not converted to local timezone preserving the date's accuracy
  return d.getUTCDate() % 2 === 1 ? 6 : 0;
}

const calcPointsFromTime = (time: string): number => {
  const [ hours, minutes ] = time.split(':');

  const inputTime = new Date();
  inputTime.setHours(+hours, +minutes, 0, 0);

  const startTime = new Date();
  startTime.setHours(14, 0, 0, 0); // 2:00pm

  const endTime = new Date();
  endTime.setHours(16, 0, 0, 0); // 4:00pm

  return inputTime > startTime && inputTime < endTime ? 10 : 0;
}

const calculateReceiptPoints = (receipt: Receipt): number => {
  let points = 0;

  points += calcPointsFromRetailerName(receipt.retailer);
  points += calcPointsFromTotalCost(receipt.total);
  points += calcPointsFromItems(receipt.items);
  points += calcPointsFromDate(receipt.purchaseDate);
  points += calcPointsFromTime(receipt.purchaseTime);

  return points;
}

export default calculateReceiptPoints;
