import { useNavigate } from "react-router-dom";
import { request } from "../utils/axios";
import { useFormik } from "formik";
import { joinSchema } from "../utils/validationSchema";
import { Button, Col, Form, Row } from "react-bootstrap";
const Join = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: joinSchema,
    onSubmit: async (values) => {
      try {
        const res = await request("post", "/user/join", values);
        if (res.ok) {
          //登録成功
          navigate("/checkMail", {
            state: { email: values.email, name: values.name },
            replace: true,
          });
        } else {
          //登録失敗
          alert(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Row className="justify-content-xl-center">
      <Col md="5 form-container">
        <h3 className="font-weight-bold"> 会員登録 </h3>
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
            <Form.Label htmlFor="name">名前 </Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <small className="text-danger" role="alert">
                {formik.errors.name}
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
          <Form.Group className="md-3 mt-3 p-1">
            <Form.Label htmlFor="passwordConfirm">パスワード(確認)</Form.Label>
            <Form.Control
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              {...formik.getFieldProps("passwordConfirm")}
            />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
              <small className="text-danger" role="alert">
                {formik.errors.passwordConfirm}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mt-3">
            <Button type="submit">登録</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default Join;
