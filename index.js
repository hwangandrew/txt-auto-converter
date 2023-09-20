const chokidar = require('chokidar');
const fs = require('fs');

// Define your column lengths here
const columnLengths = [5, 10, 11, 15, 75, 10, 15, 10, 50, 3, 25, 
  25, 20, 50, 10, 25, 10, 1, 10, 10, 10, 1, 30, 25, 15, 15, 15, 
  25, 15, 25, 8, 10, 10, 10, 90, 25, 35, 50, 35, 35, 35, 21, 35, 
  10, 10, 10, 15, 25, 4, 10, 10, 250, 1, 10, 10, 5 ];

// Initialize watcher
const watcher = chokidar.watch('C:\\Users\\andrew.hwang\\Documents\\txt-auto-converter\\input', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

// Add event listeners
watcher
  .on('add', path => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${path}:`, err);
        return;
      }

      const columns = parseFile(data);
      const csv = convertToCSV(columns);
      downloadCSV(csv);
    });
  });

function parseFile(content) {
  const lines = content.split('\n');
  return lines.map(line => {
    let pos = 0;
    return columnLengths.map(length => {
      const column = line.substr(pos, length);
      pos += length;
      return column.trim();
    });
  });
}

function convertToCSV(columns) {
  return columns.map(row => row.join(',')).join('\n');
}

function downloadCSV(csv) {
    fs.writeFile('C:\\Users\\andrew.hwang\\Documents\\txt-auto-converter\\output\\converted.csv', csv, err => {
      if (err) {
        console.error('Error writing CSV:', err);
      } else {
        console.log('CSV written successfully');
      }
    });
  }
