
// import { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { authentication, candidateApplyForVacancy, candidateGetAppliedVacancies, candidateGetVacancyList, setCandidateCredential } from "../../store/candidateSlice.js";
// import { setNavbar } from "../../store/navbarSlice.js";
// import Select from 'react-select';
// import styles from './profile.module.css';
// import { FooterComponent } from '../homepage/Homepage.js';
// import moment from 'moment';

// function CandidateVacancyList() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [jobList, setJobList] = useState([]);
//     const [appliedVacancies, setAppliedVacancies] = useState([]);
//     const [search, setSearch] = useState('');
//     const [selectedLocation, setSelectedLocation] = useState(null);
//     const [selectedExperience, setSelectedExperience] = useState(null);
//     const [selectedEmploymentType, setSelectedEmploymentType] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedVacancy, setSelectedVacancy] = useState();

//     const [displayedVacancies, setDisplayedVacancies] = useState([]); // Vacancies to display
//     const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items to display per page
//     const [page, setPage] = useState(1); // Current page
//     const [hasMore, setHasMore] = useState(true); // Flag for more items
//     const [loading, setLoading] = useState(false); // Loading state
//     const [loadTimeout, setLoadTimeout] = useState(null); // Timeout for loading indicator
//     const candidateEmail = useSelector(state => state.candidateSlice.candidateEmail);
//     const observerRef = useRef(); // Ref for Intersection Observer

//     const experienceLevelOptions = [
//         { value: "Fresher", label: "Fresher" },
//         { value: "Internship", label: "Internship" },
//         { value: "0 - 1 year", label: "0 - 1 year" },
//         { value: "1 - 3 year", label: "1 - 3 year" },
//         { value: "3+ year", label: "3+ year" },
//     ];

//     const employmentTypeOptions = [
//         { value: "Full-time", label: "Full-time" },
//         { value: "Part-time", label: "Part-time" },
//         { value: "Hybrid", label: "Hybrid" },
//         { value: "Remote", label: "Remote" },
//     ];

//     const getJobList = async () => {
//         try {
//             const result = await candidateGetVacancyList();
//             setJobList(result.data.jobList);
//             setDisplayedVacancies(result.data.jobList.slice(0, itemsPerPage)); // Initialize with first page items
//             setHasMore(result.data.jobList.length > itemsPerPage);
//         } catch (error) {
//             console.log("error in getJobList: ", error);
//         }
//     };

//     const getAppliedVacancies = async () => {
//         try {
//             const result = await candidateGetAppliedVacancies();
//             setAppliedVacancies(result.data.appliedVacancies);
//         } catch (error) {
//             console.log("error in getAppliedVacancies: ", error);
//         }
//     };

//     useEffect(() => {
//         userAuthentication();
//         getJobList();
//         getAppliedVacancies();
//     }, []);

//     useEffect(() => {
//         if (jobList.length > 0) {
//             setDisplayedVacancies(jobList.slice(0, page * itemsPerPage));
//             setHasMore(jobList.length > page * itemsPerPage);
//         }
//     }, [page, jobList]);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             async (entries) => {
//                 if (entries[0].isIntersecting && hasMore && !loading) {
//                     setLoading(true); // Start loading
//                     setLoadTimeout(setTimeout(() => {
//                         setPage(prev => prev + 1); // Load more items when scrolled to bottom
//                     }, 1000));
//                 }
//             },
//             { rootMargin: '100px' }
//         );

//         if (observerRef.current) {
//             observer.observe(observerRef.current);
//         }

//         return () => {
//             if (observerRef.current) {
//                 observer.unobserve(observerRef.current);
//             }
//             clearTimeout(loadTimeout); // Clear the timeout if component unmounts
//         };
//     }, [hasMore, loading]);

//     useEffect(() => {
//         if (loading) {
//             const timer = setTimeout(() => {
//                 setLoading(false); // Stop loading after data fetch
//             }, 1000); // Delay to simulate network delay
//             return () => clearTimeout(timer);
//         }
//     }, [loading]);

//     const userAuthentication = async () => {
//         const result = await authentication();
//         if (result.status === 200) {
//             dispatch(setCandidateCredential(result.data));
//             dispatch(setNavbar("candidateVacancyList"));
//         }
//     };

