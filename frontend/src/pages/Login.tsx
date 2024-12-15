import { useState } from "react";
import { IMatch } from "../../types.ts";
import * as MatchesApi from "../network/matches_api.ts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [credential, setCredential] = useState<IMatch>({
    username1: "",
    username2: "",
    email1: "",
    email2: "",
    _id: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const nativeEvent = event.nativeEvent as SubmitEvent;
    const buttonClicked = nativeEvent.submitter as HTMLButtonElement;

    if (buttonClicked.name === "returnToMatch") {
      onSubmitLogin();
    } else if (buttonClicked.name === "createMatch") {
      onSubmitSignUp();
    }
  }

const onSubmitLogin = async () => {
  try {
    const response = await MatchesApi.login(credential);

    if (response.data) {
      navigate("/guide", { state: response.data });
    }
  } catch (error: unknown) { // Use `unknown` here
    if (error instanceof Error) {
      const errorMessage = error.message.split("message")
      console.log(errorMessage[1])
      setErrorMessage(errorMessage[1])
    }
  }
};

 const onSubmitSignUp = async () => {
    try {
      const response = await MatchesApi.signup(credential);

      if (response.data) {
        navigate("/guide", { state: response.data });
      }
    } catch (error) {
      if (error instanceof Error) {
          const errorMessage = error.message.split("message")
          console.log(errorMessage[1])
          setErrorMessage(errorMessage[1])
      }
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
      <div className={`flex w-screen h-screen justify-center items-center`}>
        <div className={`flex flex-col items-center max-sm:px-2 ${errorMessage ? "opacity-20" : ""}`}>
          <h1 className="mb-8 sm:text-[6rem] font-extrabold text-slate-100 underline decoration-dashed decoration-[6px] underline-offset-8 decoration-fuchsia-600">
            3 In a Row
          </h1>
          <p className="mb-8 sm:text-[18px] text-center max-w-[300px] sm:max-w-[590px]">
            Introduce 2 usernames and mails to start playing 3 in a row, also known as tic-tac-toe, and be able
            to save your results against the same user.
          </p>
          <form onSubmit={onSubmit} className="flex flex-col items-center">
            <div className="flex sm:gap-x-12">
              <div className="flex flex-col items-center gap-y-4">
                <p className="text-center sm:text-3xl">User 1</p>
                <input
                  type="text"
                  name="username1"
                  value={credential.username1}
                  className="h-8 rounded-lg w-[80%] sm:min-w-56 px-4 text-red-500"
                  onChange={handleChange}
                  placeholder="Player O"
                  required
                />
                <input
                  type="email"
                  name="email1"
                  value={credential.email1}
                  className="h-8 rounded-lg w-[80%] sm:min-w-56 px-4 text-red-500"
                  onChange={handleChange}
                  placeholder="...@mail.com"
                  required
                />
              </div>
              <div className="flex flex-col items-center gap-y-4">
                <p className="text-center sm:text-3xl">User 2</p>
                <input
                  type="text"
                  name="username2"
                  value={credential.username2}
                  className="h-8 rounded-lg w-[80%] sm:min-w-56 px-4 text-red-500"
                  onChange={handleChange}
                  placeholder="Player X"
                  required
                />
                <input
                  type="email"
                  name="email2"
                  value={credential.email2}
                  className="h-8 rounded-lg w-[80%] sm:min-w-56 px-4 text-red-500"
                  onChange={handleChange}
                  placeholder="...@mail.com"
                  required
                />
              </div>
            </div>
            <div>
              <input
                type={passwordVisibility ? "text" : "password"}
                name="password"
                value={credential.password}
                className="h-8 rounded-lg min-w-[30%] sm:min-w-56 px-4 mt-4 text-red-500"
                onChange={handleChange}
                placeholder="Match Password"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisibility(prevState => !prevState)}
                className="cursor-pointer border border-gray-500 py-1 px-2 ml-4"
                style={{ background: "none" }}
              >
                {passwordVisibility ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <div className="space-x-4">
              <button type="submit" name="returnToMatch" className="mt-5 bg-blue-600 hover:bg-blue-800 text-lg transition-all duration-500">
                Return to Match
              </button>
              <button type="submit" name="createMatch" className="mt-5 bg-blue-600 hover:bg-blue-800 text-lg transition-all duration-500">
                Create Match
              </button>
            </div>
          </form>
        </div>
        {errorMessage && 
          <div className="absolute w-[50%] h-[30%] border-2 rounded-xl bg-slate-300 flex justify-center items-center border-red-400 cursor-pointer" onClick={() => setErrorMessage(null)}>
            <p className="text-xl sm:text-3xl text-center text-fuchsia-900 font-semibold px-10">
             {errorMessage}
            </p>
          </div>
        }
      </div>
  );
};

export default Login;
