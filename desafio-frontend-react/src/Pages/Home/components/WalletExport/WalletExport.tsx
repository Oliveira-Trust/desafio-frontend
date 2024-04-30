import { useEffect, useState } from "react";
import styles from "./WalletExport.module.css";
import Users from "../../../../services/users";

const WalletExport = () => {
  const [listWallet, setListWallet] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const json2csv = (json: string): string => {
    const simpleArray: any[] = JSON.parse(json);
    const header: string[] = simpleArray
      .map((x) => Object.keys(x))
      .reduce((acc, cur) => (acc.length > cur.length ? acc : cur), []);

    const replacer = (value: any): string =>
      value === undefined || value === null ? "" : value.toString();
    let csv: string[] = simpleArray.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv = [header.join(","), ...csv];
    return csv.join("\r\n");
  };

  const exportCSV = () => {
    const csvContent = json2csv(JSON.stringify(listWallet));
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "walletData.csv");
    document.body.appendChild(link);
    link.click();
  };

  const fetchUsers = () => {
    Users.listar()
      .then((res: any) => {
        setListWallet(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <button className={styles.walletButtonHeader} onClick={exportCSV}>
      Exportar CSV
    </button>
  );
};

export default WalletExport;
