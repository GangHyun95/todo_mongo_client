import React, { useCallback } from "react";

const Form = React.memo(({ todoValue, setTodoValue, addTodoSubmit }) => {
  // console.log("Form Rendering...");
  const changeTodoValue = useCallback(
    (event) => {
      // console.log(event.target.value);
      setTodoValue(event.target.value);
    },
    [setTodoValue]
  );
  return (
    <>
      <form onSubmit={addTodoSubmit} className="flex pt-2">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          className="w-full px-3 py-2 mr-4 text-gray-500 border-4 rounded outline-none"
          value={todoValue}
          onChange={changeTodoValue}
        />
        <input
          type="submit"
          value="추가"
          className="p-2 border-4 rounded hover:text-white hover:bg-gray-400 w-1/12"
        />
      </form>
    </>
  );
});
export default Form;
