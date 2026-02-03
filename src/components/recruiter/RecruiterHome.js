import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { setNavbar } from '../../store/navbarSlice.js';
import jscookie from 'js-cookie';
import { recruiterAuthentication, setRecruiterCredential } from '../../store/recruiterSlice.js';
import recruiterBanner from '../../assets/recruitmentBanner.png';

function RecruiterHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const recruiter_email = jscookie.get("recruiter_email");
  // console.log('recruiterCredential ===> ', userData);
  // console.log('recruiter_email', recruiter_email)

  useEffect(() => {
    if (recruiter_email == "null") {
      dispatch(setNavbar("home"));
      navigate("/");
    } else {
      userauthantication();
    }
  }, []);

  const userauthantication = async () => {
    try {
      const result = await recruiterAuthentication();
      if (result.status == 200) {
        setUserData(result.data.userData);
        dispatch(setRecruiterCredential(result.data));
        dispatch(setNavbar("recruiterHome"));
        // console.log('recruiterAuthentication complete ', result);
      }
    } catch (error) {
      console.log(error);
      navigate('/errorPage', { state: error });
    }
  }

  return (<>
    {/* {userData &&
      <div className="w3l-index-block1">
        <div className="content py-5">
          <div className="container py-lg-4">
            <div className="row align-items-center">
              <div className="col-lg-5 content-left">
                <h1>Recruiter Panel</h1>
                <h4>{userData.email}</h4>
                <p className="mt-3 mb-lg-5 mb-4">
                  Explore and manage your career with ease. View job listings tailored to your preferences, apply directly to opportunities, and monitor your application status. You can also update your profile to ensure your information is always up-to-date.
                </p>
                <a href="about.html" className="btn btn-primary btn-style">Start posting</a>
              </div>
              <div className="col-lg-7 content-photo mt-lg-0 mt-5">
                <img src={recruiterBanner} className="img-fluid" alt="main image" />
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    } */}


    {userData && <>
      <div className="container-fluid py-5">
        <div className="container  py-lg-4">
          <div className="row align-items-center">
            <div className="col-lg-5 content-left">
              <h1>Recruiter Panel</h1>
              <h4>{userData.email}</h4>
              <p className="mt-3 mb-lg-5 mb-4 pe-4" style={{ textAlign: 'justify' }}>
                Explore and streamline your recruitment process effortlessly. Post job listings tailored to your needs, review candidate applications, and manage approvals. You can also update your company profile to ensure your information is always up-to-date.              </p>
              <input type="button" className="btn btn-primary" value="Start Posting" onClick={() => { navigate('/recruiterAddVacancy') }} />
            </div>
            <div className="col-lg-7 content-photo mt-lg-0 mt-5">
              <img src={recruiterBanner} className="img-fluid img-responsive d-block w-100" alt="main image" />
            </div>
          </div>
        </div>
      </div>

    </>}

    {/* <div className="container-fluid m-0 p-0 py-5" style={{ backgroundColor: 'whitesmoke' }}>
      <div className="container mt-4 mt-xl-5 pb-0">
        <div className="row">
          <div className="col-md-6 p-3" style={{ textAlign: 'justify' }}>
            <div className="container w-100 h-auto p-5" >
              <h1 className="display-5 fw-bold">Discover <br />Thousands of </h1>
              <h1><span className="display-4 fw-bold text-primary">Job Opportunities</span></h1>
              <p className="lead">Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
              <button type="button" className='btn btn-lg w-50 btn-primary border border-2 btn-active' onClick={() => navigate('/jobSeekerRegistration')}>Get Started</button>
            </div>
          </div>
          <div className="col-md-6 pt-0 pt-xl-2 p-xl-5">
            <img src={banner} alt="banner" className="img-fluid img-responsive d-block w-100 mx-auto" />
          </div>
        </div>
      </div>
    </div> */}

  </>);
}
export default RecruiterHome;