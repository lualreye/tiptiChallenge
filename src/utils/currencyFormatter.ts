const currencyFormatter = (value: number): string => {
  const formatterOptions = { style: 'currency', currency: 'USD' };
  const format = new Intl.NumberFormat('en-US', formatterOptions);

  return format.format(value / 100);
};

export default currencyFormatter;