import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTask, setTask } from "../reducers/taskSlice";
import { request } from "../utils/axios";
import ReactPaginate from "react-paginate";

const TodoList = () => {
  const taskList = useSelector((state) => state.task.taskList);
  const dispatch = useDispatch();

  //完了済み
  const [isCompleted, setIsCompleted] = useState(false);
  const handleIsCompleted = () => setIsCompleted(!isCompleted);

  //期限切れ
  const [deadLineOverdue, setDeadLineOverdue] = useState(false);
  const handleDeadLineOverdue = () => setDeadLineOverdue(!deadLineOverdue);

  //検索keyword
  const [keyword, setKeyword] = useState("");
  const handleKeyword = (e) => setKeyword(e.target.value);
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
        keyword,
      });
      dispatch(setTask(payload));
    };
    try {
      req();
    } catch (error) {
      console.log(error);
    }
  }, [isCompleted, deadLineOverdue, keyword]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(taskList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(taskList.length / itemsPerPage));
  }, [itemOffset, taskList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % taskList.length;
    setItemOffset(newOffset);
  };

  const onClickTask = (task, index) => {
    dispatch(selectTask({ task, index: index + itemOffset }));
    console.log(`${task.title} is selected`);
  };

  const Items = ({ currentItems }) => {
    return (
      currentItems &&
      currentItems.map((task, index) => (
        <div key={task._id}>
          <span onClick={() => onClickTask(task, index)}>{task.title} </span>
          <span>{task.deadLine}</span>
        </div>
      ))
    );
  };

  return (
    <div>
      <div>
        <label htmlFor="search">search </label>
        <input
          id="search"
          type="search"
          value={keyword}
          placeholder="search for..."
          onChange={handleKeyword}
        ></input>
      </div>
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
      </div>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default TodoList;
