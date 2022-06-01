import { request } from "../utils/axios";

const CreateTask = () => {
  const send = () => {
    request("post", "/task/createTask", {
      title: "제목",
      content: "시발",
      deadLine: "sdfsdf",
    });
  };
  return (
    <div>
      <button onClick={send}>전송</button>
    </div>
  );
};

export default CreateTask;
