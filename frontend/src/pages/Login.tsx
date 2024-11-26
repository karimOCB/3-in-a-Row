import { useState } from "react";
import { IMatch } from "../../types.ts";
import * as MatchesApi from "../../network/matches_api";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [credential, setCredential] = useState<IMatch>({
    username1: "",
    username2: "",
    email1: "",
    email2: ""
  });
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log(credential)
    try {
      const match = await MatchesApi.login(credential);  
      if(match) {
        navigate("/guide")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredential((prevCredential) => ({
      ...prevCredential,
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <h1 className="mb-8 text-[6rem] font-extrabold text-slate-100 underline decoration-dashed decoration-[6px] underline-offset-8 decoration-fuchsia-600">
        3 In a Row
      </h1>
      <p className="mb-8 text-[18px] text-center max-w-[590px]">
        Introduce 2 usernames and gmails to start playing 3 in a row, also known as tic-tac-toe, and be able
        to save your results against the same user.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col items-center">
        <div className="flex gap-x-12">
          <div className="flex flex-col gap-y-4">
            <p className="text-center text-3xl">User 1</p>
            <input
              type="text"
              name="username1"
              value={credential.username1}
              className="h-8 rounded-lg min-w-56 px-4 text-red-500"
              onChange={handleChange}
              placeholder="Player O"
              required
            />
            <input
              type="email"
              name="email1"
              value={credential.email1}
              className="h-8 rounded-lg min-w-56 px-4 text-red-500"
              onChange={handleChange}
              placeholder="...@mail.com"
              required
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="text-center text-3xl">User 2</p>
            <input
              type="text"
              name="username2"
              value={credential.username2}
              className="h-8 rounded-lg min-w-56 px-4 text-red-500"
              onChange={handleChange}
              placeholder="Player X"
              required
            />
            <input
              type="email"
              name="email2"
              value={credential.email2}
              className="h-8 rounded-lg min-w-56 px-4 text-red-500"
              onChange={handleChange}
              placeholder="...@mail.com"
              required
            />
          </div>
        </div>

        <button type="submit" className="mt-5 bg-blue-600 hover:bg-blue-800 text-lg transition-all duration-500">
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Login;
