import { useDispatch, useSelector } from "react-redux";
import profileImg from '../../assets/profileIcon2.avif';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { setNavbar } from "../../store/navbarSlice.js";
import styles from './recruiter.module.css';

import Select from 'react-select';
import { recruiterAuthentication } from "../../store/recruiterSlice.js";
import RecruiterVacancyList from "./RecruiterVacancyList.js";
import axios from "axios";
import { recruiterUpdateVacancy } from "../../store/vacancySlice.js";
import { FooterComponent } from "../homepage/Homepage.js";

function RecruiterUpdateVacancyComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(0);
    const [selectedSkillsets, setSelectedSkillsets] = useState([]);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState();
    const [selectedEmploymentType, setSelectedEmploymentType] = useState();
    const [selectedQualifications, setSelectedQualifications] = useState();
    const [selectedWorkdays, setSelectedWorkdays] = useState();

    const [userData, setUserData] = useState();
    const [vacancyData, setVacancyData] = useState({});

    console.log('location.state ===> ', location.state)
    useEffect(() => {
        userauthantication();
        console.log('location.state ===> 1', location.state)
        if (location.state != null) {
            const vacancyObj = location.state;
            setVacancyData(vacancyObj);
        }
    }, []);

    useEffect(() => {
        if (userData) {
            setVacancyData((vacancyData) => ({
                ...vacancyData,
                recruiterEmail: userData.email,
                jobLocation: userData.city,
                city: userData.city,
                state: userData.state,
                companyName: userData.companyName
            }));
        }
    }, [userData]);

    const userauthantication = async () => {
        try {
            const result = await recruiterAuthentication();
            if (result.status == 200) {
                setUserData(result.data.userData);
                dispatch(setNavbar("recruiterUpdateVacancy"));
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    }

    const qualificationOptions = [
        { value: 'BCA', label: 'BCA' },
        { value: 'MCA', label: 'MCA' },
        { value: 'B.E.', label: 'B.E.' },
        { value: 'BTech', label: 'BTech' },
        { value: 'MTech', label: 'MTech' },
        { value: 'BBA', label: 'BBA' },
        { value: 'MBA', label: 'MBA' },
        { value: 'BCom', label: 'BCom' },
        { value: 'Other', label: 'Other' }
    ]
    const skillsetOptions = [
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "JavaScript", label: "JavaScript" },
        { value: "MERN/MEAN", label: "MERN/MEAN" },
        { value: "MERN", label: "MERN" },
        { value: "Angular", label: "Angular" },
        { value: "React.js", label: "React.js" },
        { value: "Node.js", label: "Node.js" },
        { value: "Python", label: "Python" },
        { value: "MySQL", label: "MySQL" },
        { value: "JQuery", label: "JQuery" },
        { value: "UI/UX", label: "UI/UX" },
        { value: "Graphic Design", label: "Graphic Design" },
        { value: "English Communication", label: "English Communication" },
    ];
    const experienceLevelOptions = [
        { value: "Fresher", label: "Fresher" },
        { value: "Internship", label: "Internship" },
        { value: "0 - 1 year", label: "0 - 1 year" },
        { value: "1 - 3 year", label: "1 - 3 year" },
        { value: "3+ year", label: "3+ year" },
    ];

    const employmentTypeOptions = [
        { value: "Full-time", label: "Full-time" },
        { value: "Part-time", label: "Part-time" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "Remote", label: "Remote" },
    ]

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleWorkdaysChange = (selectedWorkdays) => {
        setSelectedWorkdays(selectedWorkdays);
        setVacancyData((vacancyData) => ({
            ...vacancyData,
            workdays: selectedWorkdays.value
        }));
    };

    const handleQualificationChange = (selectedQualifications) => {
        setSelectedQualifications(selectedQualifications);
        setVacancyData((vacancyData) => ({
            ...vacancyData,
            qualification: selectedQualifications.map(option => option.value)
        }));
    };

    const handleSkillsetChange = (selectedSkillsets) => {
        setSelectedSkillsets(selectedSkillsets);
        setVacancyData((vacancyData) => ({
            ...vacancyData,
            requiredSkillSets: selectedSkillsets.map(option => option.value)
        }));
    };

    const handleExperieceChange = (selectedExperienceLevel) => {
        setSelectedExperienceLevel(selectedExperienceLevel);
        setVacancyData((vacancyData) => ({
            ...vacancyData,
            experienceLevel: selectedExperienceLevel.value
        }));
    };

    const handleEmploymentTypeChange = (selectedEmploymentType) => {
        setSelectedEmploymentType(selectedEmploymentType);
        setVacancyData((vacancyData) => ({
            ...vacancyData,
            employmentType: selectedEmploymentType.value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setVacancyData((vacancyData) => ({
            ...vacancyData,
            companyLogo: file
        }));
    }

    const handleChange = (event) => {
        let { name, value } = event.target;
        setVacancyData((vacancyData) => ({
            ...vacancyData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            for (let key in vacancyData) {
                formData.append(key, vacancyData[key]);
            }
            var abc = Array.from(formData.entries());
            console.log("Complete vacancyData 👀 : ", abc);
            const result = await recruiterUpdateVacancy(vacancyData._id, formData);
            if (result.status === 200) {
                navigate('/recruiterVacancyList');
            }
        } catch (error) {
            console.log('recruiterAddVacancy error ', error);
            navigate('/errorPage', { state: error });
        }
    };


    console.log('Recruiter add vacancy data : ', vacancyData);

    return (<>
        <div className={`container-fluid shadow-lg ${styles.recruiterUpdateVacancyBanner}`}>
            <div className={`row justify-content-center align-items-center ${styles.overRecruiterUpdateVacancyBanner}`}>
                <h2 className="text-center text-light">Update Vacancy Details</h2>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12">
                    <div className="container my-3 my-xl-5 my-lg-5 p-3 p-xl-5 p-lg-5">
                        <h2 className="text-center">Quick Rules</h2>
                        <p className="text-center">Posting a job ad on myjobs.com is free! However, all posts must follow our rules:</p>
                        <ul className="list-group border border-light shadow-xs">
                            <li className="list-group-item">
                                <strong>1. Correct Category:</strong> Make sure you post in the correct category.
                            </li>
                            <li className="list-group-item">
                                <strong>2. No Duplicate Ads:</strong> Do not post the same ad more than once or repost an ad within 48 hours.
                            </li>
                            <li className="list-group-item">
                                <strong>3. No Watermarks:</strong> Do not upload pictures with watermarks.
                            </li>
                            <li className="list-group-item">
                                <strong>4. No Contact Info in Title/Description:</strong> Do not put your email or phone numbers in the title or description.
                            </li>
                            <li className="list-group-item">
                                <strong>5. Make Sure to :</strong> Keep your profile up-to-date. Company Name, Location, Email would be considered from your profile.
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-xs-12 pt-4">
                    {
                        userData && vacancyData &&
                        <div className="container mt-cl-5 mt-lg-5 rounded-2 shadow-lg" style={{ padding: '9%', background: 'linear-gradient(to left, #303030, #9A9A9A)' }}>
                            <form action="" method="" onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="carousel-inner p-1 p-xl-4 p-lg-4" style={{ overflow: 'visible' }}>
                                    <div className={`carousel-item ${step === 0 ? 'active' : ''}`}>
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Job Title</label>
                                                    <input type="text" name="jobTitle"
                                                        placeholder="Enter Job Title"
                                                        className="form-control"
                                                        defaultValue={vacancyData.jobTitle}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Minimum Salary</label>
                                                    <input type="text" name="minSalary"
                                                        placeholder="Enter Minimum Salary"
                                                        className="form-control"
                                                        defaultValue={vacancyData.minSalary}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Job Type</label>
                                                    <Select
                                                        options={employmentTypeOptions}
                                                        name="employmentType"
                                                        defaultInputValue={vacancyData.employmentType}
                                                        value={selectedEmploymentType}
                                                        onChange={handleEmploymentTypeChange}
                                                        placeholder="Select Job Type"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Maximum Salary</label>
                                                    <input type="text" name="maxSalary" defaultValue={vacancyData.maxSalary} placeholder="Enter Maximum Salary" className="form-control" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`carousel-item ${step === 1 ? 'active' : ''}`}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2" >Company Name</label>
                                                    <input type="text" name="companyName" defaultValue={vacancyData.companyName} placeholder="Enter Company Name" className="form-control" readOnly />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2" >Location</label>
                                                    <input type="text" name="jobLocation" defaultValue={vacancyData.city} placeholder="Enter Job Location" className="form-control" readOnly />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Company Logo</label>
                                                    <input type="file" name="companyLogo" className="form-control" id="companyLogo" onChange={handleFileChange} />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Vacancies</label>
                                                    <input type="text" name="numberOfVacancy" defaultValue={vacancyData.numberOfVacancy} placeholder="Enter Number of Vacancy" className="form-control" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`carousel-item ${step === 2 ? 'active' : ''}`}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Skills required</label>
                                                    <Select
                                                        options={skillsetOptions}
                                                        name="requiredSkillSets"
                                                        defaultInputValue={vacancyData.requiredSkillSets}
                                                        value={selectedSkillsets}
                                                        onChange={handleSkillsetChange}
                                                        isMulti={true}
                                                        placeholder="Choose Skillsets"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Qualification</label>
                                                    <Select
                                                        options={qualificationOptions}
                                                        name="qualification"
                                                        defaultInputValue={vacancyData.qualification}
                                                        value={selectedQualifications}
                                                        onChange={handleQualificationChange}
                                                        isMulti={true}
                                                        placeholder="Choose Criteria"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Required Experience</label>
                                                    <Select
                                                        options={experienceLevelOptions}
                                                        name="experienceLevel"
                                                        defaultInputValue={vacancyData.experienceLevel}
                                                        value={selectedExperienceLevel}
                                                        onChange={handleExperieceChange}
                                                        placeholder="Choose Experience Level"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Advertisement Date</label>
                                                    <input type="date" name="jobPostingDate" defaultValue={vacancyData.jobPostingDate} className="form-control" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className={`carousel-item ${step === 3 ? 'active' : ''}`}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Recruiter Email</label>
                                                    <input type="email" name="recruiterEmail" value={userData.email} placeholder="Enter Your Email Address" className="form-control" readOnly />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Work Days</label>
                                                    <Select
                                                        options={[{ value: '6 days', label: '6 days' }, { value: '5 days', label: '5 days' }]}
                                                        name="workdays"
                                                        defaultInputValue={vacancyData.workdays}
                                                        value={selectedWorkdays}
                                                        onChange={handleWorkdaysChange}
                                                        placeholder="Select Work Days"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3 p-0">
                                                    <label className="text-light mb-3">Job Description</label>
                                                    <textarea className="form-control" name="jobDescription" defaultValue={vacancyData.jobDescription} aria-label="With textarea" placeholder="Enter Job Description" rows={4} onChange={handleChange}></textarea>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type='button' className="btn btn-primary" onClick={handlePrevious} disabled={step === 0}>
                                        Previous
                                    </button>
                                    <button type='button' className={`btn btn-primary ${step === 3 && 'd-none'}`} onClick={handleNext}  >
                                        Next
                                    </button>
                                    <button type='submit' className={`btn btn-primary ${step === 3 ? 'd-block' : 'd-none'}`} disabled={step != 3}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    </>);
}

export default RecruiterUpdateVacancyComponent;