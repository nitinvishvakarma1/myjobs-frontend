import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dreamJobs from '../../assets/dreamjobs.jpg';
import Select from 'react-select';
import { candidateVerifyEmail } from "../../store/candidateSlice.js";
import OTPVerification from '../forms/OtpModal.js';
import styles from '../forms/registration.module.css';

function JobSeekerRegistrationComponent() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState();
    const [selectedSkillsets, setSelectedSkillsets] = useState([]);
    const [selectedQualification, setSelectedQualification] = useState();
    const [showModal, setShowModal] = useState(false);
    const [credential, setCredential] = useState({});
    const [formDataToSubmit, setFormDataToSubmit] = useState([]);

    const experienceLevelOptions = [
        { value: "Fresher", label: "Fresher" },
        { value: "Internship", label: "Internship" },
        { value: "0 - 1 year", label: "0 - 1 year" },
        { value: "1 - 3 year", label: "1 - 3 year" },
        { value: "3+ year", label: "3+ year" },
    ];

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

    const qualificationOptions = [
        { value: 'BCA', label: 'BCA' },
        { value: 'MCA', label: 'MCA' },
        { value: 'BTech', label: 'BTech' },
        { value: 'MTech', label: 'MTech' },
        { value: 'BBA', label: 'BBA' },
        { value: 'MBA', label: 'MBA' },
        { value: 'BCOM', label: 'BCOM' },
        { value: 'Other', label: 'Other' }
    ];

    const handleExperieceChange = (selectedExperienceLevel) => {
        setSelectedExperienceLevel(selectedExperienceLevel);
        setData(data => ({
            ...data,
            experience: selectedExperienceLevel.value
        }));
    };

    const handleSkillsetChange = (selectedSkillsets) => {
        setSelectedSkillsets(selectedSkillsets);
        setData(data => ({
            ...data,
            skills: selectedSkillsets.map(option => option.value)
        }));
    };

    const handleQualificationChange = (selectedQualification) => {
        setSelectedQualification(selectedQualification);
        setData(data => ({
            ...data,
            qualification: selectedQualification.value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setData(data => ({
            ...data,
            resume: file
        }));
    }

    const handleChange = (event) => {
        let { name, value } = event.target;
        if (event.target.type === 'email' || event.target.name === 'userName') {
            setCredential({
                ...credential,
                [name]: value
            });

        }
        setData(() => {
            return {
                ...data,
                [name]: value
            }
        });
    }

    console.log('Data is saving ...', data);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }
            var abc = Array.from(formData.entries());
            console.log("Complete Form Data 👀 : ", abc);
            setFormDataToSubmit(formData);
            const result = await candidateVerifyEmail(credential);
            console.log('candidateVerifyEmail result.status', result.status);
            if (result.status === 200) {
                setShowModal(true);
                // navigate("/verifyOTP", { state: candidateURL });
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage',{state:error});
        }
    }

    var abc = Array.from(formDataToSubmit.entries());
    console.log("Complete Form Data 👀 🫡: ", abc);
    console.log("Credential Form Data 👀 🫡: ", credential);


    return (<>
        <div className={`container shadow-lg rounded-4 p-0 ${styles.candidateRegistration}`}>
            <form action="" onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='row h-100 rounded-4'>
                    <div className='col-md-6'>
                        <img src={dreamJobs} alt="poster" className='img-responsive w-100 h-100 rounded-end-0 d-block' />
                    </div>
                    <div className='col-md-6 p-5'>
                        <input type="text" className='form-control mb-3' name="userName" placeholder='Full Name' onChange={handleChange} />
                        <input type="email" className='form-control mb-3' name="email" placeholder='Email Address' onChange={handleChange} />
                        <input type="tel" className='form-control mb-3' name="phone" placeholder='Contact Number' onChange={handleChange} />
                        <div className='d-flex'>
                            <Select
                                options={qualificationOptions}
                                name="qualification"
                                value={selectedQualification}
                                onChange={handleQualificationChange}
                                placeholder="Select Qualification"
                                className='mb-3 w-50 me-2'
                            />
                            <Select
                                options={experienceLevelOptions}
                                name="experience"
                                value={selectedExperienceLevel}
                                onChange={handleExperieceChange}
                                placeholder="Select Experience"
                                className='w-50 mb-3'
                            />
                        </div>
                        <div className='d-flex'>
                            <Select
                                options={skillsetOptions}
                                name="skills"
                                value={selectedSkillsets}
                                onChange={handleSkillsetChange}
                                isMulti={true}
                                placeholder="Choose Skillsets"
                                className='w-50 mb-3 me-2'
                            />
                            {/* <div className="input-group mb-3 w-50">
                                <input type="file" className="form-control d-none" name='resume' id="resume" onChange={handleFileChange} />
                                <label className="input-group-text w-100" htmlFor="resume">Browse Resume</label>
                            </div> */}
                            <div className="input-group mb-3 w-50">
                                <input type="file" className="form-control d-none" name='resume' id="resume" onChange={handleFileChange} />
                                <label className="input-group-text w-100" htmlFor="resume">
                                    {selectedFile ? `${selectedFile.name} selected !` : "Browse Resume"}
                                </label>
                            </div>
                        </div>

                        <input type="password" className='form-control mb-3' name="password" placeholder='Password' onChange={handleChange} />
                        <input type="password" className='form-control mb-5' name="cpassword" placeholder='Confirm Password' onChange={handleChange} />
                        <input type="submit" value="Register Now" className='form-control h-5 bg-dark text-light' />
                    </div>
                </div>
            </form>
        </div>

        {
            showModal && (<OTPVerification data={formDataToSubmit} mode={'candidate'} />)
        }

            </>);
};

export default JobSeekerRegistrationComponent;
