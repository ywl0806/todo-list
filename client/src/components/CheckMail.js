import { useLocation } from "react-router-dom";

const CheckMail = () => {
  const { name, email } = useLocation().state;
  return (
    <div>
      <h1>
        {name}さん！　{email}に届いたメールを確認してください。
      </h1>
    </div>
  );
};

export default CheckMail;
