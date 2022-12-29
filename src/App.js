import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Choice from "./Choice";
import calcWinner from "./calcWinner";
import { BsCircle, BsXLg } from "react-icons/bs";

function App() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(undefined);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const newSquares = current.squares.slice();
    if (calcWinner(current.squares) || current.squares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setHistory(
      newHistory.concat([
        {
          squares: newSquares,
        },
      ])
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderSquare = (i) => {
    return <Choice value={current.squares[i]} onClick={() => handleClick(i)} />;
  };

  let newHistory = history;
  const current = newHistory[stepNumber];
  const winner = calcWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <Button
          variant="outline-secondary"
          className="my-1"
          size="sm"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </Button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <Container>
      {xIsNext === undefined ? (
        <Container className="text-center my-4">
          <h1 className="text-warning bg-secondary rounded p-4 mb-0">
            Travel Trough Tic Tac Toe Game!
          </h1>
          <div className="bg-light rounded">
            <h3 className="pt-3">Choose your side!</h3>
            <Button
              className="me-3 border-0"
              size="lg"
              variant="outline-success"
              onClick={() => setXIsNext(false)}
            >
              <BsCircle />
            </Button>
            <Button
              className="border-0"
              size="lg"
              variant="outline-success"
              onClick={() => setXIsNext(true)}
            >
              <BsXLg />
            </Button>
          </div>
        </Container>
      ) : (
        <Container className="p-0">
          <div className="status rounded m-0 text-center text-secondary my-4">
            {status}
          </div>
        </Container>
      )}
      {xIsNext !== undefined && (
        <Container className="border">
          <Col>
            <Row className="border">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </Row>
            <Row className="border">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </Row>
            <Row className="border">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </Row>
          </Col>
        </Container>
      )}

      {xIsNext !== undefined && (
        <Container className="p-0">
          <Col className="mt-4">
            <h4 className="text-info bg-secondary rounded p-3 mb-0">
              Let's travel through your moves back and forward!
              <br />
              <span className="text-warning"> Choose one move</span>
            </h4>
            <ol className="px-4 py-2 bg-light rounded">{moves}</ol>
          </Col>
        </Container>
      )}
    </Container>
  );
}

export default App;
