import React from "react";
import "./TableViewer.scss";

const Cell = ({ data, className }) => {
  return (
    <input
      className={`table_viewer__cell ${className}`}
      value={data}
      onChange={() => console.log("on Change")}
    />
  );
};

const TableViewer = ({ fileData }) => {
  return (
    <div className="table_viewer">
      <div key={fileData.columns} className="table_viewer__cell-row">
        <input className="table_viewer__row-number" disabled={true} value={0} />
        {fileData.columns.map((columnName) => (
          <Cell
            key={`column-${columnName}`}
            className={`table_viewer__cell--column-name ${
              columnName.toLowerCase() === "select"
                ? "table_viewer__cell--column-select"
                : ""
            } `}
            data={columnName}
          />
        ))}
      </div>

      {fileData.data.map((row, idx) => (
        <div key={`row-${idx}`} className="table_viewer__cell-row">
          <input
            className="table_viewer__row-number"
            disabled={true}
            value={idx + 1}
          />
          {fileData.columns.map((columnName) => (
            <Cell key={`cell-${idx}-${columnName}`} data={row[columnName]} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableViewer;
