import { useState } from 'react';
import bgImg from '../../assets/adminBg.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../forms/registration.module.css';
import { adminLogin, setAdminCredential } from '../../store/adminSlice.js';
import { setNavbar } from '../../store/navbarSlice.js';

function Admin() {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    let { name, value } = event.target;
    setData(() => {
      return {
        ...data,
        [name]: value
      }
    });
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!data.role) {
        const result = await adminLogin(data);
        console.log('Result of data ---------', result);
        if (result.status === 200) {
          dispatch(setAdminCredential(result.data));
          dispatch(setNavbar('adminHome'));
          navigate("/adminHome");
        }
      }
    } catch (error) {
      console.log(error);
      navigate('/errorPage',{state:error});
    }
  }

  console.log("final data of admin : ", data);

  return (<>
    <div className={`container shadow-lg rounded-4 ${styles.loginForm}`}>
      <div className='row'>
        <div className="col-md-6 p-0 rounded-4">
          <img src={bgImg} alt="" className='img-fluid img-resonsive w-100 rounded-4 rounded-end-0' />
        </div>
        <div className="col-md-6">
          <h4 className='text-center pt-5'>Proove Yourself as an Admin ..!</h4>
          <form action="" onSubmit={handleSubmit}>
            <div className='container p-2 px-lg-5'>
              <div className='mb-4'>
                <input type="text" name="email" placeholder="Enter Email Address" className="form-control" onChange={handleChange} />
              </div>
              <div className='mb-4'>
                <input type="password" name="password" placeholder="Enter Password" className="form-control" onChange={handleChange} />
              </div>
              <div className='mb-4 text-center'>
                <input type="submit" value="Login" className={`btn btn-md btn-active w-25 text-light mx-auto ${styles.loginBtn}`} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>);
}
export default Admin;