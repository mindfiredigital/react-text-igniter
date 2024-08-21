import { useCallback } from 'react';

export const useTableOperations = (editorRef) => {
  // Function to insert a table into the editor
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

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(table);
      
      // Move cursor after the table
      range.setStartAfter(table);
      range.setEndAfter(table);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [editorRef]);

  // Function to add a new row to the selected table
  const addTableRow = useCallback(() => {
    const editor = editorRef.current;
    if (editor) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const table = range.startContainer.closest('table');
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

  // Function to add a new column to the selected table
  const addTableColumn = useCallback(() => {
    const editor = editorRef.current;
    if (editor) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const table = range.startContainer.closest('table');
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

  // Function to insert a layout (table with specific column widths)
  const insertLayout = useCallback((columns) => {
    const editor = editorRef.current;
    if (editor) {
      const table = document.createElement('table');
      table.className = 'layout-table';
      table.style.width = '100%';
      table.style.border = '1px solid #ccc';
      table.style.borderCollapse = 'collapse';

      const row = table.insertRow();
      columns.forEach(colWidth => {
        const cell = row.insertCell();
        cell.style.border = '1px solid #ccc';
        cell.style.padding = '10px';
        cell.style.width = `${colWidth}%`;
        cell.contentEditable = true;
      });

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(table);
      
      // Move cursor after the table
      range.setStartAfter(table);
      range.setEndAfter(table);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [editorRef]);

  return { insertTable, addTableRow, addTableColumn, insertLayout };
};