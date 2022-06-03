import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reducers/sessionSlice";
import { request } from "../utils/axios";
import { useFormik } from "formik";
import { loginSchema } from "../utils/validationSchema";

const Login = () => {
  const navigete = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      const loginUrl = "/user/login";
      try {
        const payload = await request("post", loginUrl, data);
        console.log(payload.user);
        dispatch(setUser(payload.user));
        //ログイン成功時
        navigete("/");
      } catch (error) {
        //ログイン失敗時
        console.log(error);
      }
    },
  });

  return (
    <div>
      <h3> Login </h3>
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
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
