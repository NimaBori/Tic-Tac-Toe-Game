import Col from "react-bootstrap/Col";

import { BsCircle, BsXLg } from "react-icons/bs";

function Choice({ value, onClick }) {
  return (
    <Col className="p-0 border">
      <button className="square bg-light" onClick={() => onClick()}>
        {value === "O" && (
          <BsCircle style={{ color: "green" }} className="icon" />
        )}
        {value === "X" && (
          <BsXLg style={{ color: "crimson" }} className="icon" />
        )}
      </button>
    </Col>
  );
}

export default Choice;
