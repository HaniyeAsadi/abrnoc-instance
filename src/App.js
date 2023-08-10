import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/sidebar" element={<Sidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
