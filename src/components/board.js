import { useState, useEffect } from 'react';
import Square from './square';
import { calculate_winner } from '../utils/calculate_winner';

export default function Board() {
  const board_size = 3;
  const [squares, set_squares] = useState(Array(board_size * board_size).fill(null));
  const [x_is_next, set_x_is_next] = useState(true);
  const [x_score, set_x_score] = useState(0);
  const [o_score, set_o_score] = useState(0);
  const [draw_count, set_draw_count] = useState(0);

  const winner = calculate_winner(squares, board_size);
  const is_draw = !winner && squares.every(square => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (is_draw) {
    status = `It's a draw!`;
  } else {
    status = `Next player: ${x_is_next ? 'X' : 'O'}`;
  }

  useEffect(() => {
    if (winner) {
      winner === 'X'
        ? set_x_score((prev) => prev + 1)
        : set_o_score((prev) => prev + 1);
    } else if (is_draw) {
      set_draw_count((prev) => prev + 1);
    }
  }, [winner, is_draw]);

  function handle_click(i) {
    if (squares[i] || winner) return;
    const next_squares = [...squares];
    next_squares[i] = x_is_next ? 'X' : 'O';
    set_squares(next_squares);
    set_x_is_next(!x_is_next);
  }

  function handle_restart() {
    set_squares(Array(board_size * board_size).fill(null));
    set_x_is_next(true);
  }

  function handle_reset_scores() {
    set_x_score(0);
    set_o_score(0);
    set_draw_count(0);
  }

  return (
    <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Scoreboard</h2>

      <div className="grid grid-cols-3 gap-4 text-sm font-semibold mb-4">
        <div className="bg-blue-100 rounded p-2">X Wins: {x_score}</div>
        <div className="bg-gray-100 rounded p-2">Draws: {draw_count}</div>
        <div className="bg-red-100 rounded p-2">O Wins: {o_score}</div>
      </div>

      <button
        onClick={handle_reset_scores}
        className="mb-6 px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
      >
        🔄 Reset Scores
      </button>

      <div className="mb-4 text-lg font-semibold">{status}</div>

      <div
        className="grid gap-1 w-fit mx-auto mb-4"
        style={{ gridTemplateColumns: `repeat(${board_size}, 5rem)` }}
      >
        {squares.map((val, i) => (
          <Square key={i} value={val} on_click={() => handle_click(i)} />
        ))}
      </div>

      <button
        onClick={handle_restart}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        🔁 Restart Game
      </button>
    </div>
  );
}
