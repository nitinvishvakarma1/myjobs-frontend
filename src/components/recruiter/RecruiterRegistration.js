
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stateCities,stateList } from "../../store/serverURL";
import Select from 'react-select';
import recruiter from '../../assets/recruiter.jpg';
import { recruiterVerifyEmail } from "../../store/recruiterSlice.js";
import OTPVerification from '../forms/OtpModal.js';
import styles from '../forms/registration.module.css';

function RecruiterRegistrationComponent() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [credential, setCredential] = useState({});
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCompanyType, setSelectedCompanyType] = useState();
    const [showModal, setShowModal] = useState(false);
   
    useEffect(() => {
        setStateOptions(stateList.map(state => ({ value: state, label: state })));
        window.scrollTo(0, 0);
    }, []);

    const handleStateChange = (selectedOption) => {
        const stateIndex = stateList.indexOf(selectedOption.value);
        const cities = stateCities[stateIndex].split('|').map(city => ({ value: city.trim(), label: city.trim() }));
        setCityOptions(cities);
        setData({
            ...data,
            state: selectedOption.value,
            city: ''
        });
    };

    const handleCityChange = (selectedOption) => {
        setData({
            ...data,
            city: selectedOption ? selectedOption.value : ''
        });
    };

    const companyTypeOptions = [
        { value: "Private Limited (Pvt. Ltd.)", label: "Private Limited (Pvt. Ltd.)" },
        { value: "Product-Based", label: "Product-Based" },
        { value: "Service-Based", label: "Service-Based" },
        { value: "Startup", label: "Startup" },
    ];

    const handleCompanyTypeChange = (selectedCompanyType) => {
        setSelectedCompanyType(selectedCompanyType);
        setData(data => ({
            ...data,
            companyType: selectedCompanyType.value
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
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
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await recruiterVerifyEmail(credential);
            console.log('recruiter registration form submission result :', result.status);
            if (result.status === 200) {
                setShowModal(true);
                // navigate("/verifyOTP", { state: recruiterURL });
            }
        } catch (error) {
            console.log('Error in recruiter registration form submission : ', error);
            navigate('/errorPage', { state: error });
        }
    }

    console.log('Data is saving ....', data);

    return (
        <>
            <div className={`container shadow-lg rounded-4 p-0 ${styles.recruiterRegistration}`}>
                <form action="" onSubmit={handleSubmit}>
                    <div className='row h-100 rounded-3'>
                        <div className='col-md-6 col-sm-12'>
                            <img src={recruiter} alt="poster" className={`img-responsive w-100 h-100 d-block rounded-3 rounded-end-0 ${styles.recruiterBg}`} />
                        </div>
                        <div className='col-md-6 col-sm-12 p-5'>
                            <input type="text" className='form-control mb-3' name="userName" placeholder='Full Name' onChange={handleChange} />
                            <input type="email" className='form-control mb-3' name="email" placeholder='Email Address' onChange={handleChange} />
                            <input type="tel" className='form-control mb-3' name="phone" placeholder='Contact Number' onChange={handleChange} />
                            <div className='d-flex'>
                                <input type="text" className='form-control mb-3 w-50 me-2' name="companyName" placeholder='Company Name' onChange={handleChange} />
                                <Select
                                    options={companyTypeOptions}
                                    name="companyType"
                                    value={selectedCompanyType}
                                    onChange={handleCompanyTypeChange}
                                    placeholder="Select Company Type"
                                    className='mb-3 w-50'
                                />
                            </div>
                            <div className='d-flex'>
                                <Select
                                    className='mb-3 w-50 me-2'
                                    placeholder='Select State'
                                    options={stateOptions}
                                    onChange={handleStateChange}
                                    isClearable
                                />
                                <Select
                                    className='mb-3 w-50'
                                    placeholder='Select City'
                                    options={cityOptions}
                                    onChange={handleCityChange}
                                    isClearable
                                    // isDisabled={!data.state}
                                />                            
                            </div>
                            <input type="password" className='form-control mb-3' name="password" placeholder='Password' onChange={handleChange} />
                            <input type="password" className='form-control mb-5' name="cpassword" placeholder='Confirm Password' onChange={handleChange} />
                            <input type="submit" value="Register Now" className='form-control h-5 bg-dark text-light' />
                        </div>
                    </div>
                </form>
            </div>
            {

                showModal && (<OTPVerification data={data} mode={'recruiter'} />)
            }
        </>
    );
}

export default RecruiterRegistrationComponent;
