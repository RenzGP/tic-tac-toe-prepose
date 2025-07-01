import Head from 'next/head';
import Board from '@/components/board';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Head>
        <title>Tic-Tac-Toe</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Tic-Tac-Toe Game</h1>
      <Board />
    </div>
  );
}
