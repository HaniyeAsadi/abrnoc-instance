import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Sidebar from './components/Sidebar';
import Instances from './pages/Instance';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Instances />} />
      </Routes>
    </Router>
  );
}

export default App;
