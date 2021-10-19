import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import StockDetailsScreen from './screens/StockDetailsScreen'
import TopGainersScreen from './screens/TopGainersScreen'
import TopLosersScreen from './screens/TopLosersScreen'
import LogInScreen from './screens/LogInScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'


function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/search/' component={SearchScreen} exact />
          <Route path='/stock/:id' component={StockDetailsScreen} />
          <Route path='/top-gainers' component={TopGainersScreen} />
          <Route path='/top-losers' component={TopLosersScreen} />
          <Route path='/login' component={LogInScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
        </Container>
      </div>
    </Router>
  );
}

export default App;
