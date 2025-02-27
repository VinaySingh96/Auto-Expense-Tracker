export const PaymentMode = {
  CASH: 'Cash',
  UPI: 'UPI',
  CREDIT_CARD: 'Credit Card',
  DEBIT_CARD: 'Debit Card',
  NET_BANKING: 'Net Banking',
  WALLET: 'Wallet',
  EMI: 'EMI',
  OTHER: 'Other',
};

// Corresponding Icons
export const PaymentModeIcons = {
  CASH: 'cash-multiple',
  UPI: 'qrcode-scan',
  CREDIT_CARD: 'credit-card',
  DEBIT_CARD: 'credit-card-outline',
  NET_BANKING: 'bank',
  WALLET: 'wallet',
  EMI: 'finance',
  OTHER: 'dots-horizontal-circle',
};

// Convert into an array if needed for dropdowns, etc.
export const PaymentModesArray = Object.entries(PaymentMode).map(([key, value]) => ({
  key,
  label: value,
  icon: PaymentModeIcons[key],
}));
