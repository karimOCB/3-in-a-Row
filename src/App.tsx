import Gameboard from './gameboard';

function App() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <h1 className="mb-8 text-7xl">3 in a row</h1>
      <p className="mb-4 text-4xl">Introduce 2 names</p>
      <div className="flex gap-x-8">
        <input
          type="text"
          className="h-8 rounded-lg min-w-56 px-4 text-red-500"
          placeholder="Player X"
        />
        <input
          type="text"
          className="h-8 rounded-lg min-w-56 px-4 text-red-500"
          placeholder="Player O"
        />
      </div>
      <button className="mt-3 bg-blue-600 hover:bg-blue-800 transition-all duration-500">
        Start Game
      </button>
      {false && <Gameboard />}
    </div>
  );
}

export default App;
