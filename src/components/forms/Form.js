import { useEffect, useState } from 'react';
import bgImg from '../../assets/dreamJobBanner.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jscookie from 'js-cookie';
import { setRecruiterCredential, recruiterLogin } from '../../store/recruiterSlice.js';
import { candidateLogin, setCandidateCredential } from '../../store/candidateSlice.js';
import styles from './registration.module.css';

export const LoginComponent = () => {
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
    };
    useEffect(()=>setData({role:'candidate'}),[]);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (data.role === 'candidate') {
                const result = await candidateLogin(data);
                console.log('Result of data ---------', result);
                if (result.status === 200 && result.data.userData.role === 'candidate' && result.data.userData.status===true) {
                    dispatch(setCandidateCredential(result.data));
                    navigate("/candidateHome");
                }else{
                }
            } else if (data.role === 'recruiter') {
                const result = await recruiterLogin(data);
                if (result.status === 200 && result.data.userData.status===true) {
                    jscookie.set('recruiterToken', result.data.token, { expires: 1 });
                    dispatch(setRecruiterCredential(result.data));
                    navigate("/recruiterHome");
                    console.log('Result of data ---------', result);
                }
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage',{state:error});
        }
    }

    console.log("final data : ", data);

    return (<>
        <div className={`container shadow-lg rounded-4 ${styles.loginForm}`}>
            <div className='row'>
                <div className="col-md-6 p-0 rounded-4">
                    <img src={bgImg} alt="" className='img-fluid img-resonsive w-100 rounded-4 rounded-end-0' />
                </div>
                <div className="col-md-6">
                    <form action="" onSubmit={handleSubmit}>
                        <div className='container p-4 p-lg-5'>
                            <div className='mb-4'>
                                <input type="text" name="email" placeholder="Enter Email Address" className="form-control" onChange={handleChange} />
                            </div>
                            <div className='mb-4'>
                                <input type="password" name="password" placeholder="Enter Password" className="form-control" onChange={handleChange} />
                            </div>
                            <div className='mb-4 border border-1 p-4 rounded-3 px-lg-5'>
                                <div className="form-check form-check-inline me-lg-4">
                                    <input className="form-check-input" defaultChecked type="radio" name="role" id="candidate" value="candidate" onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="candidate">Candidate</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input " type="radio" name="role" id="recruiter" value="recruiter" onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="recruiter">Recruiter</label>
                                </div>
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







