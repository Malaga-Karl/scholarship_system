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
import AdminViewFoundation from './pages/AdminView/AdminViewFoundation';
import AdminViewScholarship from './pages/AdminView/AdminViewScholarship';
import AdminViewAnnouncement from './pages/AdminView/AdminViewAnnouncement';
import AdminViewApplicant from './pages/AdminView/AdminViewApplicant';
import AddEditFoundation from './pages/PartnersPage/AddEditPartneredFoundation';
import NewMail from './pages/StudentView/NewMail';
import Forms from './pages/StudentView/Forms';
import StudentViewScholarshipTemplate from './pages/StudentView/StudentViewScholarshipTemplate';
import AddEditScholarship from './pages/AdminView/AdminAddEditScholarship';


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
          <Route path='studentview'>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path='dashboard' element={<StudentViewScholarshipTemplate/>}>
              <Route index element={<StudentViewScholarship/>}/>
              <Route path='apply/:id' element={<StudentViewScholarship/>}/>
              <Route path='apply/:id/forms' element={<Forms/>}/>
            </Route>
            {/* <Route path='dashboard' element={<StudentViewDashboard/>}/> */}
            <Route path='announcements' element={<StudentViewAnnouncments/>}/>
            <Route path='contact' element={<StudentViewContact/>}/>
            <Route path='contact/new' element={<NewMail/>}/>
            
          </Route>
          <Route path='adminview'>
            <Route index element={<Navigate to="foundations" replace/>} />
            <Route path='foundations' element={<AdminViewFoundation/>} >
              <Route path='addedit' element={<AddEditFoundation/>} />
            </Route>
            <Route path='scholarships' element={<AdminViewScholarship/>}>
              <Route path='addedit' element={<AddEditScholarship/>} />
            </Route>
            <Route path='announcements' element={<AdminViewAnnouncement/>} />
            <Route path='applicants' element={<AdminViewApplicant/>} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
