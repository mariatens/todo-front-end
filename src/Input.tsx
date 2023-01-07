interface InputProps{
    input: string;
    handleToDoInput: (toDoInput: string) => void;
    handleEnter: () => Promise<void>;
}

export function Input({input, handleEnter, handleToDoInput}: InputProps): JSX.Element {
    return (
<div className="input-div">
          <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleEnter();
              console.log("key working");
            }
          }}
            className="inputBox"
            placeholder="Write your task here"
            value={input}
            onChange={(event) => {
              handleToDoInput(event.target.value);
            }}
          ></textarea>
          <span>
            <button tabIndex = {0}
              className="add-button"
              onClick={handleEnter}
            >
              <span className="plus-sign">+</span>
            </button>
          </span>
        </div>
    )

}