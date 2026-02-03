import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setNavbar } from "../../store/navbarSlice.js";
import jscookie from 'js-cookie';
import { authentication, setCandidateCredential } from "../../store/candidateSlice.js";
import candidateHomeBanner from '../../assets/candidateHome.jpg';

function CandidateHome() {
  const [userData, setUserData] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const candidate_email = jscookie.get("candidate_email");
  console.log('candidateCredential ===> ', userData);
  console.log('candidate_email', candidate_email);

  useEffect(() => {
    if (candidate_email === "null") {
      dispatch(setNavbar("home"));
      navigate("/");
    }
    else {
      userauthantication();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidate_email, dispatch, navigate]);


  const userauthantication = async () => {
    try {
      const result = await authentication();
      if (result.status === 200) {
        setUserData(result.data.userData);
        dispatch(setCandidateCredential(result.data));
        dispatch(setNavbar("candidateHome"));
      }
    } catch (error) {
      console.log(error)
      navigate('/errorPage', { state: error });
    }
  }

  console.log('Candidate data -> ', userData)

  return (<>
    {userData && <>
      <div className="container-fluid py-5">
        <div className="container py-lg-4">
          <div className="row align-items-center">
            <div className="col-lg-5 content-left">
              <h1>Candidate Panel</h1>
              <h4>{userData.email}</h4>
              <p className="mt-3 mb-lg-5 mb-4 pe-4" style={{ textAlign: 'justify' }}>
                Explore and manage your career with ease. View job listings tailored to your preferences, apply directly to opportunities, and monitor your application status. You can also update your profile to ensure your information is always up-to-date.
              </p>
              <button type='button' className="btn btn-active btn-primary" onClick={() => navigate('/candidateVacancyList')}>Start Exploring</button>
            </div>
            <div className="col-lg-7 content-photo mt-lg-0 mt-5">
              <img src={candidateHomeBanner} className="img-fluid img-responsive w-100" alt="Candidate panel banner" />
            </div>
          </div>
        </div>
      </div>

    </>}
  </>);
}
export default CandidateHome;