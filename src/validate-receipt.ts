import { Receipt, ReceiptItem } from './receipt-processor';

const validateRetailer = ({ retailer }: Receipt): boolean => {
  if (!retailer) return false;
  const retailerRegex = /^[\w\s\-\&]+$/;
  return retailerRegex.test(retailer);
}

const validatePurchaseDate = ({ purchaseDate }: Receipt): boolean => {
  if (!purchaseDate) return false;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateRegex.test(purchaseDate)) return false; // if date string does not match regex pattern of YYYY-MM-DD

  const date = new Date(purchaseDate);
  if (isNaN(date.getTime())) return false; // if date cannot be parsed into a Date object in Javascript

  return true;
}

const validatePurchaseTime = ({ purchaseTime }: Receipt): boolean => {
  if (!purchaseTime) return false;
  const purchaseTimeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  return purchaseTimeRegex.test(purchaseTime);
}

const validateItem = ({ shortDescription, price }: ReceiptItem): boolean => {
  if (!shortDescription || !price) return false;
  const shortDescriptionRegex = /^[\w\s\-]+$/;
  const priceRegex = /^\d+\.\d{2}$/;
  return shortDescriptionRegex.test(shortDescription) && priceRegex.test(price);
}

const validateItems = ({ items }: Receipt): boolean => {
  if (!items || !items.length) return false;
  for (const item of items) {
    const itemValid = validateItem(item);
    if (!itemValid) return false;
  }
  return true;
}

const validateTotal = ({ total }: Receipt): boolean => {
  if (!total) return false;
  const totalRegex = /^\d+\.\d{2}$/;
  return totalRegex.test(total);
}

const validateReceipt = (receipt: Receipt): boolean => {
  if (!receipt || !Object.keys(receipt).length) return false;

  const retailerValid = validateRetailer(receipt);
  const purchaseDateValid = validatePurchaseDate(receipt);
  const purchaseTimeValid = validatePurchaseTime(receipt);
  const itemsValid = validateItems(receipt);
  const totalValid = validateTotal(receipt);

  if (
    !retailerValid ||
    !purchaseDateValid ||
    !purchaseTimeValid ||
    !itemsValid ||
    !totalValid
  ) {
    return false;
  }

  return true;
}

export default validateReceipt;