//     const applyForVacancy = async (vacancyObj) => {
//         try {
//             const result = await candidateApplyForVacancy(vacancyObj);
//             if (result.status === 200) {
//                 getAppliedVacancies();
//                 dispatch(setNavbar('candidateVacancyList'));
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleSearchChange = (event) => {
//         setSearch(event.target.value);
//     };

//     const handleLocationChange = (selectedOption) => {
//         setSelectedLocation(selectedOption);
//     };

//     const handleExperienceChange = (selectedOption) => {
//         setSelectedExperience(selectedOption);
//     };

//     const handleEmploymentTypeChange = (selectedOption) => {
//         setSelectedEmploymentType(selectedOption);
//     };

//     const uniqueLocations = [...new Set(jobList.map(job => job.jobLocation))].map(location => ({ value: location, label: location }));

//     const filteredJobList = displayedVacancies.filter(vacancy => {
//         const searchLower = search.toLowerCase();
//         return (
//             (!search ||
//                 vacancy.jobTitle.toLowerCase().includes(searchLower) ||
//                 vacancy.jobLocation.toLowerCase().includes(searchLower) ||
//                 vacancy.companyName.toLowerCase().includes(searchLower) ||
//                 vacancy.employmentType.toLowerCase().includes(searchLower)) &&
//             (!selectedLocation || vacancy.jobLocation === selectedLocation.value) &&
//             (!selectedExperience || vacancy.experienceLevel === selectedExperience.value) &&
//             (!selectedEmploymentType || vacancy.employmentType === selectedEmploymentType.value)
//         );
//     });

//     const openModal = (vacnacy) => {
//         setShowModal(true);
//         setSelectedVacancy(vacnacy);
//     }

//     const closeResumeModal = () => {
//         setShowModal(false);
//         setSelectedVacancy(null);
//     }

//     const getTimeDifference = (date) => {
//         const now = moment();
//         const postDate = moment(date);
//         const diff = now.diff(postDate, 'days');

//         if (diff === 0) {
//             return 'Today';
//         } else if (diff === 1) {
//             return '1 day ago';
//         } else {
//             return `${diff} days ago`;
//         }
//     };

//     return (
//         <>
//             {
//                 (jobList) && (appliedVacancies) &&
//                 <>
//                     <div className={`container-fluid p-0 pb-4 ${styles.filterBox}`}>
//                         <div className={`row justify-content-center align-items-center ps-lg-5 pe-lg-5 ${styles.overFilterBox}`}>
//                             <div className={`container ps-lg-5 pe-lg-5`}>
//                                 <div className={`${styles.filterBoxHeader}`}>
//                                     <h4 className={`text-center display-5 fw-bold shadow-lg`}><span className='text-primary'>The Easiest Way</span> to Get Your New Job</h4>
//                                     <p className='text-center fs-5 fw-bold'>We offer multiple jobs right now, Search your preferable one</p>
//                                 </div>
//                                 <div className={`row justify-content-center align-items-center`}>
//                                     <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
//                                         <div className={`${styles.filterInputs} px-4`}>
//                                             <input
//                                                 type="text"
//                                                 className={`form-control`}
//                                                 placeholder="Search by job title, location, company, or job type"
//                                                 value={search}
//                                                 onChange={handleSearchChange}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
//                                         <div className={`${styles.stepCard} px-4`}>
//                                             <Select
//                                                 options={uniqueLocations}
//                                                 placeholder="Select Location"
//                                                 value={selectedLocation}
//                                                 onChange={handleLocationChange}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className='col-12 col-md-6 col-lg-4'>
//                                         <div className={`${styles.stepCard} px-4`}>
//                                             <Select
//                                                 options={experienceLevelOptions}
//                                                 placeholder="Select Experience"
//                                                 value={selectedExperience}
//                                                 onChange={handleExperienceChange}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='container-fluid'>
//                         <div className='container shadow my-4'>
//                             {filteredJobList.map((vacancy, index) => {
//                                 const vacancyObj = {
//                                     ...vacancy,
//                                     candidateEmail
//                                 };
//                                 return (
//                                     <div key={index} className='row border rounded-3 shadow mb-4 text-center' style={{backgroundColor:'whitesmoke'}}>
//                                         <div className='col-md-2 col-sm-3 col-4 p-4 shadow'>
//                                             <div className='companyLogo bg-light mx-auto w-100 h-100'>
//                                                 <img
//                                                     src={`/uploads/${vacancy.companyLogo}`}
//                                                     alt='company logo'
//                                                     className='img-responsive w-100 d-block'
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className='col-md-6 col-sm-5 col-8 p-4 text-start'>
//                                             <h4 className='text-primary'>{vacancy.jobTitle}</h4>
//                                             <h5 className='text-dark'>{vacancy.companyName}</h5>
//                                             <p>{vacancy.jobLocation} ({vacancy.employmentType})</p>
//                                         </div>
//                                         <div className='col-md-4 col-sm-4 col-12 d-flex justify-content-center align-items-center p-2'>
//                                             <div className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
//                                                 <input
//                                                     type="button" v
//                                                     value="View More"
//                                                     className='btn btn-outline-info shadow-lg mb-2 mb-md-0 me-md-2'
//                                                     onClick={() => openModal(vacancy)}
//                                                 />
//                                                 <input
//                                                     type="button"
//                                                     className='btn btn-outline-success shadow-lg btn-active shadow'
//                                                     value={appliedVacancies.some(appliedVacancy => appliedVacancy._id === vacancy._id) ? 'Applied' : 'Apply Now'}
//                                                     onClick={() => applyForVacancy(vacancyObj)}
//                                                     disabled={appliedVacancies.some(appliedVacancy => appliedVacancy._id === vacancy._id)}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                             {loading && <div className="text-center my-4"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>}
//                             <div ref={observerRef} /> {/* Intersection Observer ref */}
//                         </div>
//                     </div>
//                 </>
//             }

//             {showModal && selectedVacancy && (
//                 <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="resumeModalLabel" aria-hidden="true">
//                     <div className="modal-dialog modal-lg modal-dialog-scrollable">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title text-center" id="resumeModalLabel">Company Details</h5>
//                                 <button type="button" className="btn-close" onClick={closeResumeModal} aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 <ul className="list-group border border-light shadow-xs">
//                                     <li className="list-group-item">
//                                         <strong>Contact : </strong> {selectedVacancy.recruiterEmail}
//                                         ({selectedVacancy.jobPostingDate
//                                             ? moment(selectedVacancy.jobPostingDate).isValid()
//                                                 ? getTimeDifference(selectedVacancy.jobPostingDate)
//                                                 : 'Invalid Date'
//                                             : 'No Date Provided'})
//                                     </li>
//                                     <li className="list-group-item">
//                                         <strong>Type : </strong>{selectedVacancy.employmentType}  - {selectedVacancy.workdays} / week
//                                     </li>
//                                     <li className="list-group-item">
//                                         <strong>Salary : </strong>{selectedVacancy.minSalary} rs - {selectedVacancy.maxSalary} rs on monthly basis
//                                     </li>
//                                     <li className="list-group-item">
//                                         <strong>Location : </strong>{selectedVacancy.jobLocation}, {selectedVacancy.state}
//                                     </li>

//                                 </ul>
//                                 <div className='container bg-primary p-5' style={{ textAlign: 'center', background: 'linear-gradient(to left, #2c3e50, #58b8c7)' }} >
//                                     <p className='fs-3'>{selectedVacancy.jobDescription}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default CandidateVacancyList;

//////////////////////////////////////////////////

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authentication, candidateApplyForVacancy, candidateGetAppliedVacancies, candidateGetVacancyList, setCandidateCredential } from "../../store/candidateSlice.js";
import { setNavbar } from "../../store/navbarSlice.js";
import Select from 'react-select';
import styles from './profile.module.css';
import { FooterComponent } from '../homepage/Homepage.js';
import moment from 'moment';

