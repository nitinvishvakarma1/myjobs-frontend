import { useDispatch, useSelector } from "react-redux";
import profileImg from '../../assets/profileIcon2.avif';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { setNavbar } from "../../store/navbarSlice.js";
import styles from './recruiter.module.css';

import Select from 'react-select';
import { recruiterAuthentication, recruiterDeleteAccount, recruiterUpdateProfile } from "../../store/recruiterSlice.js";
import { stateCities, stateList } from "../../store/serverURL";

function RecruiterProfileComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [view, setView] = useState('viewAbout');
    const [dataToUpdate, setDataToUpdate] = useState(userData);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState();
    const [selectedCompanyType, setSelectedCompanyType] = useState();

    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const profileRef = useRef(null);
    // console.log('Recruiter Credential : ', userData);
    const companyTypeOptions = [
        { value: "Private Limited (Pvt. Ltd.)", label: "Private Limited (Pvt. Ltd.)" },
        { value: "Product-Based", label: "Product-Based" },
        { value: "Service-Based", label: "Service-Based" },
        { value: "Startup", label: "Startup" },
    ];

    const experienceLevelOptions = [
        { value: "Fresher", label: "Fresher" },
        { value: "Intern", label: "Intern" },
        { value: "0 - 1 year", label: "0 - 1 year" },
        { value: "1 - 3 year", label: "1 - 3 year" },
        { value: "3+ year", label: "3+ year" },
    ];

    const handleStateChange = selectedOption => {
        const stateIndex = stateList.indexOf(selectedOption.value);
        const cities = stateCities[stateIndex].split('|').map(city => ({ value: city.trim(), label: city.trim() }));
        setCityOptions(cities);
        setDataToUpdate({
            ...dataToUpdate,
            state: selectedOption.value,
            city: ''
        });
    };

    const handleCityChange = selectedOption => {
        setDataToUpdate({
            ...dataToUpdate,
            city: selectedOption ? selectedOption.value : ''
        });
    };

    useEffect(() => {
        setStateOptions(stateList.map(state => ({ value: state, label: state })));
    }, []);

    useEffect(() => {
        userauthantication();
    }, []);

    const userauthantication = async () => {
        const result = await recruiterAuthentication();
        if (result.status == 200) {
            setUserData(result.data.userData);
            setDataToUpdate(result.data.userData);
            dispatch(setNavbar("recruiterProfile"));
            console.log('recruiterAuthentication complete ', result);
        }
        console.log('recruiterAuthentication without await ', result.data);
    }

    const handleExperieceChange = (selectedExperienceLevel) => {
        setSelectedExperienceLevel(selectedExperienceLevel);
        setDataToUpdate(dataToUpdate => ({
            ...dataToUpdate,
            experience: selectedExperienceLevel.value
        }));
    };

    const handleCompanyTypeChange = (selectedCompanyType) => {
        setSelectedCompanyType(selectedCompanyType);
        setDataToUpdate(dataToUpdate => ({
            ...dataToUpdate,
            companyType: selectedCompanyType.value
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
            // console.log("Complete dataToUpdate 👀 : ", abc);
            const result = await recruiterUpdateProfile(formData);
            if (result.status === 200) {
                navigate("/recruiterProfile");
            };
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    };

    const deactivateAccount = async () => {
        try {
            console.log('userData.email', userData.email);
            const result = await recruiterDeleteAccount(userData.email);
            if (result.status === 200) {
                dispatch(setNavbar("home"));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    }
    // console.log('Recruiter data -> ', userData)
    console.log('Data to update -> ', dataToUpdate)
    return (<>
        {(userData) &&
            <div className="container-fluid shadow-lg p-4 p-lg-5 p-xl-5" style={{ height: 'auto' }}>
                <div className="row mb-3" style={{ background: 'linear-gradient(to left, #2c3e50, #58b8c7)' }}>
                    <div className="col-md-3 col-12 p-2 mb-md-0 bg-secondary">
                        <div className="position-relative d-block w-100 h-100 border border-1 text-center mb-0 bg-opacity-50">
                            <img src={userData.profileImg ? `/uploads/${userData.profileImg}` : profileImg} ref={profileRef} alt="" style={{ height: '30vh' }} className="img-fluid d-block mx-auto" />
                        </div>
                    </div>
                    <div className="col-md-8 col-12  mb-md-0 p-4 pb-3 p-lg-5 pb-0">
                        <div className="profile-head">
                            <h5 className="fw-bold fs-3">{userData.userName}</h5>
                            <h6 className="fw-light fs-5">{userData.profession}</h6>
                            <ul className="nav nav-tabs d-block d-lg-flex  mt-4 mt-lg-5" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <Link className={`nav-link text-dark ${view === 'viewAbout' ? 'active' : ''} me-4`} onClick={() => setView('viewAbout')}>About Me</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link text-dark ${view === 'viewEditProfile' ? 'active' : ''} me-4`} onClick={() => setView('viewEditProfile')}>Edit Profile</Link>
                                </li>
                                <li className="nav-item ">
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
                                                    <p className="card-text">{userData.profession ? userData.profession : 'HR Recruiter'}</p>
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
                                                    <h5 className="card-title">Company</h5>
                                                    <p className="card-text">{userData.companyName} {userData.companyType}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <div className="card h-100 shadow-lg">
                                                <div className="card-body">
                                                    <h5 className="card-title">Experience</h5>
                                                    <p className="card-text">{userData.experience ? userData.experience : '0 - 1 year'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <div className="card h-100 shadow-lg">
                                                <div className="card-body">
                                                    <h5 className="card-title">State</h5>
                                                    <p className="card-text">{userData.state ? userData.state : 'Madhya Pradesh'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <div className="card h-100 shadow-lg">
                                                <div className="card-body">
                                                    <h5 className="card-title">City</h5>
                                                    <p className="card-text">{userData.city ? userData.city : 'Indore'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                            : (view === 'viewManageAccount') ? <>
                                <LeftSection userData={userData} />
                                <div className={`col-md-9 col-12 p-md-5 p-5 border border-2 rounded-3 shadow ${styles.recruiterDeactivateAccountSection} mb-3`}>
                                    <h5 className="card-title">Dear {userData.userName},</h5>
                                    <p>
                                        Before you proceed with deactivating your Team MyJobs Account, please take a moment to consider
                                        the following:
                                    </p>
                                    <ol>
                                        <li><strong>Data Loss:</strong> Deactivating your account will permanently remove your
                                            profile and associated data, including your call history, connections and querries.
                                            This data cannot be recovered.</li>
                                        <li><strong>Lost Access:</strong> You will no longer to access your Team MyJobs Account and any
                                            associated features. If you change your mind, you will need to create a new account
                                            from scratch.</li>
                                        <li><strong>No Notifications:</strong> You won't receive any updates, notifications, or
                                            messages from Team MyJobs Platform after deactivating your account.</li>
                                    </ol>
                                    <p>If you still wish to proceed, follow these steps:</p>
                                    <ol>
                                        <li>Log in to your Team MyJobs Account.</li>
                                        <li>Go to your "Manage Account".</li>
                                        <li>Select the "Deactivate Account" option.</li>
                                        <li>You will no longer be able to access your data, once you deactivate your account.</li>
                                    </ol>
                                    <p>Remember, deactivating your account is a permanent action. We hope to see you again in
                                        the future if you choose to return.</p>
                                    <p>If you have any concerns or questions, don't hesitate to contact our
                                        support team at <a href="mailto:support@email.com">[support@email.com]</a>.</p>
                                    <div className="row jutify-content-center">
                                        <div>
                                            <input type="submit" value="Deactivate Account" className="btn btn-active btn-danger btn-md ms-lg-auto me-lg-3 w-100 w-lg-25" onClick={deactivateAccount} />
                                        </div>
                                    </div>
                                </div>
                            </>
                                : <>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className={`col-md-3 col-12 p-4 mb-3 mb-md-0 border border-2 ${styles.recruiterProfile}`} >
                                                <h5>Bio</h5>
                                                <textarea name="bio" className="form-control border border-2 mb-4 shadow" rows={4} defaultValue={userData.bio} placeholder="Write a short Bio that Introduce your work and passion"
                                                    onChange={handleChange}
                                                ></textarea>
                                                <h5 >Profession</h5>
                                                <input type="text" className="form-control border border-2 mb-3 shadow" name="profession" defaultValue={userData.profession} placeholder="Eg. HR Recruite" onChange={handleChange} />
                                                <h5>Profile Picture</h5>
                                                <input type="file" name='profileImg' className="form-control shadow" id="profileImg" onChange={handleChange} />
                                            </div>
                                            <div className={`col-md-9 col-12 p-md-5 p-0 rounded-3 shadow ${styles.recruiterEditProfileRightSection} mb-3`}  >
                                                <div className="card-body">
                                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                        <div className="row g-1">
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="card shadow-lg">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Name</h5>
                                                                        <input type="text" className="form-control border border-2" name="userName" defaultValue={userData.userName} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="card shadow-lg">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Company Name</h5>
                                                                        <input type="text" className="form-control border border-2" name="companyName" defaultValue={userData.companyName} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="card shadow-lg">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Email</h5>
                                                                        <input type="email" className="form-control border border-2" name="email" value={userData.email} readOnly onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="card shadow-lg">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Company Type</h5>
                                                                        <Select
                                                                            options={companyTypeOptions}
                                                                            name="companyType"
                                                                            defaultInputValue={userData.companyType}
                                                                            value={selectedCompanyType}
                                                                            onChange={handleCompanyTypeChange}
                                                                            placeholder="Select Company Type"
                                                                        />                                                                        </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="card shadow-lg">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Phone</h5>
                                                                        <input type="tel" className="form-control border border-2" name="phone" defaultValue={userData.phone} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="card shadow-lg">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Experience</h5>
                                                                        <Select
                                                                            options={experienceLevelOptions}
                                                                            name="experience"
                                                                            defaultInputValue={userData.experience}
                                                                            value={selectedExperienceLevel}
                                                                            onChange={handleExperieceChange}
                                                                            placeholder="Select Experience Level"
                                                                            className='w-100 border border-1'
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="card shadow-lg">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">State</h5>
                                                                        <Select
                                                                            className='mb-3 me-2 w-100 border border-1'
                                                                            placeholder='Select State'
                                                                            defaultInputValue={userData.state}
                                                                            options={stateOptions}
                                                                            onChange={handleStateChange}
                                                                            isClearable
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 mb-3">
                                                                <div className="card shadow-lg">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">City</h5>
                                                                        <Select
                                                                            className='mb-3 me-2 w-100 border border-1'
                                                                            placeholder='Select City'
                                                                            defaultInputValue={userData.city}
                                                                            options={cityOptions}
                                                                            onChange={handleCityChange}
                                                                            isClearable
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center justify-content-center">
                                                        <div>
                                                            <input type="submit" value="Save Changes" className="btn btn-active btn-primary  btn-lg-outline-primary btn-md ms-auto me-3 w-25" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </>
                    }
                </div>
            </div >
        }
    </>);
}

export default RecruiterProfileComponent;

const LeftSection = ({ userData }) => {
    console.log('LeftSection ', userData);
    return (<>
        <div className={`col-md-3 col-12 p-3 mb-3 mb-md-0 border border-2 p-4 ${styles.recruiterProfile}`}>
            <h5>Bio</h5>
            <div className="mb-5">
                <p style={{ textAlign: 'justify', fontSize: '16px' }}>
                    {userData.bio ? userData.bio : 'Experienced HR Recruiter skilled in sourcing top talent and enhancing workforce quality through strategic hiring.'}
                </p>
            </div>
            <h5>Contact Details</h5>
            <ul className="list-group border border-light shadow-xs" style={{ fontSize: '16px' }}>
                <li className="list-group-item">
                    <strong>Email : </strong>{userData.email}
                </li>
                <li className="list-group-item">
                    <strong>Contact Number : </strong>{userData.phone}
                </li>
                <li className="list-group-item">
                    <strong>Company Name : </strong>{userData.companyName}
                </li>
                <li className="list-group-item">
                    <strong>Company Address : </strong>{userData.city} {userData.state} India
                </li>
            </ul>
        </div>
    </>);
};