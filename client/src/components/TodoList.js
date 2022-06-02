import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask } from "../reducers/taskSlice";
import { request } from "../utils/axios";
import ReactPaginate from "react-paginate";
const Items = ({ currentItems }) => {
  return (
    currentItems &&
    currentItems.map((task) => (
      <div key={task._id}>
        <span>{task.title} </span>
        <span>{task.deadLine}</span>
      </div>
    ))
  );
};
const TodoList = () => {
  const taskList = useSelector((state) => state.task.taskList);
  const dispatch = useDispatch();

  //完了済み
  const [isCompleted, setIsCompleted] = useState(false);
  const handleIsCompleted = () => setIsCompleted(!isCompleted);

  //期限切れ
  const [deadLineOverdue, setDeadLineOverdue] = useState(false);
  const handleDeadLineOverdue = () => setDeadLineOverdue(!deadLineOverdue);

  //現在のtask list
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const req = async () => {
      const payload = await request("post", "/task/todolist", {
        isCompleted,
        deadLineOverdue,
      });
      dispatch(setTask(payload));
    };
    try {
      req();
    } catch (error) {
      console.log(error);
    }
  }, [isCompleted, deadLineOverdue]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(taskList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(taskList.length / itemsPerPage));
  }, [itemOffset, taskList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % taskList.length;
    setItemOffset(newOffset);
  };
  return (
    <div>
      <label htmlFor="isCompleted">isCompleted</label>
      <input
        id="isCompleted"
        type="checkbox"
        checked={isCompleted}
        onChange={handleIsCompleted}
      ></input>
      <label htmlFor="deadLineOverdue">deadLineOverdue only</label>
      <input
        id="deadLineOverdue"
        type="checkbox"
        checked={deadLineOverdue}
        onChange={handleDeadLineOverdue}
      ></input>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default TodoList;
