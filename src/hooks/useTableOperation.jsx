import { useCallback } from "react";

export const useTableOperations = (editorRef) => {
  const insertTable = useCallback((rows = 2, cols = 2) => {
    const activeBlock = document.querySelector(".editor-block.active");
    if (activeBlock) {
      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.height = "30px";
      table.style.border = "1px solid #ccc";
      table.style.borderCollapse = "collapse";

      for (let i = 0; i < rows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < cols; j++) {
          const cell = row.insertCell();
          cell.style.border = "1px solid #ccc";
          cell.style.padding = "5px";
          cell.style.height = `${100 / rows}%`;
          cell.style.width = `${100 / cols}%`;

          // Create a contenteditable div inside each cell
          const div = document.createElement("div");
          div.contentEditable = true;
          div.style.width = "100%";
          div.style.height = "30px";
          div.style.outline = "none"; // Remove the focus outline
          cell.appendChild(div);
        }
      }

      // Clear the active block and append the table
      activeBlock.innerHTML = "";
      activeBlock.appendChild(table);

      // Focus on the first cell's div
      const firstCell = table.rows[0].cells[0];
      const firstDiv = firstCell.querySelector("div");
      firstDiv.focus();
    }
  }, []);

  // add new row to table
  const addTableRow = useCallback(() => {
    const activeBlock = document.querySelector(".editor-block.active");
    if (activeBlock) {
      const table = activeBlock.querySelector("table");
      if (table) {
        const newRow = table.insertRow();
        const cellCount = table.rows[0].cells.length;
        for (let i = 0; i < cellCount; i++) {
          const cell = newRow.insertCell();
          cell.style.border = "1px solid #ccc";
          cell.style.padding = "5px";

          const div = document.createElement("div");
          div.contentEditable = true;
          div.style.width = "100%";
          div.style.height = "30px";
          div.style.outline = "none";
          cell.appendChild(div);
        }

        // Adjust heights of all rows
        const rowCount = table.rows.length;
        for (let i = 0; i < rowCount; i++) {
          table.rows[i].style.height = `${100 / rowCount}%`;
        }
      }
    }
  }, []);

  // add new column to table
  const addTableColumn = useCallback(() => {
    const activeBlock = document.querySelector(".editor-block.active");
    if (activeBlock) {
      const table = activeBlock.querySelector("table");
      if (table) {
        const rowCount = table.rows.length;
        const cellCount = table.rows[0].cells.length;
        for (let i = 0; i < rowCount; i++) {
          const cell = table.rows[i].insertCell();
          cell.style.border = "1px solid #ccc";
          cell.style.padding = "5px";

          const div = document.createElement("div");
          div.contentEditable = true;
          div.style.width = "100%";
          div.style.height = "30px";
          div.style.outline = "none";
          cell.appendChild(div);
        }

        // Adjust widths of all cells
        for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < cellCount + 1; j++) {
            table.rows[i].cells[j].style.width = `${100 / (cellCount + 1)}%`;
          }
        }
      }
    }
  }, []);

  // insert a layout with specified columns
  const insertLayout = useCallback((columns) => {
    const activeBlock = document.querySelector(".editor-block.active");
    if (activeBlock) {
      const table = document.createElement("table");
      table.className = "layout-table";
      table.style.width = "100%";
      table.style.height = "40px"; // Adjust as needed
      table.style.border = "1px solid #ccc";
      table.style.borderCollapse = "collapse";

      const row = table.insertRow();
      columns.forEach((colWidth) => {
        const cell = row.insertCell();
        cell.style.border = "1px solid #ccc";
        cell.style.padding = "10px";
        cell.style.width = `${colWidth}%`;

        const div = document.createElement("div");
        div.contentEditable = true;
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.outline = "none";
        div.addEventListener("focus", () => {
          cell.style.border = "2px solid blue";
        });
        div.addEventListener("blur", () => {
          cell.style.border = "1px solid #ccc";
        });
        cell.appendChild(div);
      });

      activeBlock.innerHTML = "";
      activeBlock.appendChild(table);

      // Focus on the first cell's div
      const firstCell = table.rows[0].cells[0];
      const firstDiv = firstCell.querySelector("div");
      firstDiv.focus();
    }
  }, []);

  return { insertTable, addTableRow, addTableColumn, insertLayout };
};
