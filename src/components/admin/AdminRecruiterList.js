import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setNavbar } from '../../store/navbarSlice';
import { adminAuthentication, adminGetRecruiterList, adminUpdateRecruiterStatus, setAdminCredential } from '../../store/adminSlice';
import styles from './admin.module.css';

function AdminRecruiterList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [recruiterList, setRecruiterList] = useState([]);

    useEffect(() => {
        userAuthentication();
        getRecruiterList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const userAuthentication = async () => {
        try {
            const result = await adminAuthentication();
            if (result.status === 200) {
                dispatch(setAdminCredential(result.data));
                dispatch(setNavbar("adminRecruiterList"));
            }
        } catch (error) {
            navigate('/errorPage', { state: error });
        }
    }

    const getRecruiterList = async () => {
        try {
            const result = await adminGetRecruiterList();
            console.log('result of adminGetRecruiterList ', result);
            if (result.status === 200) {
                setRecruiterList(result.data.recruiterList);
            }
        } catch (error) {
            console.log("error in getRecruiterList: ", error);
            navigate('/errorPage', { state: error });
        }
    };

    const updateRecruiterStatus = async (recruiterEmail, action) => {
        try {
            const result = await adminUpdateRecruiterStatus(recruiterEmail, action);
            console.log('recruiterUpdateCandidateStatus result : ', result.data);
            if (result.status === 200) {
                setRecruiterList(recruiterList =>
                    recruiterList.map(recruiter =>
                        recruiter.email === recruiterEmail ? { ...recruiter, status: action === 'Activate' } : recruiter
                    )
                );
            }
        } catch (error) {
            console.log('Error in updateStatus', error);
            navigate('/errorPage', { state: error });
        }
    }

    console.log('recruiter list ', recruiterList);
    return (
        <>
            <div className={`container-fluid shadow-lg ${styles.adminRecruiterListBanner}`}>
                <div className={`row justify-content-center align-items-center ${styles.overadminRecruiterListBanner}`}>
                    <h2 className="text-center text-light">Existing Recruiters on Team MyJobs Platform</h2>
                </div>
            </div>

            {recruiterList.length > 0 ? (
                <div className="container-fluid p-5">
                    <table className="table table-secondary shadow-lg table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Recruiter Name</th>
                                <th>Recruiter Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recruiterList.map((recruiter, index) => (
                                <tr key={index} className='shadow-lg'>
                                    <th scope="row">{index + 1}</th>
                                    <td>{recruiter.userName}</td>
                                    <td>{recruiter.email}</td>
                                    <td>
                                        <input
                                            type="button"
                                            value={recruiter.status ? 'Activated' : 'Activate'}
                                            className='btn btn-active btn-outline-success me-2'
                                            disabled={recruiter.status}
                                            onClick={() => updateRecruiterStatus(recruiter.email, 'Activate')}
                                        />
                                        <input
                                            type="button"
                                            value={!recruiter.status ? 'Deactivated' : 'Deactivate'}
                                            className='btn btn-active btn-outline-danger me-2'
                                            disabled={!recruiter.status}
                                            onClick={() => updateRecruiterStatus(recruiter.email, 'Deactivate')}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="container p-5 mt-5 py-5" style={{ height: '55vh' }}>
                    <div className='row h-100 justify-content-center align-items-center border border-1 border-dark rounded-3' style={{ height: '55vh', backgroundColor: 'rgba(0, 0, 0, .300)' }}>
                        <div className='text-center'>
                            <h3 className='text-center'>No Existing Recruiter Found ..!</h3>
                            <input type="button" className='btn btn-primary mt-5' value="Start Posting Now" onClick={() => navigate('/recruiterAddVacancy')} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminRecruiterList;
