
const Play = () => {
  return (
    <div className="grid grid-cols-3 w-60 h-60 mt-8">
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
  );
}

export default Play