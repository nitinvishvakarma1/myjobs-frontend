import { useDispatch } from 'react-redux';
import adminBanner from '../../assets/adminBg2.png';
import jscookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setNavbar } from '../../store/navbarSlice';
import { adminAuthentication, setAdminCredential } from '../../store/adminSlice';

function AdminHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin_email = jscookie.get("admin_email");


  useEffect(() => {
    if (admin_email === "null") {
      dispatch(setNavbar("home"));
      navigate("/");
    }
    else {
      userauthantication();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin_email, dispatch, navigate]);


  const userauthantication = async () => {
    try {
      const result = await adminAuthentication();
      if (result.status === 200) {
        dispatch(setAdminCredential(result.data));
        dispatch(setNavbar("adminHome"));
      }
    } catch (error) {
      console.log(error);
      navigate('/errorPage',{state:error});
    }

  }

  return (<>
    <div className="container-fluid py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center">
          <div className="col-lg-5 content-left">
            <h1>Admin Panel</h1>
            <h4>admin@gmail.com</h4>
            <p className="mt-3 mb-lg-5 mb-4 pe-4" style={{ textAlign: 'justify' }}>
              Hello Administrator, you can manage all the existing users on our website whether it is an Employee or a JobSeeker ..!
            </p>
            <button type='button' className="btn btn-primary">Start Now</button>
          </div>
          <div className="col-lg-7 content-photo mt-lg-0 mt-5 p-lg-5 text-center">
            <img src={adminBanner} className="img-fluid img-responsive w-75 mx-auto" alt="Admin panel banner" />
          </div>
        </div>
      </div>
    </div>

  </>);
}
export default AdminHome;