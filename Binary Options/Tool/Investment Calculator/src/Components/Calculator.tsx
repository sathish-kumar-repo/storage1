import React, { useEffect, useState } from "react";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ResultsTable from "./ResutlsTable";

import currencyOptions from "../data/currency";
interface Result {
  day: number;
  capital: string;
  invesment: string;
  profit: string;
  expectedProfit: string;
  loss: string;
  capitalEnd: string;
}

const Calculator: React.FC = () => {
  const [currency, setCurrency] = useState("usd");
  const [capital, setCapital] = useState<number | "">("");
  const [investment, setInvestment] = useState<number | "">(1);
  const [asset, setAsset] = useState<number | "">(90);
  const [profit, setProfit] = useState<number | "">(10);
  const [loss, setLoss] = useState<number | "">(5);
  const [targetCapital, setTargetCapital] = useState<number | "">("");
  const [results, setResults] = useState<Result[]>([]);
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const calculateDays = () => {
    if (capital && investment && asset && profit && loss && targetCapital) {
      let currentCapital = capital;

      const target = targetCapital;
      const newResults: Result[] = [];
      let days = 0;

      while (currentCapital < target) {
        days++;

        const currentCapitalPercent = currentCapital / 100;
        // Calculate the amount invested based on the current capital
        const investmentAmount = currentCapitalPercent * investment;

        // Calculate daily profit based on the investment amount
        const dailyProfit = (investmentAmount / 100) * asset;

        // Calculate exected profit based on the capital amount
        const expectedProfit = currentCapitalPercent * profit;

        // Calculate daily loss based on the capital amount
        const dailyLoss = currentCapitalPercent * loss;

        newResults.push({
          day: days,
          capital: `${currentCapital.toFixed(2)} ${currency}`,
          invesment: `${investmentAmount.toFixed(2)} ${currency}`,
          profit: `${dailyProfit.toFixed(2)} ${currency}`,
          expectedProfit: `${expectedProfit.toFixed(2)} ${currency}`,
          loss: `${dailyLoss.toFixed(2)} ${currency}`,
          capitalEnd: `${(currentCapital += dailyProfit).toFixed(
            2
          )} ${currency}`,
        });
      }

      setResults(newResults);
    } else {
      alert("Please Enter all Fields");
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "capital_growth_results.xlsx");
  };

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      <header className="header">
        <h1>Investment Calculator</h1>
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <span className="slider"></span>
        </label>
      </header>
      <main>
        <div className="input-group">
          <div className="input-field">
            <label htmlFor="currency-select">Choose a currency: </label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencyOptions.map((option) => (
                <option key={option.id} value={option.symbol}>
                  {option.label} ({option.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label htmlFor="capital">Capital:</label>
            <input
              id="capital"
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
            />
          </div>
          <div className="input-field">
            <label htmlFor="investment">Investment (%):</label>
            <input
              id="investment"
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
            />
          </div>
          <div className="input-field">
            <label htmlFor="asset">Asset (%):</label>
            <input
              id="asset"
              type="number"
              value={asset}
              onChange={(e) => setAsset(Number(e.target.value))}
            />
          </div>
          <div className="input-field">
            <label htmlFor="profit">Profit (%):</label>
            <input
              id="profit"
              type="number"
              value={profit}
              onChange={(e) => setProfit(Number(e.target.value))}
            />
          </div>
          <div className="input-field">
            <label htmlFor="loss">Loss (%):</label>
            <input
              id="loss"
              type="number"
              value={loss}
              onChange={(e) => setLoss(Number(e.target.value))}
            />
          </div>
          <div className="input-field">
            <label htmlFor="achieveCapital">Achieve Capital:</label>
            <input
              id="achieveCapital"
              type="number"
              value={targetCapital}
              onChange={(e) => setTargetCapital(Number(e.target.value))}
            />
          </div>
          <div className="button-container">
            <button onClick={calculateDays}>Calculate</button>
            {results.length > 0 && (
              <button className="download" onClick={downloadExcel}>
                Download Excel
              </button>
            )}
          </div>
        </div>
      </main>
      {results.length > 0 && <ResultsTable results={results} />}
    </>
  );
};

export default Calculator;
