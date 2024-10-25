import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './routes/HomePage'
import AnnouncementsPage from './routes/AnnouncementsPage';
import PartnersPage from './routes/PartnersPage';
import SignInPage from './routes/SignInPage';
// import StudentView from './routes/StudentView';
import StudentViewScholarship from './pages/StudentView/StudentViewScholarship';
import StudentViewDashboard from './pages/StudentView/StudentViewDashboard';
import StudentViewAnnouncments from './pages/StudentView/StudentViewAnnouncements';
import StudentViewContact from './pages/StudentView/StudentViewContact';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>            
          <Route path='/' element={<HomePage/>}/>
          <Route path='home' index element={<HomePage/>}/>
          <Route path='announcements' element={<AnnouncementsPage/>}/>
          <Route path='partners' element={<PartnersPage/>}/>
          <Route path='signin' element={<SignInPage/>}/>
          <Route path='/studentview'>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path='scholarship' element={<StudentViewScholarship/>}/>
            <Route path='dashboard' element={<StudentViewDashboard/>}/>
            <Route path='announcements' element={<StudentViewAnnouncments/>}/>
            <Route path='contact' element={<StudentViewContact/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
