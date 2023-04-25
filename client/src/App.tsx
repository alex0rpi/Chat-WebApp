import { useEffect, useState } from 'react';
// import WelcomeChat from './pages/WelcomeChat';
// import PrivateChat from './pages/PrivateChat';
import { Phrase as PhraseModel } from './models/Phrase';
import PhraseComponent from './components/PhraseComponent';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/WelcomeChat.module.css';

function App() {
  const [phrases, setPhrases] = useState<PhraseModel[]>([]);

  useEffect(() => {
    async function loadPhrases() {
      try {
        const response = await fetch('/api/phrases', { method: 'GET' });
        const phrases = await response.json();
        setPhrases(phrases);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadPhrases();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {phrases.map((phr) => {
          <Col key={phr.id}>
            <PhraseComponent phrase={phr} className={styles.note} />
          </Col>;
        })}
      </Row>
    </Container>
  );
}

export default App;
