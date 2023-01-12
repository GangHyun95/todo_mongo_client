import React from "react";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";

const List = React.memo(
  ({ todoData, setTodoData, deleteClick, loading, setLoading }) => {
    // console.log("List Rendering...");
    const { user } = useSelector((state) => state);
    return (
      <div>
        {todoData.map(
          (item) =>
            item.author.uid === user.uid && (
              <div key={item.id}>
                <ListItem
                  item={item}
                  todoData={todoData}
                  setTodoData={setTodoData}
                  deleteClick={deleteClick}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            )
        )}
      </div>
    );
  }
);

export default List;
