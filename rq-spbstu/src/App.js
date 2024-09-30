// src/App.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, ListGroup } from 'react-bootstrap';
import seedrandom from 'seedrandom';

const students = [
  'Турбина Анастасия',
  'Калугин Евгений',
  'Тимофеев Александр',
  'Важенина Екатерина',
  'Гуй Цици',
  'Доах Тхань Тунг',
  'Нгуен Куок Дат',
  'Иванов Михаил',
  'Черепанов Михаил',
  'Филонов Иван',
  'Савенко Маргарита',
  'Гусева Станислава',
  'Брезгина Ольга',
  'Черданцев Артем',
  'Олейник Кристина',
  'Орлов Игорь',
  'Кондраев Дмитрий'
].sort();

function shuffleArray(array, rng) {
  /*
  Implements Fisher-Yates algorithm.
  
  [1]
  -- To shuffle an array a of n elements (indices 0..n-1):
  for i from n−1 down to 1 do
     j ← random integer such that 0 ≤ j ≤ i
     exchange a[j] and a[i]

  https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm [1]
  */
  const result = [...array]; 
  for (let i = result.length - 1; i > 0; i--) {
    // Choose random idx from [0; i]
    const j = Math.floor(rng() * (i + 1));
    
    // Swap i, j elements;
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result; // Shuffeled array.
}

function App() {
  const [checkedStudents, setCheckedStudents] = useState(
    students.map(() => false)
  );
  const [randomQueue, setRandomQueue] = useState([]);
  const [seed, setSeed] = useState('');

  useEffect(() => {
    const dateSeed = new Date().toLocaleDateString('ru-RU');
    setSeed(dateSeed);
  }, []);

  const handleSeedChange = (e) => {
    setSeed(e.target.value);
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedStudents = [...checkedStudents];
    updatedCheckedStudents[index] = !updatedCheckedStudents[index];
    setCheckedStudents(updatedCheckedStudents);
  };

  const generateQueue = () => {
    const rng = seedrandom(seed);
    const selectedStudents = students.filter(
      (_, index) => checkedStudents[index]
    );
    const shuffled = shuffleArray(selectedStudents, rng);
    setRandomQueue(shuffled);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Seed</Form.Label>
            <Form.Control
              type="text"
              value={seed}
              onChange={handleSeedChange}
            />
          </Form.Group>
          <Button onClick={generateQueue} className="mb-3">
            Generate
          </Button>

          <h3>Select students:</h3>
          <ListGroup>
            {students.map((student, index) => (
              <ListGroup.Item key={index}>
                <Form.Check
                  type="checkbox"
                  label={student}
                  checked={checkedStudents[index]}
                  onChange={() => handleCheckboxChange(index)}
                  className="me-2"
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={6}>
          <h3>Result:</h3>
          {randomQueue.length > 0 ? (
            <ListGroup>
              {randomQueue.map((student, index) => (
                <ListGroup.Item key={index}>
                  {index + 1}. {student}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Click 'generate' with selected students.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
