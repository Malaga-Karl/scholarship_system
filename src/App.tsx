import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './routes/HomePage'
import AnnouncementsPage from './routes/AnnouncementsPage';
import PartnersPage from './routes/PartnersPage';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>            
          <Route path='/' element={<HomePage/>}/>
          <Route path='home' index element={<HomePage/>}/>
          <Route path='announcements' element={<AnnouncementsPage/>}/>
          <Route path='partners' element={<PartnersPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
