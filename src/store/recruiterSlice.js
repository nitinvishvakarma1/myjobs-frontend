
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { recruiterURL } from "./serverURL.js";
import jscookie from 'js-cookie';

const initialState = {
    recruiterCredential: {},
    recruiterEmail: "",
    status: false
}

const recruiterSlice = createSlice({
    name: 'recruiterSlice',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setRecruiterCredential: (state, action) => {
            state.recruiterCredential = action.payload.userData;
            state.recruiterEmail = state.recruiterCredential.email;
            state.status = true;
            jscookie.set('recruiter_email', state.recruiterEmail, { expires: 1 });
            jscookie.set('recruiter_token', action.payload.token, { expires: 1 });
        },
    }
});

export const recruiterVerifyEmail = async (credential) => {
    try {
        const result = await axios.post(recruiterURL + '/verifyEmail', credential);
        console.log(result.status);
        return result;
    } catch (error) {
        console.log("error in recruiterSlice : ", error);
    }
};

export const recruiterRegistration = async (formData,otp) => {
    try {
        const result = await axios.post(recruiterURL + '/verifyOTP?otp='+otp, formData);
        console.log(result.status);
        return result;
    } catch (error) {
        console.log("error in recruiterSlice : ", error);
    }
};

export const recruiterAuthentication = async () => {
    try {
        var recruiter_token = jscookie.get("recruiter_token");
        console.log('recruiter token ', recruiter_token);
        const result = await axios.post(recruiterURL + '/recruiterAuthentication', { recruiter_token });
        return result;
    } catch (error) {
        console.log("error in recruitereSlice recruiterAuthentication : ", error);
    }
}

export const recruiterLogin = async (recruiterCredential) => {
    try {
        console.log(recruiterCredential);
        var result = await axios.post(recruiterURL + '/recruiterLogin', recruiterCredential);
        console.log("recruiterSlice : ", result);
        console.log("token : ", result.data.token);
        return result;
    } catch (err) {
        console.log("error in recruiterSlice : ", err);
    }
}

export const recruiterUpdateProfile = async (formData) => {
    try {
        console.log(formData);
        var abc = Array.from(formData.entries());
        console.log("Action.payload in recruiterUpdateProfile Middleware abc : ", abc);
        const recruiter_token = jscookie.get('recruiter_token');
        const result = await axios.post(recruiterURL + '/recruiterUpdateProfile?recruiterToken='+recruiter_token, formData);
        console.log('Result of data ---------', result.data);
        return result;
    } catch (err) {
        console.log("error in candidateSlice : ", err);
    }
};

export const recruiterDeleteAccount = async (email) => {
    try {
        console.log(email);
        const recruiter_token = jscookie.get('recruiter_token');
        const result = await axios.get(recruiterURL + '/recruiterDeleteAccount?recruiterToken='+recruiter_token);
        console.log("recruiterSlice : ", result);
        jscookie.remove("recruiter_email");
        jscookie.remove("recruiter_token");
        return result;
    } catch (err) {
        console.log("error in candidateSlice : ", err);
    }
};

export const { setMessage, setRecruiterCredential } = recruiterSlice.actions;
export default recruiterSlice.reducer;