function CandidateVacancyList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [jobList, setJobList] = useState([]);
    const [appliedVacancies, setAppliedVacancies] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [selectedEmploymentType, setSelectedEmploymentType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState();

    const [displayedVacancies, setDisplayedVacancies] = useState([]); // Vacancies to display
    const [itemsPerPage] = useState(4); // Number of items to display per page
    const [page, setPage] = useState(1); // Current page
    const [hasMore, setHasMore] = useState(true); // Flag for more items
    const [loading, setLoading] = useState(false); // Loading state
    const [loadTimeout, setLoadTimeout] = useState(null); // Timeout for loading indicator
    const candidateEmail = useSelector(state => state.candidateSlice.candidateEmail);
    const observerRef = useRef(); // Ref for Intersection Observer

    const experienceLevelOptions = [
        { value: "Fresher", label: "Fresher" },
        { value: "Internship", label: "Internship" },
        { value: "0 - 1 year", label: "0 - 1 year" },
        { value: "1 - 3 year", label: "1 - 3 year" },
        { value: "3+ year", label: "3+ year" },
    ];


    const sortJobsByDate = (jobs) => {
        return jobs.sort((a, b) => {
            const dateA = moment(a.jobPostingDate);
            const dateB = moment(b.jobPostingDate);
            return dateB.isSameOrAfter(dateA) ? 1 : -1; // Latest dates first
        });
    };

    const getJobList = async () => {
        try {
            const result = await candidateGetVacancyList();
            const sortedJobs = sortJobsByDate(result.data.jobList);
            setJobList(sortedJobs);
            setDisplayedVacancies(sortedJobs.slice(0, itemsPerPage)); // Initialize with first page items
            setHasMore(sortedJobs.length > itemsPerPage);
        } catch (error) {
            console.log("error in getJobList: ", error);
            navigate('/errorPage',{state:error});
        }
    };

    const getAppliedVacancies = async () => {
        try {
            const result = await candidateGetAppliedVacancies();
            setAppliedVacancies(result.data.appliedVacancies);
        } catch (error) {
            console.log("error in getAppliedVacancies: ", error);
            navigate('/errorPage',{state:error});
        }
    };

    useEffect(() => {
        userAuthentication();
        getJobList();
        getAppliedVacancies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (jobList.length > 0) {
            setDisplayedVacancies(jobList.slice(0, page * itemsPerPage));
            setHasMore(jobList.length > page * itemsPerPage);
        }
    }, [page, jobList, itemsPerPage]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setLoading(true); // Start loading
                    setLoadTimeout(setTimeout(() => {
                        setPage(prev => prev + 1); // Load more items when scrolled to bottom
                    }, 1000));
                }
            },
            { rootMargin: '100px' }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        const currentObserverRef = observerRef.current;
        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
            clearTimeout(loadTimeout);
        };
    }, [hasMore, loading, loadTimeout]);

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                setLoading(false); 
            }, 1000); 
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const userAuthentication = async () => {
        try {
            const result = await authentication();
            if (result.status === 200) {
                dispatch(setCandidateCredential(result.data));
                dispatch(setNavbar("candidateVacancyList"));
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    }

    const applyForVacancy = async (vacancyObj) => {
        try {
            const result = await candidateApplyForVacancy(vacancyObj);
            if (result.status === 200) {
                getAppliedVacancies();
                dispatch(setNavbar('candidateVacancyList'));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleLocationChange = (selectedOption) => {
        setSelectedLocation(selectedOption);
    };

    const handleExperienceChange = (selectedOption) => {
        setSelectedExperience(selectedOption);
    };


    const uniqueLocations = [...new Set(jobList.map(job => job.jobLocation))].map(location => ({ value: location, label: location }));

    const filteredJobList = displayedVacancies.filter(vacancy => {
        const searchLower = search.toLowerCase();
        return (
            (!search ||
                vacancy.jobTitle.toLowerCase().includes(searchLower) ||
                vacancy.jobLocation.toLowerCase().includes(searchLower) ||
                vacancy.companyName.toLowerCase().includes(searchLower) ||
                vacancy.employmentType.toLowerCase().includes(searchLower)) &&
            (!selectedLocation || vacancy.jobLocation === selectedLocation.value) &&
            (!selectedExperience || vacancy.experienceLevel === selectedExperience.value) &&
            (!selectedEmploymentType || vacancy.employmentType === selectedEmploymentType.value)
        );
    });

    const openModal = (vacnacy) => {
        setShowModal(true);
        setSelectedVacancy(vacnacy);
    }

    const closeResumeModal = () => {
        setShowModal(false);
        setSelectedVacancy(null);
    }

    const getTimeDifference = (date) => {
        const now = moment();
        const postDate = moment(date);
        const diff = now.diff(postDate, 'days');

        if (diff === 0) {
            return 'Today';
        } else if (diff === 1) {
            return '1 day ago';
        } else {
            return `${diff} days ago`;
        }
    };

    return (
        <>
            {
                (jobList) && (appliedVacancies) &&
                <>
                    <div className={`container-fluid p-0 pb-4 ${styles.filterBox}`}>
                        <div className={`row justify-content-center align-items-center ps-lg-5 pe-lg-5 ${styles.overFilterBox}`}>
                            <div className={`container ps-lg-5 pe-lg-5`}>
                                <div className={`${styles.filterBoxHeader}`}>
                                    <h4 className={`text-center display-5 fw-bold shadow-lg`}><span className='text-primary'>The Easiest Way</span> to Get Your New Job</h4>
                                    <p className='text-center fs-5 fw-bold'>We offer multiple jobs right now, Search your preferable one</p>
                                </div>
                                <div className={`row justify-content-center align-items-center`}>
                                    <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
                                        <div className={`${styles.filterInputs} px-4`}>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                placeholder="Search by job title, location, company, or job type"
                                                value={search}
                                                onChange={handleSearchChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
                                        <div className={`${styles.stepCard} px-4`}>
                                            <Select
                                                options={uniqueLocations}
                                                placeholder="Select Location"
                                                value={selectedLocation}
                                                onChange={handleLocationChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-4'>
                                        <div className={`${styles.stepCard} px-4`}>
                                            <Select
                                                options={experienceLevelOptions}
                                                placeholder="Select Experience"
                                                value={selectedExperience}
                                                onChange={handleExperienceChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container-fluid'>
                        <div className='container shadow my-4'>
                            {filteredJobList.map((vacancy, index) => {
                                const vacancyObj = {
                                    ...vacancy,
                                    candidateEmail
                                };
                                return (
                                    <div key={index} className='row border rounded-3 shadow mb-4 text-center' style={{backgroundColor:'whitesmoke'}}>
                                        <div className='col-md-2 col-sm-3 col-4 p-4 shadow'>
                                            <div className='companyLogo bg-light mx-auto w-100 h-100'>
                                                <img
                                                    src={`/uploads/${vacancy.companyLogo}`}
                                                    alt='company logo'
                                                    className='img-responsive w-100 d-block'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-sm-5 col-8 p-4 text-start'>
                                            <h4 className='text-primary'>{vacancy.jobTitle}</h4>
                                            <h5 className='text-dark'>{vacancy.companyName}</h5>
                                            <p>{vacancy.jobLocation} ({vacancy.employmentType})</p>
                                        </div>
                                        <div className='col-md-4 col-sm-4 col-12 d-flex justify-content-center align-items-center p-2'>
                                            <div className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
                                                <input
                                                    type="button"
                                                    value="View More"
                                                    className='btn btn-outline-info shadow-lg mb-2 mb-md-0 me-md-2'
                                                    onClick={() => openModal(vacancy)}
                                                />
                                                <input
                                                    type="button"
                                                    className='btn btn-outline-success shadow-lg btn-active shadow'
                                                    value={appliedVacancies.some(appliedVacancy => appliedVacancy._id === vacancy._id) ? 'Applied' : 'Apply Now'}
                                                    onClick={() => applyForVacancy(vacancyObj)}
                                                    disabled={appliedVacancies.some(appliedVacancy => appliedVacancy._id === vacancy._id)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {loading && <div className="text-center my-4"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>}
                            <div ref={observerRef} /> {/* Intersection Observer ref */}
                        </div>
                    </div>
                </>
            }

            {showModal && selectedVacancy && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="resumeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="resumeModalLabel">Company Details</h5>
                                <button type="button" className="btn-close" onClick={closeResumeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group border border-light shadow-xs">
                                    <li className="list-group-item">
                                        <strong>Contact : </strong> {selectedVacancy.recruiterEmail} &nbsp;&nbsp;
                                        ( {selectedVacancy.jobPostingDate
                                            ? moment(selectedVacancy.jobPostingDate).isValid()
                                                ? getTimeDifference(selectedVacancy.jobPostingDate)
                                                : 'Invalid Date'
                                            : 'No Date Provided'} )
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Type : </strong> {selectedVacancy.employmentType}  - {selectedVacancy.workdays} / week
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Salary : </strong> {selectedVacancy.minSalary} rs - {selectedVacancy.maxSalary} rs on monthly basis
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Location : </strong> {selectedVacancy.jobLocation}, {selectedVacancy.state}
                                    </li>

                                </ul>
                                <div className='container bg-primary p-5' style={{ textAlign: 'center', background: 'linear-gradient(to left, #2c3e50, #58b8c7)' }} >
                                    <p className='fs-3'>{selectedVacancy.jobDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CandidateVacancyList;

