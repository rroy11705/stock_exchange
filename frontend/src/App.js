import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'


function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Container>
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </div>
    </Router>
  );
}

export default App;
