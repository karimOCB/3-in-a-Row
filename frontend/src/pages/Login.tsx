const Login = () => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <h1 className="mb-8 text-[6rem] font-extrabold text-slate-100 underline decoration-dashed decoration-[6px] underline-offset-8 decoration-fuchsia-600">
        3 In a Row
      </h1>
      <p className="mb-8 text-xl text-center max-w-[530px]">
        Introduce 2 usernames and gmails to start playing 3 in a row and be able
        to save your results against the same user.
      </p>

      <div className="flex gap-x-12">
        <div className="flex flex-col gap-y-4">
          <p className="text-center text-3xl">User 1</p>
          <input
            type="text"
            className="h-8 rounded-lg min-w-56 px-4 text-red-500"
            placeholder="Player O"
          />
          <input
            type="mail"
            className="h-8 rounded-lg min-w-56 px-4 text-red-500"
            placeholder="...@mail.com"
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <p className="text-center text-3xl">User 2</p>
          <input
            type="text"
            className="h-8 rounded-lg min-w-56 px-4 text-red-500"
            placeholder="Player X"
          />
          <input
            type="text"
            className="h-8 rounded-lg min-w-56 px-4 text-red-500"
            placeholder="...@mail.com"
          />
        </div>
      </div>

      <button className="mt-5 bg-blue-600 hover:bg-blue-800 text-lg transition-all duration-500">
        Start Game
      </button>
    </div>
  );
};

export default Login;
