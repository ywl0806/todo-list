import { useNavigate } from "react-router-dom";
import { request } from "../utils/axios";
import { useFormik } from "formik";
import { joinSchema } from "../utils/validationSchema";
const Join = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
    joinSchema,
    onSubmit: async (values) => {
      try {
        const result = await request("post", "/user/join", values);
        if (result.go) {
          navigate("/checkMail", {
            state: { email: values.email, name: values.name },
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <h3> Join </h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <span role="alert">{formik.errors.email}</span>
          )}
        </div>
        <div>
          <label htmlFor="name">name </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <span role="alert">{formik.errors.name}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">password </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <span role="alert">{formik.errors.password}</span>
          )}
        </div>
        <div>
          <label htmlFor="passwordConfirm">password_verified </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            {...formik.getFieldProps("passwordConfirm")}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
            <span role="alert">{formik.errors.passwordConfirm}</span>
          )}
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default Join;
