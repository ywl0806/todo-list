import * as yup from "yup";

export const joinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Emailを入力してください")
    .required("メールの入力が必要です。"),
  name: yup
    .string()
    .min(2, "名前は2文字以上入力してください。")
    .required("名前の入力が必要です。"),
  password: yup
    .string()
    .min(8, "パスワードは8文字以上、32文字以内で入力してください。")
    .max(32, "パスワードは8文字以上、32文字以内で入力してください。")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,32}$/,
      "半角英数字混合のパスワードを入力してください。"
    )
    .required("パスワードの入力が必要です。"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "パスワードが一致しません。")
    .required("パスワードの入力が必要です。"),
  title: yup
    .string()
    .max(64, "64文字以内で入力してください。")
    .required("入力が必要です。"),
});
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Emailを入力してください")
    .required("メールの入力が必要です。"),
  password: yup
    .string()
    .min(8, "パスワードは8文字以上、32文字以内で入力してください。")
    .max(32, "パスワードは8文字以上、32文字以内で入力してください。")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,32}$/,
      "半角英数字混合のパスワードを入力してください。"
    )
    .required("パスワードの入力が必要です。"),
});

export const taskSchema = yup.object().shape({
  title: yup
    .string()
    .max(64, "64文字以内で入力してください。")
    .required("入力が必要です。"),
});
