import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} exact />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;