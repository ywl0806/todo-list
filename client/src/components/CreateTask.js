import { useDispatch } from "react-redux";
import { addTask, selectTask } from "../reducers/taskSlice";
import { request } from "../utils/axios";
import { useFormik } from "formik";
import { taskSchema } from "../utils/validationSchema";

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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <span role="alert">{formik.errors.title}</span>
          )}
        </div>
        <div>
          <label htmlFor="content">content </label>
          <textarea
            type="text"
            id="content"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            {...formik.getFieldProps("content")}
          />
          {formik.touched.content && formik.errors.content && (
            <span role="alert">{formik.errors.content}</span>
          )}
        </div>
        <div>
          <label htmlFor="deadLine">Dead Line </label>
          <input
            id="deadLine"
            type="datetime-local"
            name="deadLine"
            value={formik.values.deadLine}
            onChange={formik.handleChange}
            {...formik.getFieldProps("deadLine")}
          />
          {formik.touched.deadLine && formik.errors.deadLine && (
            <span role="alert">{formik.errors.deadLine}</span>
          )}
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
