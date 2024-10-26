document.getElementById('generate').addEventListener('click', function() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    const tableContainer = document.getElementById('table-container');
  
    tableContainer.innerHTML = '';
    if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1) {
      alert('Please enter valid numbers for rows and columns.');
      return;
    }
    const table = document.createElement('table');
    
    for (let i = 0; i < rows; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement('td');
        cell.textContent = `( ${i + 1}, ${j + 1} )`;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  
    // Thêm bảng vào bảng chứa
    tableContainer.appendChild(table);
  });
  