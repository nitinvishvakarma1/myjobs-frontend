import React, { useState, useEffect } from 'react';
import { candidateRegistration, setCandidateCredential } from '../../store/candidateSlice.js';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { recruiterRegistration, setRecruiterCredential } from '../../store/recruiterSlice';

export const OTPVerification = ({ data, mode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otpInputs, setOtpInputs] = useState(Array(4).fill(''));
    const [buttonActive, setButtonActive] = useState(false);

    const goToCandidateHome = () => {
        console.log('goToCandidateHome ..!');
        navigate('/candidateHome', { replacea: true });
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const otpString = otpInputs.join('');
            console.log("otpString>>>>>>>>>", otpString);
            if (mode === 'candidate') {
                var abc = Array.from(data.entries());
                // console.log("Action.payload in otp modal abc 😶: ", abc);
                const result = await candidateRegistration(data, otpString);
                if (result.status === 200) {
                    console.log('candidateRegistration otp verification result : ', result.data);
                    dispatch(setCandidateCredential(result.data));
                    setTimeout(() => {
                        navigate('/candidateHome');
                    }, 1000);
                }
            } else if (mode === 'recruiter') {
                const result = await recruiterRegistration(data, otpString);
                if (result.status === 200) {
                    console.log('recruiterRegistration otp verification result : ', result.data);
                    dispatch(setRecruiterCredential(result.data));
                    setTimeout(() => {
                        navigate('/recruiterHome');
                    }, 1000);
                }
            }
            console.log('Registration Successfull ..!');
        } catch (error) {
            console.log(error);
            navigate('/errorPage', { state: error });
        }
    };


    useEffect(() => {
        document.getElementById('otp-input-0').focus();
        console.log('Component rendered or state changed');
        return () => {
            console.log('Cleanup on component unmount');
        };
    }, []);

    const handleInputChange = (index, value) => {
        const newOtpInputs = [...otpInputs];
        newOtpInputs[index] = value;

        setOtpInputs(newOtpInputs);

        const nextIndex = index + 1;
        if (nextIndex < 4 && newOtpInputs[index] !== '') {
            document.getElementById(`otp-input-${nextIndex}`).removeAttribute('disabled');
            document.getElementById(`otp-input-${nextIndex}`).focus();
        }

        setButtonActive(newOtpInputs.every(input => input !== ''));
    };

    const handleBackspace = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && otpInputs[index] === '') {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };


    return (<>
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-md" role="document">
                <div className="modal-content">
                    <div className="modal-body p-4 shadow-lg">
                        <div className="container text-center text-black">
                            <h2>Enter Your OTP</h2>
                            <p className="mt-1 text-black" style={{ fontSize: '1rem' }}>
                                We sent to your email address ..!
                            </p>

                            <form onSubmit={handleSubmit} className="form">
                                <div className=" row d-flex justify-content-around  align-items-center input-field-box" >
                                    {otpInputs.map((value, index) => (
                                        <div className="col-3">
                                            <input style={{
                                                width: '50px',
                                                height: '50px',
                                                fontSize: '25px',
                                                textAlign: 'center',
                                                borderRadius: '5px',
                                                border: '2px solid black',
                                                color: 'black',
                                                backgroundColor: 'whitesmoke'
                                            }}
                                                type="text"
                                                id={`otp-input-${index}`}
                                                key={index}
                                                value={value}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                onKeyUp={(e) => handleBackspace(index, e)}
                                                disabled={index !== 0 && !otpInputs[index - 1]}
                                            />
                                        </div>
                                    ))}
                                </div>


                                <br />
                                <br />

                                <input
                                    type="submit"
                                    value="Verify OTP"
                                    id="mybtn"
                                    className={`form-control btn btn-outline-dark btn-lg ${buttonActive ? 'active' : ''}`}
                                    style={{ backgroundColor: "dodgerblue", color: 'white' }}
                                    disabled={!buttonActive}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>

    );
};

export default OTPVerification;