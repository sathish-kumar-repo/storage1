import React from "react";

interface Result {
  day: number;
  capital: string;
  invesment: string;
  profit: string;
  expectedProfit: string;

  loss: string;
  capitalEnd: string;
}

interface ResultsTableProps {
  results: Result[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Capital</th>
          <th>Investment</th>
          <th>Profit</th>
          <th>Expected Profit</th>
          <th>Stop Loss</th>
          <th>Capital in End</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.day}>
            <td>{result.day}</td>
            <td>{result.capital}</td>
            <td>{result.invesment}</td>
            <td>{result.profit}</td>
            <td>{result.expectedProfit}</td>
            <td>{result.loss}</td>
            <td>{result.capitalEnd}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
