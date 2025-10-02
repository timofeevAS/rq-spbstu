// src/App.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, ListGroup } from 'react-bootstrap';
import seedrandom from 'seedrandom';

const students = [
  // группа 1
  { name: "Архипов Михаил Игоревич", groupNumber: 1 },
  { name: "Бабинов Александр Константинович", groupNumber: 1 },
  { name: "Бартлетт Майлз Патрик Нии Лантей", groupNumber: 1 },
  { name: "Биглер Павел Павлович", groupNumber: 1 },
  { name: "Бобин Кирилл Александрович", groupNumber: 1 },
  { name: "Брезгина Ольга Романовна", groupNumber: 1 },
  { name: "Дастанбу Матин", groupNumber: 1 },
  { name: "Емельянов Александр Андреевич", groupNumber: 1 },
  { name: "Жилкина Лада Михайловна", groupNumber: 1 },
  { name: "Климашова Юлия Сергеевна", groupNumber: 1 },
  { name: "Копац Алексей Дмитриевич", groupNumber: 1 },
  { name: "Макарова Полина Владиславовна", groupNumber: 1 },
  { name: "Перекрестов Глеб Владимирович", groupNumber: 1 },
  { name: "Приезжев Андрей Алексеевич", groupNumber: 1 },
  { name: "Рудько Михаил Андреевич", groupNumber: 1 },
  { name: "Савенко Маргарита Вадимовна", groupNumber: 1 },
  { name: "Сергиенко Кирилл Александрович", groupNumber: 1 },
  { name: "Тимофеев Александр Сергеевич", groupNumber: 1 },
  { name: "Черепанов Никита Иванович", groupNumber: 1 },
  { name: "Кондраев Дмитрий Евгеньевич", groupNumber: 1 },
  { name: "Заркали Рашид", groupNumber: 1 },

  // группа 2
  { name: "Аббаси Дорса", groupNumber: 2 },
  { name: "Афанасьев Борис", groupNumber: 2 },
  { name: "Афанасьева Алина", groupNumber: 2 },
  { name: "Бадашкеев Андрей", groupNumber: 2 },
  { name: "Балакирева Дарья", groupNumber: 2 },
  { name: "Волгузов Артем", groupNumber: 2 },
  { name: "Горюнов Максим", groupNumber: 2 },
  { name: "Елунина Александра", groupNumber: 2 },
  { name: "Карпович Лидия", groupNumber: 2 },
  { name: "Качур Антон", groupNumber: 2 },
  { name: "Коток Владислав", groupNumber: 2 },
  { name: "Марков Михаил", groupNumber: 2 },
  { name: "Ньянгва Джубиле", groupNumber: 2 },
  { name: "Мельников Николай", groupNumber: 2 },
  { name: "Попова Рината", groupNumber: 2 },
  { name: "Романчук Евгений", groupNumber: 2 },
  { name: "Садовников Дмитрий", groupNumber: 2 },
  { name: "Свиридов Артем", groupNumber: 2 },
  { name: "Сун Цзюньси", groupNumber: 2 },
  { name: "Гельфанд Анна", groupNumber: 2 }
];


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
  
    // shuffle all students to save order.
    const allShuffled = shuffleArray(
      students.map((student, index) => ({ student, index })),
      rng
    );
  
    // Exclude unselected students.
    const selected = allShuffled
      .filter(({ index }) => checkedStudents[index])
      .map(({ student }) => student);
  
    setRandomQueue(selected);
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
                  label={`${student.name}    (group: ${student.groupNumber})`}
                  checked={checkedStudents[index]}
                  onChange={() => handleCheckboxChange(index)}
                  className="me-2"
                  style={{
                    backgroundColor: student.groupNumber === 2 ? "#ffc7f2" : "#c7ffd4"
                  }}
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
                  {index + 1}. {student.name}
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
