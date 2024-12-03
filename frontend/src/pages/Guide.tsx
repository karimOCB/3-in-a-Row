import { Link, useLocation } from "react-router-dom"

const Guide = () => {
  const location = useLocation()

  const StrategyItem = ({ title, children }: {title: string, children: string }) => (
    <li className="mb-4">
      <span className="font-semibold text-purple-100">{title}:</span>{' '}
      {children}
    </li>
  );

  return (
    <div className="flex w-screen bg-gray-900 py-12 px-4">
      <div className="max-w-[52rem] mx-auto py-10 px-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-2xl">
        <h1 className="text-5xl font-bold text-center pb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
          Play 3 in a Row
        </h1>

        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            "3 in a Row" (also known as Tic-Tac-Toe) is a simple but strategic game 
            that often gets intense as players start to understand the logic and 
            patterns that lead to victory.
          </p>

          <p className="text-lg leading-relaxed">
            The objective is to get three of your marks (either "X" or "O") in a row, 
            either horizontally, vertically, or diagonally, before your opponent does.
          </p>

          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-6 text-purple-100">
              Winning Strategy
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Once you understand the basic strategy of Tic-Tac-Toe, you'll find that 
              the game often ends in a draw between skilled players. However, if one 
              player is not familiar with the logic, the other can exploit mistakes 
              and win consistently.
            </p>

            <div className="bg-black bg-opacity-20 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-200">
                Master these strategies to dominate:
              </h3>
              <ul className="space-y-4 list-none">
                <StrategyItem title="First Move Advantage">
                  Always start in the center or a corner. The center gives the most 
                  control over the game, and the corners provide the best potential 
                  for multiple winning combinations.
                </StrategyItem>
                <StrategyItem title="Block and Counter">
                  Always watch for ways to block your opponent from completing a line 
                  of three. If they have two marks in a row, place your mark in the 
                  third space to prevent their win.
                </StrategyItem>
                <StrategyItem title="Create Forks">
                  A fork occurs when you set up two potential winning lines 
                  simultaneously, forcing your opponent to block one and leaving the 
                  other open for you to win.
                </StrategyItem>
                <StrategyItem title="Control the Center">
                  The center participates in the most potential winning lines. Control 
                  it, and you'll have more options for setting up future moves.
                </StrategyItem>
                <StrategyItem title="Play Defensively">
                  Against skilled opponents, focus on both offensive moves and their 
                  possible responses. Anticipating their strategy and blocking at the 
                  right moment is crucial.
                </StrategyItem>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-4 text-purple-200">
              Ready to Become the Champion?
            </h2>
            <p className="text-lg leading-relaxed">
              Master these strategies and understand the game's logic to become 
              unbeatable at Tic-Tac-Toe—winning consistently or ensuring draws 
              against skilled opponents.
            </p>
            <div className="mt-8 text-center">
                <button 
                  className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold 
                            text-lg transform transition-transform duration-200 
                            hover:scale-105 hover:shadow-lg"
                  
                >
                  <Link to={"/matches"} state={location.state}>
                    Start Playing Now
                  </Link>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;