import { useDispatch } from "react-redux";
import { addTask, selectTask } from "../reducers/taskSlice";
import { request } from "../utils/axios";
import { useFormik } from "formik";
import { taskSchema } from "../utils/validationSchema";
import "./TaskForm.css";
const CreateTask = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      deadLine: "",
    },
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      try {
        const res = await request("post", "/task/createTask", values);
        dispatch(addTask(res));
        dispatch(selectTask({ task: res, index: 0 }));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="task-inputContainer">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group row task-inputbox">
          <label className="col-sm-2 col-form-label" htmlFor="title">
            タイトル
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="title"
              placeholder="タイトル"
              value={formik.values.title}
              onChange={formik.handleChange}
              {...formik.getFieldProps("title")}
            />
          </div>

          {formik.touched.title && formik.errors.title && (
            <small className="text-danger" role="alert">
              {formik.errors.title}
            </small>
          )}
        </div>

        <div className="form-group row task-inputbox">
          <label className="col-sm-2 col-form-label" htmlFor="content">
            内容
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="content"
              name="content"
              rows="5"
              value={formik.values.content}
              onChange={formik.handleChange}
              {...formik.getFieldProps("content")}
            />
          </div>
        </div>

        <div className="form-group row task-inputbox">
          <label className="col-sm-2 col-form-label" htmlFor="deadLine">
            期限
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="deadLine"
              type="datetime-local"
              name="deadLine"
              value={formik.values.deadLine}
              onChange={formik.handleChange}
              {...formik.getFieldProps("deadLine")}
            />
          </div>
        </div>

        <div className="form-group row task-inputbox justify-content-end">
          <div className="col-sm-3">
            <button className="btn btn-primary" type="submit">
              追加
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
