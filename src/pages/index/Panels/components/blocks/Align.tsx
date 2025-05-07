import { Button } from "antd";

const Align = () => {
  const handleAlign = () => {
    console.log('align');
  }
  return <div>
    <Button onClick={handleAlign}>对齐</Button>
  </div>
}

export default Align;