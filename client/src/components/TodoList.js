import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTask, setTask } from "../reducers/taskSlice";
import { request } from "../utils/axios";
import ReactPaginate from "react-paginate";
import {
  ButtonGroup,
  FormControl,
  InputGroup,
  ToggleButton,
} from "react-bootstrap";
import moment from "moment";
import "./TodoList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const TodoList = () => {
  const taskList = useSelector((state) => state.task.taskList);
  const dispatch = useDispatch();
  const removed = useSelector((state) => state.task.removed);

  const selectedTask = useSelector((state) => state.task.currentTaskDetail);
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
  }, [isCompleted, deadLineOverdue, keyword, removed, dispatch]);

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
  const dateFormat = (IsoDate) => {
    const dt = moment.utc(IsoDate).toDate();
    const localDate = moment(dt).local().format("YYYY-MM-DD HH:mm:ss");

    return localDate;
  };
  const Items = ({ currentItems }) => {
    return (
      currentItems &&
      currentItems.map((task, index) => (
        <div
          className={`row mb-2 task-row ${
            selectedTask._id === task._id ? "selected-task" : null
          }`}
          key={task._id}
          onClick={(event) => onClickTask(task, index, event)}
        >
          <span className="col task-item">{task.writer.name}</span>
          <span className="col task-item">{task.title} </span>
          <span className="col task-item">
            {task.deadLine ? dateFormat(task.deadLine).slice(0, 10) : "-"}
          </span>
        </div>
      ))
    );
  };

  return (
    <div>
      <InputGroup className="mb-1 w-100">
        <InputGroup.Text id="search-label">検索</InputGroup.Text>
        <FormControl
          id="search"
          type="search"
          value={keyword}
          placeholder="search for..."
          onChange={handleKeyword}
        />
      </InputGroup>

      <ButtonGroup className="mb-3 w-100">
        <ToggleButton
          id="isCompleted"
          type="checkbox"
          variant="outline-dark"
          checked={isCompleted}
          onChange={handleIsCompleted}
        >
          完了済みを表示
        </ToggleButton>

        <ToggleButton
          id="deadLineOverdue"
          type="checkbox"
          variant="outline-dark"
          checked={deadLineOverdue}
          onChange={handleDeadLineOverdue}
        >
          期限超過のみ
        </ToggleButton>
      </ButtonGroup>
      <div>
        <div className="row border-bottom mb-3">
          <span className="col">writer</span>
          <span className="col">title</span>
          <span className="col">dead line</span>
        </div>
        <Items currentItems={currentItems} />
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          //class setting
          containerClassName="pagination justify-center" // ul(pagination本体)
          pageClassName="page-item" // li
          pageLinkClassName="page-link rounded-full" // a
          activeClassName="active" // active.li
          activeLinkClassName="active" // active.li < a
          // 戻る・進む関連
          previousClassName="page-item" // li
          nextClassName="page-item" // li
          previousLabel={<FontAwesomeIcon icon={faAngleLeft} />} // a
          previousLinkClassName="previous-link"
          nextLabel={<FontAwesomeIcon icon={faAngleRight} />} // a
          nextLinkClassName="next-link"
          // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
          disabledClassName="disabled-button d-none"
          // 中間ページの省略表記関連
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      </div>
    </div>
  );
};

export default TodoList;
