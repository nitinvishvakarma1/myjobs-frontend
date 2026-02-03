
import { useEffect, useState } from "react";
import { recruiterAuthentication } from "../../store/recruiterSlice.js";
import { useDispatch } from "react-redux";
import { setNavbar } from "../../store/navbarSlice.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { recruiterGetApplicantList, recruiterUpdateCandidateStatus } from "../../store/vacancySlice.js";
import styles from './recruiter.module.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

function RecruiterViewApplicants() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [appliedCandidateList, setAppliedCandidateList] = useState([]);
    const [appliedCandidateDocs, setAppliedCandidateDocs] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const newplugin = defaultLayoutPlugin();

    useEffect(() => {
        userAuthentication();
        getApplicants();
    }, []);

    const userAuthentication = async () => {
        try {
            const result = await recruiterAuthentication();
            if (result.status === 200) {
                dispatch(setNavbar("recruiterViewApplicants"));
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    }

    const getApplicants = async () => {
        try {
            const result = await recruiterGetApplicantList();
            if (result.status === 200) {
                setAppliedCandidateList(result.data.appliedCandidateList);
                setAppliedCandidateDocs(result.data.candidateDocs);
            }
            console.log('applied candidate list : ', result.data.appliedCandidateList);
        } catch (error) {
            console.log('error in getApplicants : ', error);
            navigate('/errorPage', { state: error });
        }
    }

    const updateStatus = async (vacancyId, action) => {
        try {
            const result = await recruiterUpdateCandidateStatus(vacancyId, action);
            console.log('recruiterUpdateCandidateStatus result : ', result.data);
            dispatch(setNavbar("recruiterViewApplicants"));
            setAppliedCandidateList(appliedCandidateList => appliedCandidateList.map(candidate =>
                candidate.vid === vacancyId ? { ...candidate, status: action } : candidate
            ));
        } catch (error) {
            console.log('Error in updateStatus', error);
            navigate('/errorPage', { state: error });
        }
    }

    const openResumeModal = (index) => {
        setSelectedResume(appliedCandidateDocs[index]);
        setShowModal(true);
    }

    const closeResumeModal = () => {
        setShowModal(false);
        setSelectedResume(null);
    }

    return (
        <>
            <div className={`container-fluid bg-danger shadow-lg ${styles.recruiterApplicantsBanner}`}>
                <div className={`row justify-content-center align-items-center ${styles.overRecruiterApplicantsBanner}`}>
                    <h2 className="text-center text-light">Manage Applications</h2>
                </div>
            </div>
            {appliedCandidateList.length > 0 ? (
                <div className="container-fluid shadow-lg p-5" style={{ height: '70vh' }}>
                    <div className="table-responsive">
                        <table className="table table-secondary shadow-lg table-hover">
                            <thead>
                                <tr>
                                    <th >S.No</th>
                                    <th >Post</th>
                                    <th >Candidate Email</th>
                                    <th >Candidate Docs</th>
                                    <th >Applied Date</th>
                                    <th >Shortlist</th>
                                    <th >Reject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appliedCandidateList.map((vacancy, index) => (
                                    <tr className="shadow-lg" key={index}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{vacancy.jobTitle}</td>
                                        <td>{vacancy.candidateEmail}</td>
                                        <td>
                                            <Link to={"/uploads/" + appliedCandidateDocs[index]} target="_blank" className="btn btn-outline-success me-3" download>Download</Link>
                                            <button className="btn btn-outline-info" onClick={() => openResumeModal(index)}>Open</button>
                                        </td>
                                        <td>{new Date(vacancy.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <input
                                                type="button"
                                                value={vacancy.status === 'Applied' || vacancy.status === 'Rejected' ? 'Shortlist' : 'Shortlisted'}
                                                className="btn btn-active w-75 btn-success"
                                                onClick={() => updateStatus(vacancy.vid, 'Shortlisted')}
                                                disabled={vacancy.status === 'Shortlisted'}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="button"
                                                value="Reject"
                                                className="btn btn-active w-75 btn-danger"
                                                onClick={() => updateStatus(vacancy.vid, 'Rejected')}
                                                disabled={vacancy.status === 'Rejected'}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            ) :
                (
                    <div className="container p-5 mt-5 py-5" style={{ height: '55vh' }}>
                        <div className='row h-100 justify-content-center align-items-center border border-1 border-dark rounded-3' style={{ height: '55vh', backgroundColor: 'rgba(0, 0, 0, .300)' }}>
                            <div className='text-center'>
                                <h3 className='text-cente'>No applicants !</h3>
                                <input type="text" className='btn btn-primary mt-5' value="Back to Home page" onClick={() => navigate('/recruiterHome')} />

                            </div>

                        </div>
                    </div>
                )}
            {showModal && selectedResume && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="resumeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="resumeModalLabel">Applicant Resume</h5>
                                <button type="button" className="btn-close" onClick={closeResumeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                                    <Viewer fileUrl={`/uploads/${selectedResume}`} plugins={[newplugin]} />
                                </Worker>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}

export default RecruiterViewApplicants;
