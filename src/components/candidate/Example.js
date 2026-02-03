import axios from 'axios';
import { useState } from 'react';
import { candidateURL } from '../../store/serverURL';
import OTPVerification from '../forms/OtpModal.js';
import { useNavigate } from 'react-router-dom';

function ExampleComponent() {
    const [email, setEmail] = useState();
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formDataToSubmit, setFormDataToSubmit] = useState();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        if (file) {
            formData.append('attachment', file);
            formData.append('email', email);
            setFormDataToSubmit(formData)
        }

        try {
            const result = await axios.post(candidateURL + '/exampleRoute', email);
            console.log(result);
            console.log(result.status);
            if (result.status === 200) {
                setShowModal(true);
            }
        } catch (error) {
            console.log('Error in ExampleComponent : ', error);
        }
    }
    return (<>
        <div className='container bg-dark p-5 text-center'>
            <form action="" onSubmit={handleSubmit} encType='multipart/form-data'>
                <input type="email" name="email" id="email" placeholder="enter email" className='form-control mb-5' onChange={(event) => setEmail({email:event.target.value})} />
                <input type="file" name="attachment" id="file" className='form-control mb-5' onChange={(event) => setFile(event.target.files[0])} />
                <input type="submit" value="Submit" className='btn btn-lg btn-primary' />
            </form>
        </div>

        {
            showModal && (<>
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <OTPVerification data={formDataToSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </>)
        }
    </>);
}

export default ExampleComponent;