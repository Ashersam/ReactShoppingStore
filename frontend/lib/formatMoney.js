export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'INR',
    minimumFractionalDigits: 2,
  };

  if (amount % 100 === 0) {
    options.minimumFractionalDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-IN', options);

  return formatter.format(amount / 100);
}
