import { useDispatch } from "react-redux";
import profileImg from '../../assets/profileIcon2.avif';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { authentication, candidateDeleteAccount, candidateUpdateProfile, setCandidateCredential } from "../../store/candidateSlice.js";
import { setNavbar } from "../../store/navbarSlice.js";
import styles from './profile.module.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Select from 'react-select';

function CandidateProfileComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [view, setView] = useState('viewAbout');
    const [dataToUpdate, setDataToUpdate] = useState(userData);
    const [selectedSkillsets, setSelectedSkillsets] = useState([]);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState();
    const [selectedQualification, setSelectedQualification] = useState();

    const profileRef = useRef(null);
    const newplugin = defaultLayoutPlugin();
    console.log('candidateCredential : ', userData);

    useEffect(() => {
        userauthantication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const userauthantication = async () => {
        try {
            const result = await authentication();
            if (result.status === 200) {
                setUserData(result.data.userData);
                setDataToUpdate(result.data.userData);
                dispatch(setCandidateCredential(result.data));
                dispatch(setNavbar("candidateProfile"));
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    }

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

    const experienceLevelOptions = [
        { value: "Fresher", label: "Fresher" },
        { value: "Internship", label: "Internship" },
        { value: "0 - 1 year", label: "0 - 1 year" },
        { value: "1 - 3 year", label: "1 - 3 year" },
        { value: "3+ year", label: "3+ year" },
    ];


    const handleExperieceChange = (selectedExperienceLevel) => {
        setSelectedExperienceLevel(selectedExperienceLevel);
        setDataToUpdate(data => ({
            ...data,
            experience: selectedExperienceLevel.value
        }));
    };

    const handleQualificationChange = (selectedQualification) => {
        setSelectedQualification(selectedQualification);
        setDataToUpdate(data => ({
            ...data,
            qualification: selectedQualification.value
        }));
    };


    const handleSkillsetChange = (selectedSkillsets) => {
        setSelectedSkillsets(selectedSkillsets);
        setDataToUpdate(dataToUpdate => ({
            ...dataToUpdate,
            skills: selectedSkillsets.map(option => option.value)
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'profileImg' && event.target.type === 'file') {
            let selectedImg = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                profileRef.current.src = event.target.result;
            };

            reader.readAsDataURL(selectedImg);
            // console.log('selected Img ', selectedImg);
            setDataToUpdate(() => {
                return {
                    ...dataToUpdate,
                    profileImg: selectedImg
                }
            });

        } else {
            setDataToUpdate(() => {
                return {
                    ...dataToUpdate,
                    [name]: value
                }
            });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            for (let key in dataToUpdate) {
                formData.append(key, dataToUpdate[key]);
            }
            var abc = Array.from(formData.entries());
            console.log("Complete dataToUpdate 👀 : ", abc);
            const result = await candidateUpdateProfile(formData);
            if (result.status === 200) {
                navigate("/candidateProfile");
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });

        }
    };


    const deactivateAccount = async () => {
        try {
            console.log('userData.email', userData.email);
            const result = await candidateDeleteAccount(userData.email);
            if (result.status === 200) {
                dispatch(setNavbar("home"));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    }

    console.log('Candidate data -> ', userData)
    console.log('Data to update -> ', dataToUpdate)
    return (<>
        {(userData) &&
            <div className="container-fluid shadow-lg p-4 p-lg-5 p-xl-5" style={{ height: 'auto' }}>
                <div className="row mb-3" style={{ background: 'linear-gradient(to left, #2c3e50, #58b8c7)' }}>
                    <div className="col-md-3 col-12 p-2 mb-md-0 bg-secondary" >
                        <div className="position-relative d-block w-100 h-100 border border-1 text-center mb-0 bg-opacity-50">
                            <img src={userData.profileImg ? `/uploads/${userData.profileImg}` : profileImg} ref={profileRef} alt="" style={{ height: '30vh' }} className="img-fluid d-block mx-auto" />
                        </div>
                    </div>
                    <div className="col-md-8 col-12  mb-md-0 p-4 p-lg-5 pb-0">
                        <div className="profile-head">
                            <h5 className="fw-bold fs-3">{userData.userName}</h5>
                            <h6 className="fw-light fs-5">{userData.profession}</h6>
                            <ul className="nav nav-tabs d-block d-lg-flex mt-5" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <Link className={`nav-link text-dark ${view === 'viewAbout' ? 'active' : ''} me-4`} onClick={() => setView('viewAbout')}>About Me</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link text-dark ${view === 'viewResume' ? 'active' : ''} me-4`} onClick={() => setView('viewResume')}>Resume</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link text-dark ${view === 'viewEditProfile' ? 'active' : ''} me-4`} onClick={() => setView('viewEditProfile')}>Edit Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link text-dark ${view === 'viewManageAccount' ? 'active' : ''} me-4`} onClick={() => setView('viewManageAccount')}>Deactivate Account</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        (view === 'viewAbout') ? <>
                            <LeftSection userData={userData} />
                            <div className={`col-md-9 col-12 p-md-5 p-0 border border-2 rounded-3 shadow ${styles.tabContent}`}>
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row g-1">
                                        <div className="col-md-6 col-12 mb-3">
                                            <div className="card h-100 shadow-lg">
                                                <div className="card-body">
                                                    <h5 className="card-title">Name</h5>
                                                    <p className="card-text">{userData.userName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <div className="card h-100 shadow-lg">
                                                <div className="card-body">
                                                    <h5 className="card-title">Profession</h5>
                                                    <p className="card-text">{userData.profession}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <div className="card h-100 shadow-lg">
                                                <div className="card-body">
                                                    <h5 className="card-title">Email</h5>
                                                    <p className="card-text">{userData.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <div className="card h-100 shadow-lg">
                                                <div className="card-body">
                                                    <h5 className="card-title">Phone</h5>
                                                    <p className="card-text">{userData.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <div className="card h-100 shadow-lg">
                                                <div className="card-body">
                                                    <h5 className="card-title">Qualification</h5>
                                                    <p className="card-text">{userData.qualification}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <div className="card h-100 shadow-lg">
                                                <div className="card-body">
                                                    <h5 className="card-title">Experience</h5>
                                                    <p className="card-text">{userData.experience}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                            : (view === 'viewResume') ? <>
                                <LeftSection userData={userData} />
                                <div className={`col-md-9 col-12 p-md-5 p-0 border border-2 rounded-3 shadow ${styles.tabContent}`}>
                                    <div className={`card-body ${styles.resumeContainer}`}>
                                        <div className={`${styles.pdfContainer}`}>
                                            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                                                {userData.resume && <>
                                                    <Viewer fileUrl={`/uploads/${userData.resume}`} plugins={[newplugin]} />
                                                </>}
                                                {
                                                    !userData.resume && <>No PDF</>
                                                }
                                            </Worker>
                                        </div>
                                    </div>
                                </div>
                            </>
                                : (view === 'viewManageAccount') ? <>
                                    <LeftSection userData={userData} />
                                    <div className={`col-md-9 col-12 p-md-5 p-0 border border-2 rounded-3 shadow ${styles.tabContent} mb-3`}>
                                        <div className={`card-body ${styles.resumeContainer} p-4 px-lg-3`} style={{ height: '300px', overflowY: 'scroll' }}>
                                            <h5 className="card-title">Dear {userData.userName},</h5>
                                            <p>
                                                Before you proceed with deactivating your Jobix Account, please take a moment to consider
                                                the following:
                                            </p>
                                            <ol>
                                                <li><strong>Data Loss:</strong> Deactivating your account will permanently remove your
                                                    profile and associated data, including your call history, connections and querries.
                                                    This data cannot be recovered.</li>
                                                <li><strong>Lost Access:</strong> You will no longer to access your Jobix Account and any
                                                    associated features. If you change your mind, you will need to create a new account
                                                    from scratch.</li>
                                                <li><strong>No Notifications:</strong> You won't receive any updates, notifications, or
                                                    messages from Team MyJobs Platform after deactivating your account.</li>
                                            </ol>
                                            <p>If you still wish to proceed, follow these steps:</p>
                                            <ol>
                                                <li>Log in to your Jobix Account.</li>
                                                <li>Go to your "Manage Account".</li>
                                                <li>Select the "Deactivate Account" option.</li>
                                                <li>You will no longer be able to access your data, once you deactivate your account.</li>
                                            </ol>
                                            <p>Remember, deactivating your account is a permanent action. We hope to see you again in
                                                the future if you choose to return.</p>
                                            <p>If you have any concerns or questions, don't hesitate to contact our
                                                support team at <a href="mailto:support@email.com">[support@email.com]</a>.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <input type="submit" value="Deactivate Account" className="btn btn-active btn-danger btn-md ms-auto w-25" onClick={deactivateAccount} />
                                    </div>
                                </>
                                    : <>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-3 col-12 p-3 mb-3 mb-md-0 border border-2 p-4 mb-3">
                                                    <h5>Bio</h5>
                                                    <div>
                                                        <textarea name="bio" className="form-control border border-2 mb-4 shadow" rows={4} defaultValue={userData.bio} placeholder="Write a short Bio that Introduce your work and passion"
                                                            onChange={handleChange}
                                                        ></textarea>
                                                    </div>
                                                    <h5>Skills</h5>
                                                    <Select
                                                        options={skillsetOptions}
                                                        name="skills"
                                                        defaultInputValue={userData.skills}
                                                        value={selectedSkillsets}
                                                        onChange={handleSkillsetChange}
                                                        isMulti={true}
                                                        placeholder="Choose Skillsets"
                                                        className='w-100 mb-4'
                                                    />
                                                    <h5>Profile Picture</h5>
                                                    <input type="file" name='profileImg' className="form-control" id="profileImg" onChange={handleChange} />
                                                </div>
                                                <div className={`col-md-9 col-12 p-md-5 p-0 rounded-3 shadow ${styles.tabContent} mb-3`}>
                                                    <div className="card-body">
                                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                            <div className="row g-1">
                                                                <div className="col-md-6 col-12 mb-3">
                                                                    <div className="card h-100 shadow-lg">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">Name</h5>
                                                                            <input type="text" className="form-control border border-2" name="userName" defaultValue={userData.userName} onChange={handleChange} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-12 mb-3">
                                                                    <div className="card h-100 shadow-lg">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">Profession</h5>
                                                                            <input type="text" className="form-control border border-2" name="profession" placeholder="Eg. Web Developer and Designer" onChange={handleChange} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-12 mb-3">
                                                                    <div className="card h-100 shadow-lg">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">Email</h5>
                                                                            <input type="email" className="form-control border border-2" name="email" value={userData.email} readOnly onChange={handleChange} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-12 mb-3">
                                                                    <div className="card h-100 shadow-lg">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">Phone</h5>
                                                                            <input type="tel" className="form-control border border-2" name="phone" defaultValue={userData.phone} onChange={handleChange} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-12 mb-3">
                                                                    <div className="card h-100 shadow-lg">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">Qualification</h5>
                                                                            <Select
                                                                                options={qualificationOptions}
                                                                                defaultInputValue={userData.qualification}
                                                                                name="qualification"
                                                                                value={selectedQualification}
                                                                                onChange={handleQualificationChange}
                                                                                placeholder="Select Qualification"
                                                                                className='w-100 border border-1 mb-3'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-12 mb-3">
                                                                    <div className="card h-100 shadow-lg">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">Experience</h5>
                                                                            <Select
                                                                                options={experienceLevelOptions}
                                                                                name="experience"
                                                                                defaultInputValue={userData.experience}
                                                                                value={selectedExperienceLevel}
                                                                                onChange={handleExperieceChange}
                                                                                placeholder="Select Experience Level"
                                                                                className='w-100 border border-1 mb-3'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <input type="submit" value="Save Changes" className="btn btn-active btn-primary btn-md ms-auto w-50" />
                                                </div>
                                            </div>
                                        </form>
                                    </>

                    }
                </div>
            </div >
        };

    </>);
}

export default CandidateProfileComponent;

const LeftSection = (userData) => {
    console.log('LeftSection ', userData.userData);
    return (<>
        <div className="col-md-3 col-12 p-3 mb-3 mb-md-0 border border-2 p-4">
            <h5>Bio</h5>
            <div className="mb-4">
                <p style={{ textAlign: 'justify', fontSize: '14px' }}>
                    {userData.bio ? userData.bio : 'I am passionate about leveraging my expertise to create robust and scalable solutions. Proficient in both frontend and backend technologies, I excel in environments that require innovative problem-solving and a keen eye for detail.'}
                </p>
            </div>
            <h5>Skills</h5>
            <ul className="list-group border border-light shadow-xs" style={{ fontSize: '14px' }}>
                {userData.skills && userData.skills.map((skill, index) => (<>
                    <li key={index} >{skill}</li>
                </>))}
                {!userData.skills && <>
                    <li className="list-group-item">
                        HTML
                    </li>
                    <li className="list-group-item">
                        CSS
                    </li>
                    <li className="list-group-item">
                        JavaScript
                    </li>
                    <li className="list-group-item">
                        MERN Stack
                    </li>
                    <li className="list-group-item">
                        Core Java, MySQL
                    </li>
                </>}
            </ul>
        </div>
    </>);
};
