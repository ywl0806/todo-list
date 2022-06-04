import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reducers/sessionSlice";
import { request } from "../utils/axios";
import { useFormik } from "formik";
import { loginSchema } from "../utils/validationSchema";
import { Button, Col, Form, Row } from "react-bootstrap";

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
        const res = await request("post", loginUrl, data);
        console.log(res.user);
        dispatch(setUser(res.user));
        //ログイン成功時
        navigete("/");
      } catch (error) {
        //ログイン失敗時
        console.log(error);
      }
    },
  });

  return (
    <Row className="justify-content-xl-center">
      <Col md="5 form-container">
        <h3 className="font-weight-bold"> login </h3>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="md-3 mt-3 p-1">
            <Form.Label id="email">メールアドレス</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger" role="alert">
                {formik.errors.email}
              </small>
            )}
          </Form.Group>

          <Form.Group className="md-3 mt-3 p-1">
            <Form.Label htmlFor="password">パスワード </Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-danger" role="alert">
                {formik.errors.password}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mt-3">
            <Button type="submit">login</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
