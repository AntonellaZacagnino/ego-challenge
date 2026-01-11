import './App.scss'
import { Routes, Route } from 'react-router-dom';
import ListModels from './components/ListModels/ListModels';
import Navbar from './components/navbar/navbar';
import ModelDetails from './pages/ModelDetails/ModelDetails';

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <section className='main-container'>
            <h1>Descubrí todos los modelos</h1>
            <ListModels />
          </section>
        } />
        <Route path="/modelo/:id" element={<ModelDetails />} />
      </Routes>
      <footer></footer>
    </>
  )
}

export default App
