import { Button, Empty, Result } from "antd";
import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您的页面丢失."
      extra={<Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>}
    />
  );
}
