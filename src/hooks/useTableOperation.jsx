import { useCallback } from "react";

export const useTableOperations = (editorRef) => {
  const insertTable = useCallback((rows = 2, cols = 2) => {
    const editor = editorRef.current;
    if (editor) {
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.border = '1px solid #ccc';
      table.style.borderCollapse = 'collapse';

      for (let i = 0; i < rows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < cols; j++) {
          const cell = row.insertCell();
          cell.style.border = '1px solid #ccc';
          cell.style.padding = '5px';
          cell.style.height = '30px';
          cell.style.width = `${100 / cols}%`;
          cell.contentEditable = true;
        }
      }

      editor.appendChild(table);
      editor.appendChild(document.createElement('br'));
    }
  }, [editorRef]);

  const addTableRow = useCallback(() => {
    const editor = editorRef.current;
    if (editor) {
      const table = editor.querySelector('table');
      if (table) {
        const newRow = table.insertRow();
        const cellCount = table.rows[0].cells.length;
        for (let i = 0; i < cellCount; i++) {
          const cell = newRow.insertCell();
          cell.style.border = '1px solid #ccc';
          cell.style.padding = '5px';
          cell.style.height = '30px';
          cell.contentEditable = true;
        }
      }
    }
  }, [editorRef]);

  const addTableColumn = useCallback(() => {
    const editor = editorRef.current;
    if (editor) {
      const table = editor.querySelector('table');
      if (table) {
        const rowCount = table.rows.length;
        for (let i = 0; i < rowCount; i++) {
          const cell = table.rows[i].insertCell();
          cell.style.border = '1px solid #ccc';
          cell.style.padding = '5px';
          cell.style.height = '30px';
          cell.contentEditable = true;
        }
        const cellCount = table.rows[0].cells.length;
        for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < cellCount; j++) {
            table.rows[i].cells[j].style.width = `${100 / cellCount}%`;
          }
        }
      }
    }
  }, [editorRef]);

  const insertLayout = useCallback((columns) => {
    const editor = editorRef.current;
    if (editor) {
      const table = document.createElement('table');
      table.className = 'layout-table';
      table.style.width = '100%';
      table.style.border = '1px solid #ccc';
      table.style.borderCollapse = 'collapse';

      const row = table.insertRow();
      columns.forEach((colWidth) => {
        const cell = row.insertCell();
        cell.style.border = '1px solid #ccc';
        cell.style.padding = '5px';
          cell.style.height = '30px';
        cell.style.width = `${colWidth}%`;
        cell.contentEditable = true;
      });

      editor.appendChild(table);
      editor.appendChild(document.createElement('br'));
    }
  }, [editorRef]);

  return { insertTable, addTableRow, addTableColumn, insertLayout };
};
