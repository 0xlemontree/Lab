import React, { useCallback } from "react";

import { saveAs } from "file-saver";

import { Table, Button, Form } from "react-bootstrap";

const ALPHABETs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const COLS = 12;
const ROWS = 8;

const generateGrid = () => {
  const grid = [];

  const header = [null];
  for (let j = 0; j < COLS; j += 1) {
    header.push(j + 1);
  }

  grid.push(header);

  for (let i = 0; i < ROWS; i += 1) {
    const row = [ALPHABETs[i]];

    for (let j = 0; j < COLS; j += 1) {
      row.push(null);
    }

    grid.push(row);
  }

  return grid;
};

const Plate = () => {
  const grid = generateGrid();

  const exportCSV = useCallback(() => {
    console.log("exporting...");

    const arr = [];

    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0; j < grid[0].length; j += 1) {
        if (!(i === 0 || j === 0)) {
          const loc = `${ALPHABETs[i - 1]}${j}`;
          const value = grid[i][j] ? `${grid[i][j]}` : "";
          arr.push(`${loc},${value}\n`);
        }
      }
    }

    const file = new File(arr, "plate.csv", {
      type: "text/csv;charset=utf-8",
    });

    saveAs(file);
  }, [grid]);

  const updateCell = useCallback(
    (i, j, value) => {
      grid[i][j] = value;
    },
    [grid]
  );

  return (
    <>
      <Button variant="primary" className="my-3" onClick={exportCSV}>
        Export
      </Button>{" "}
      <Table striped bordered hover>
        <tbody>
          {grid.map((row, i) => {
            return (
              <tr>
                {row.map((cell, j) => {
                  if (i === 0 || j === 0) {
                    return <td>{cell}</td>;
                  }
                  return (
                    <td>
                      <Form>
                        <Form.Control
                          placeholder=""
                          value={cell}
                          onChange={(e) => updateCell(i, j, e.target.value)}
                        />
                      </Form>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Plate;
