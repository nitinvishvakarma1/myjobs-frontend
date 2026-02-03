
import { recruiterGetVacancyList, recruiterDeleteVacancy } from '../../store/vacancySlice.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNavbar } from '../../store/navbarSlice.js';
import { recruiterAuthentication } from '../../store/recruiterSlice.js';
import styles from './recruiter.module.css';

function RecruiterVacancyList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [vacancyList, setVacancyList] = useState([]);

    useEffect(() => {
        userAuthentication();
        getVacancyList();
        dispatch(setNavbar('recruiterVacancyList'));
    }, []);

    const userAuthentication = async () => {
        try {
            const result = await recruiterAuthentication();
            if (result.status === 200) {
                dispatch(setNavbar("recruiterVacancyList"));
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    }

    const getVacancyList = async () => {
        try {
            const result = await recruiterGetVacancyList();
            setVacancyList(result.data.vacancyList);
        } catch (error) {
            console.log('Error in getVacancyList: ', error);
            navigate('/errorPage', { state: error });
        }
    }

    const deleteVacancy = async (vacancy) => {
        try {
            const result = await recruiterDeleteVacancy(vacancy._id);
            if (result.status === 200) {
                getVacancyList();
            }
        } catch (error) {
            console.log('Error in deleteVacancy: ', error);
            navigate('/errorPage', { state: error });
        }
    }

    const updateVacancy = (vacancy) => {
        navigate("/recruiterUpdateVacancy", { state: vacancy });
    }

    return (
        <>
            <div className={`container-fluid shadow-lg ${styles.recruiterVacancyBanner}`}>
                <div className={`row justify-content-center align-items-center ${styles.overRecruiterVacancyBanner}`}>
                    <h2 className="text-center text-light">Manage Your Vacancies</h2>
                </div>
            </div>

            {vacancyList.length > 0 ? (
                <div className="container-fluid p-5">
                    <div className='table-responsive'>
                        <table className="table table-secondary shadow-lg table-hover">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Post</th>
                                    <th>Location</th>
                                    <th>Experience</th>
                                    <th>Vacancy</th>
                                    <th>Salary</th>
                                    <th>Adv.Date</th>
                                    <th>Status</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vacancyList.map((vacancy, index) => (
                                    <tr key={index} className='shadow-lg'>
                                        <td scope="row">{index + 1}</td>
                                        <td>{vacancy.jobTitle}</td>
                                        <td>{vacancy.jobLocation}</td>
                                        <td>{vacancy.experienceLevel}</td>
                                        <td>{vacancy.numberOfVacancy}</td>
                                        <td>{vacancy.minSalary} - {vacancy.maxSalary}</td>
                                        <td>{vacancy.jobPostingDate}</td>
                                        <td>{vacancy.vacancyStatus}</td>
                                        <td><button className="btn btn-outline-success" onClick={() => { updateVacancy(vacancy) }}>Update</button></td>
                                        <td><button className="btn btn-outline-danger" onClick={() => { deleteVacancy(vacancy) }}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            ) : (
                <div className="container p-5 mt-5 py-5" style={{ height: '55vh' }}>
                    <div className='row h-100 justify-content-center align-items-center border border-1 border-dark rounded-3' style={{ height: '55vh', backgroundColor: 'rgba(0, 0, 0, .300)' }}>
                        <div className='text-center'>
                            <h3 className='text-cente'>No jobs added !</h3>
                            <input type="text" className='btn btn-primary mt-5' value="Start Posting Now" onClick={() => navigate('/recruiterAddVacancy')} />

                        </div>

                    </div>
                </div>
            )}

        </>
    );
}

export default RecruiterVacancyList;
