import { useState, useEffect, useRef } from 'react';
import { authentication, candidateGetAppliedVacancies, candidateWithdrawVacancyRequest, setCandidateCredential } from "../../store/candidateSlice.js";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavbar } from "../../store/navbarSlice.js";
import Select from 'react-select';
import styles from './profile.module.css';

function CandidateAppliedVacancyComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [appliedVacancies, setAppliedVacancies] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [selectedEmploymentType, setSelectedEmploymentType] = useState(null);

    const [displayedVacancies, setDisplayedVacancies] = useState([]);
    const [itemsPerPage] = useState(4);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadTimeout, setLoadTimeout] = useState(null);
    const candidateEmail = useSelector(state => state.candidateSlice.candidateEmail);
    const observerRef = useRef();

    const experienceLevelOptions = [
        { value: "Fresher", label: "Fresher" },
        { value: "Internship", label: "Internship" },
        { value: "0 - 1 year", label: "0 - 1 year" },
        { value: "1 - 3 year", label: "1 - 3 year" },
        { value: "3+ year", label: "3+ year" },
    ];

    const getAppliedVacancies = async () => {
        try {
            const result = await candidateGetAppliedVacancies();
            console.log('getApplideVacancies --> ', result.data);
            if (result.status === 200) {
                setAppliedVacancies(result.data.appliedVacancies);
                setDisplayedVacancies(result.data.appliedVacancies.slice(0, itemsPerPage)); // Initialize with first page items
                setHasMore(result.data.appliedVacancies.length > itemsPerPage);
            };

        } catch (error) {
            console.log("error in getJobList: ", error);
            navigate('/errorPage', { state: error });
        }
    }

    useEffect(() => {
        userauthantication();
        getAppliedVacancies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (appliedVacancies.length > 0) {
            setDisplayedVacancies(appliedVacancies.slice(0, page * itemsPerPage));
            setHasMore(appliedVacancies.length > page * itemsPerPage);
        }
    }, [page, appliedVacancies, itemsPerPage]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setLoading(true);
                    setLoadTimeout(setTimeout(() => {
                        setPage(prev => prev + 1);
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

    const userauthantication = async () => {
        try {
            const result = await authentication();
            if (result.status === 200) {
                dispatch(setCandidateCredential(result.data));
                dispatch(setNavbar("candidateAppliedVacancies"));
            }
        } catch (error) {
            console.log(error)
            navigate('/errorPage', { state: error });
        }
    }

    console.log('candidateGetAppliedVacancies', appliedVacancies);
    console.log('candidateEmail->', candidateEmail)

    const withdrawVacancyRequest = async (vacancyId) => {
        try {
            const result = await candidateWithdrawVacancyRequest(vacancyId);
            if (result.status === 200) {
                setAppliedVacancies(appliedVacancy => appliedVacancy.filter(vacancy => vacancy._id !== vacancyId));
                dispatch(setNavbar('candidateAppliedVacancies'));
            }
        } catch (error) {
            console.log(error)
            navigate('/errorPage', { state: error });
        }
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleLocationChange = (selectedOption) => {
        setSelectedLocation(selectedOption);
    };

    const handleExperienceChange = (selectedOption) => {
        setSelectedExperience(selectedOption);
    };



    const uniqueLocations = [...new Set(appliedVacancies.map(job => job.jobLocation))].map(location => ({ value: location, label: location }));

    const filteredJobList = appliedVacancies.filter(vacancy => {
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

    return (<>
        {(appliedVacancies) &&
            <>
                <div className={`container-fluid p-0 pb-4 ${styles.filterBox}`}>
                    <div className={`row justify-content-center align-items-center ps-lg-5 pe-lg-5 ${styles.overFilterBox}`}>
                        <div className={`container ps-lg-5 pe-lg-5`}>
                            <div className={`${styles.filterBoxHeader}`}>
                                <h4 className={`text-center display-5 shadow-lg`}><span className='text-primary'>The Easiest Way</span> to Get Your New Job</h4>
                                <p className='text-center fs-5 fw-bold'>We offer multiple jobs right now, Search your preferable one</p>
                            </div>
                            <div className={`row justify-content-center align-items-center`}>
                                <div className='col-12 col-md-6 col-lg-4 mb-4 mb-lg-0'>
                                    <div className={`${styles.filterInputs} px-4`}>
                                        <input
                                            type="text"
                                            className='form-control'
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
                                <div key={index} className='row border rounded-3 shadow mb-4 text-center'>
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
                                                value={vacancyObj.candidateStatus}
                                                className='btn btn-success btn-active shadow mb-2 mb-md-0 me-md-2'
                                            />
                                            <input
                                                type="button"
                                                className='btn btn-danger btn-active shadow'
                                                value='Withdraw Request'
                                                onClick={() => withdrawVacancyRequest(vacancyObj._id)}
                                            />
                                        </div>
                                    </div>
                                </div>

                            );
                        })}
                        {loading && <div className="text-center my-4"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>}
                        <div ref={observerRef} /> {/* Intersection Observer ref */}

                    </div>
                </div >
            </>
        }
    </>);
};

export default CandidateAppliedVacancyComponent;