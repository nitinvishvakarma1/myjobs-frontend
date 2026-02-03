import { Routes, Route } from 'react-router-dom';
import { NavbarComponent } from './components/header/Header.js';
import { FooterComponent, HomePageComponent } from './components/homepage/Homepage.js';
import { LoginComponent } from './components/forms/Form.js';
import Admin from './components/admin/Admin.js';
import AdminHome from './components/admin/AdminHome.js';
import RecruiterVacancyList from './components/recruiter/RecruiterVacancyList.js';
import RecruiterHome from './components/recruiter/RecruiterHome.js';
import CandidateHome from './components/candidate/CandidateHome.js';
import JobSeekerRegistrationComponent from './components/candidate/CandidateRegistration.js';
import RecruiterRegistrationComponent from './components/recruiter/RecruiterRegistration.js';
import CandidateProfileComponent from './components/candidate/CandidateProfileComponent.js';
import CandidateVacancyList from './components/candidate/CandidateVacancyList.js';
import RecruiterViewApplicants from './components/recruiter/RecruiterViewApplicants.js';
import RecruiterProfileComponent from './components/recruiter/RecruiterProfileComponent.js';
import RecruiterAddVacancyComponent from './components/recruiter/RecruiterAddVacancies.js';
import RecruiterUpdateVacancyComponent from './components/recruiter/RecruiterUpdateVacancy.js';
import CandidateAppliedVacancyComponent from './components/candidate/CandidateAppliedVacancyList.js';
import './App.css';
import ExampleComponent from './components/candidate/Example.js';
import MyComponent from './components/recruiter/MyComponent.js';
import AdminRecruiterList from './components/admin/AdminRecruiterList.js';
import FallbackUIComponent from './components/forms/FallbackUI.js';

function App() {
  return (<>
    <NavbarComponent />
    <Routes>
      <Route path='/' element={<HomePageComponent />}></Route>
      <Route path='/admin' element={<Admin />}></Route>
      <Route path="/adminHome" element={<AdminHome />}></Route>
      <Route path="/adminRecruiterList" element={<AdminRecruiterList />}></Route>
      <Route path="/example" element={<ExampleComponent />}></Route>

      <Route path="/recruiterRegistration" element={<RecruiterRegistrationComponent />}></Route>
      <Route path="/recruiterHome" element={<RecruiterHome />}></Route>
      <Route path="/recruiterProfile" element={<RecruiterProfileComponent />}></Route>

      <Route path="/recruiterAddVacancy" element={<RecruiterAddVacancyComponent />}></Route>
      <Route path="/recruiterUpdateVacancy" element={<RecruiterUpdateVacancyComponent />}></Route>
      <Route path="/recruiterVacancyList" element={<RecruiterVacancyList />}></Route>
      <Route path="/recruiterViewApplicants" element={<RecruiterViewApplicants />}></Route>

      <Route path="/jobSeekerRegistration" element={<JobSeekerRegistrationComponent />}></Route>
      <Route path="/candidateHome" element={<CandidateHome />}></Route>
      <Route path="/candidateProfile" element={<CandidateProfileComponent />}></Route>
      <Route path="/candidateVacancyList" element={<CandidateVacancyList />}></Route>
      <Route path="/candidateAppliedVacancies" element={<CandidateAppliedVacancyComponent />}></Route>

      <Route path="/login" element={<LoginComponent />}></Route>
      <Route path="/citiesExample" element={<MyComponent />}></Route>
      <Route path="/errorPage" element={<FallbackUIComponent />}></Route>
      

    </Routes>
    <FooterComponent />

  </>);
}

export default App;
