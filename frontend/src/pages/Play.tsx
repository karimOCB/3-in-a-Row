// get the name and wins of the users
// implement the logic for the game 
const Play = () => {

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <header className="flex flex-col items-center mb-6 -mt-10">
        <h1 className="mb-8 text-[5rem] font-extrabold text-slate-100 underline decoration-dashed decoration-[6px] underline-offset-8 decoration-fuchsia-600">Play 3 in a Row</h1>
        <p className="text-[16px] text-center max-w-[420px]">Can you outsmart your opponent? Who will rise, dominate the board, and claim the title of Conqueror of the World?</p>
      </header>
      <h2 className="text-2xl mb-3">Matches:</h2>
      <div className="flex items-center justify-center">
        <div className="flex flex-col mr-10">
          <h2>User 1:</h2>
          <span>Win: </span>
        </div>
        <div className="grid grid-cols-3 w-72 h-72">
          <div className="grid grid-rows-3 border-2">
            <div className="border-b"></div>
            <div className="border-b"></div>
            <div></div>
          </div>
          <div className="grid grid-rows-3 border-r-2 border-y-2">
            <div className="border-b"></div>
            <div className="border-b"></div>
            <div></div>
          </div>
          <div className="grid grid-rows-3 border-y-2 border-r-2">
            <div className="border-b"></div>
            <div className="border-b"></div>
            <div></div>
          </div>
        </div>
        <div className="flex flex-col ml-10">
          <h2>User 2:</h2>
          <span>Win: </span>
        </div>
      </div>
    </div>
  );
}

export default Play