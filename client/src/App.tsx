import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './routes/HomePage'
import AnnouncementsPage from './routes/AnnouncementsPage';
import PartnersPage from './routes/PartnersPage';
import SignInPage from './routes/SignInPage';
// import StudentView from './routes/StudentView';
import StudentViewScholarship from './pages/StudentView/StudentViewScholarship';
import StudentViewAnnouncments from './pages/StudentView/StudentViewAnnouncements';
import StudentViewContact from './pages/StudentView/StudentViewContact';
import NotFoundPage from './routes/PageNotFound';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>            
          <Route path='/' element={<HomePage/>}/>
          <Route path='home' index element={<HomePage/>}/>
          <Route path='announcements' element={<AnnouncementsPage/>}>
            <Route path=':id' element={<AnnouncementsPage/>}/>
          </Route>
          <Route path='partners' element={<PartnersPage/>}>
            <Route path=':id' element={<PartnersPage/>}/>
          </Route>  
          <Route path='signin' element={<SignInPage/>}/>
          <Route path='/studentview'>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path='dashboard' element={<StudentViewScholarship/>}>
              <Route path='apply/:id' element={<StudentViewScholarship/>}/>
            </Route>
            {/* <Route path='dashboard' element={<StudentViewDashboard/>}/> */}
            <Route path='announcements' element={<StudentViewAnnouncments/>}/>
            <Route path='contact' element={<StudentViewContact/>}/>
            
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
