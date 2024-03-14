import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AddReportsPage from './pages/AddReportsPage';
import ViewSingleReportPage from './pages/ViewSingleReportPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='/add-reports' element={<AddReportsPage />} />
            <Route path="/reports/:id" element={<ViewSingleReportPage />} />
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
