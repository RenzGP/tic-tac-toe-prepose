export function calculate_winner(squares, board_size) {
  // rows
  for (let row = 0; row < board_size; row++) {
    const start = row * board_size;
    const line = squares.slice(start, start + board_size);
    if (all_equal(line)) return line[0];
  }

  // columns
  for (let col = 0; col < board_size; col++) {
    const line = [];
    for (let row = 0; row < board_size; row++) {
      line.push(squares[row * board_size + col]);
    }
    if (all_equal(line)) return line[0];
  }

  // diagonal top-left to bottom-right
  const diag1 = [];
  for (let i = 0; i < board_size; i++) {
    diag1.push(squares[i * board_size + i]);
  }
  if (all_equal(diag1)) return diag1[0];

  // diagonal top-right to bottom-left
  const diag2 = [];
  for (let i = 0; i < board_size; i++) {
    diag2.push(squares[i * board_size + (board_size - i - 1)]);
  }
  if (all_equal(diag2)) return diag2[0];

  return null;
}

function all_equal(line) {
  return line.every(val => val && val === line[0]);
}
