import { unparse } from "papaparse";

export const exportToCSV = (wallets) => {
  const csv = unparse(wallets);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'wallets.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}