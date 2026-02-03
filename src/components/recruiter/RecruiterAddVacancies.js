import { useDispatch, useSelector } from "react-redux";
import profileImg from '../../assets/profileIcon2.avif';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { setNavbar } from "../../store/navbarSlice.js";
import styles from './recruiter.module.css';

import Select from 'react-select';
import { recruiterAuthentication } from "../../store/recruiterSlice.js";
import RecruiterVacancyList from "./RecruiterVacancyList.js";
import axios from "axios";
import { recruiterAddVacancy } from "../../store/vacancySlice.js";
import { FooterComponent } from "../homepage/Homepage.js";

function RecruiterAddVacancyComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [selectedSkillsets, setSelectedSkillsets] = useState([]);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState();
    const [selectedEmploymentType, setSelectedEmploymentType] = useState();
    const [selectedQualifications, setSelectedQualifications] = useState();
    const [selectedWorkdays, setSelectedWorkdays] = useState();
    const [selectedJobCategory, setSelectedJobCategory] = useState();

    const [userData, setUserData] = useState();
    const [vacancyData, setVacancyData] = useState({});

    useEffect(() => {
        userauthantication();
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
                dispatch(setNavbar("recruiterAddVacancy"));
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    }

    const jobCategoryOptions = [
        { value: "Healthcare", label: "Healthcare" },
        { value: "Finance", label: "Finance" },
        { value: "Human Resources", label: "Human Resources" },
        { value: "Engineering", label: "Engineering" },
        { value: "Information Technology/ Development", label: "Information Technology/ Development" },
        { value: "Sales and Marketing", label: "Sales and Marketing" }
    ]

    const qualificationOptions = [
        { value: 'BCA', label: 'BCA' },
        { value: 'MCA', label: 'MCA' },
        { value: 'B.E.', label: 'B.E.' },
        { value: 'BTech', label: 'BTech' },
        { value: 'MTech', label: 'MTech' },
        { value: 'BBA', label: 'BBA' },
        { value: 'MBA', label: 'MBA' },
        { value: 'BCom', label: 'BCom' },
        { value: 'Any Graduate', label: 'Any Graduate' }
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

    const handleJobCategoryChange = (selectedJobCategory) => {
        setSelectedJobCategory(selectedJobCategory);
        setVacancyData((vacancyData) => ({
            ...vacancyData,
            jobCategory: selectedJobCategory.value
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
            const result = await recruiterAddVacancy(formData);
            console.log('recruiterAddVacancy result ', result.data);
            if (result.status === 200) {
                navigate('/recruiterVacancyList');
            }
        } catch (error) {
            console.log('recruiterAddVacancy error ', error);
            navigate('/errorPage',{state:error});
        }
    };


    console.log('Recruiter add vacancy data : ', vacancyData);

    return (<>
        <div className={`container-fluid bg-danger shadow-lg ${styles.recruiterAddVacancyBanner}`}>
            <div className={`row justify-content-center align-items-center ${styles.overRecruiterAddVacancyBanner}`}>
                <h2 className="text-center text-light">Post Your Job</h2>
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
                        userData &&
                        <div className="container mt-cl-5 mt-lg-5 rounded-2 shadow-lg" style={{ padding: '9%', background: 'linear-gradient(to left, #303030, #9A9A9A)' }}>
                            <form action="" method="" onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="carousel-inner p-1 p-xl-4 p-lg-4" style={{ overflow: 'visible' }}>
                                    <div className={`carousel-item ${step === 0 ? 'active' : ''}`}>
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Job Title</label>
                                                    <input type="text" name="jobTitle" placeholder="Enter Job Title" className="form-control" onChange={handleChange} />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="jobCategory" className="text-light mb-2">Job Category</label>
                                                    <Select
                                                        options={jobCategoryOptions}
                                                        name="employmentType"
                                                        value={selectedJobCategory}
                                                        onChange={handleJobCategoryChange}
                                                        isClearable
                                                        placeholder="Select Job Category"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Minimum Salary</label>
                                                    <input type="text" name="minSalary" placeholder="Enter Minimum Salary" className="form-control" onChange={handleChange} />
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Job Type</label>
                                                    <Select
                                                        options={employmentTypeOptions}
                                                        name="employmentType"
                                                        value={selectedEmploymentType}
                                                        onChange={handleEmploymentTypeChange}
                                                        placeholder="Select Job Type"
                                                        isClearable
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2" >Location</label>
                                                    <input type="text" name="jobLocation" value={userData.city} placeholder="Enter Job Location" className="form-control" readOnly />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Maximum Salary</label>
                                                    <input type="text" name="maxSalary" placeholder="Enter Maximum Salary" className="form-control" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`carousel-item ${step === 1 ? 'active' : ''}`}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2" >Company Name</label>
                                                    <input type="text" name="companyName" value={userData.companyName} placeholder="Enter Company Name" className="form-control" readOnly />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Skills required</label>
                                                    <Select
                                                        options={skillsetOptions}
                                                        name="requiredSkillSets"
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
                                                        name="requiredSkillSets"
                                                        value={selectedQualifications}
                                                        onChange={handleQualificationChange}
                                                        isMulti={true}
                                                        placeholder="Choose Criteria"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Company Logo</label>
                                                    <input type="file" name="companyLogo" className="form-control" id="companyLogo" onChange={handleFileChange} />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Required Experience</label>
                                                    <Select
                                                        options={experienceLevelOptions}
                                                        name="experienceLevel"
                                                        value={selectedExperienceLevel}
                                                        onChange={handleExperieceChange}
                                                        placeholder="Choose Experience Level"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Vacancies</label>
                                                    <input type="text" name="numberOfVacancy" placeholder="Enter Number of Vacancy" className="form-control" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`carousel-item ${step === 2 ? 'active' : ''}`}>
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
                                                        value={selectedWorkdays}
                                                        onChange={handleWorkdaysChange}
                                                        placeholder="Select Work Days"
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="text-light mb-2">Advertisement Date</label>
                                                    <input type="date" name="jobPostingDate" className="form-control" onChange={handleChange} />
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3 p-0">
                                                    <label className="text-light mb-3">Job Description</label>
                                                    <textarea className="form-control" name="jobDescription" aria-label="With textarea" placeholder="Enter Job Description" rows={5} onChange={handleChange}></textarea>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <button type='button' className="btn btn-primary" onClick={handlePrevious} disabled={step === 0}>
                                        Previous
                                    </button>
                                    <button type='button' className={`btn btn-primary ${step === 2 && 'd-none'}`} onClick={handleNext}  >
                                        Next
                                    </button>
                                    <button type='submit' className={`btn btn-primary ${step === 2 ? 'd-block' : 'd-none'}`} disabled={step != 2}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
        {/* <div className="container-fluid px-5 my-5 shadow-lg py-5">
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                    </div>
                </div>
            </div>
        </div> */}
    </>);
}

export default RecruiterAddVacancyComponent;