import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { candidateURL } from "./serverURL.js";
import jscookie from 'js-cookie';
// var candidate_token = jscookie.get("candidate_token");

const initialState = {
    candidateCredential: {},
    candidateEmail: "",
    status: false

}

const candidateSlice = createSlice({
    name: 'candidateSlice',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.candidateEmail = action.payload;
        },
        setCandidateCredential: (state, action) => {
            console.log('login time pe aya')
            state.candidateCredential = action.payload.userData;
            state.candidateEmail = state.candidateCredential.email;
            state.status = true;
            jscookie.set('candidate_email', state.candidateEmail, { expires: 1 });
            jscookie.set('candidate_token', action.payload.token, { expires: 1 });
        }
    }
});

export const authentication = async () => {
    try {
        var candidate_token = jscookie.get("candidate_token");
        console.log('candidate token ', candidate_token);
        const result = await axios.post(candidateURL + '/candidateAuthentication', { candidate_token });
        return result;
    } catch (err) {
        console.log("error in candidateSlice : ", err);
    }
}

export const candidateVerifyEmail = async (credential) => {
    try {
        console.log('credential in candidateRegistration : 🥸🥸 ',credential);
        const result = await axios.post(candidateURL + '/verifyEmail', credential);
        console.log('Result of data ---------', result.data);
        return result;
    } catch (error) {
        console.log("Error in candidateRegistration : ", error);
    }
};

export const candidateRegistration = async (formData,otp) => {
    try {
        console.log('credential in candidateRegistration : ',formData);
        const result = await axios.post(candidateURL + '/verifyOTP?otp='+otp, formData);
        console.log('Result of data ---------', result.data);
        return result;
    } catch (error) {
        console.log("Error in candidateRegistration : ", error);
    }
};

export const candidateLogin = async (candidateCredential) => {
    try {
        console.log(candidateCredential);
        var result = await axios.post(candidateURL + '/candidateLogin', candidateCredential);
        console.log("candidateSlice : ", result);
        return result;
    } catch (err) {
        console.log("error in candidateSlice : ", err);
    }
};


export const candidateUpdateProfile = async (formData) => {
    try {
        console.log(formData);
        var abc = Array.from(formData.entries());
        console.log("Action.payload in candidateUpdateProfile Middleware abc : ", abc);
        const candidate_token = jscookie.get('candidate_token');
        console.log('candidate_token',candidate_token);
        const result = await axios.post(candidateURL + '/candidateUpdateProfile?candidateToken='+candidate_token, formData);
        console.log('Result of data ---------', result.data);
        return result;
    } catch (err) {
        console.log("error in candidateSlice : ", err);
    }
};

export const candidateDeleteAccount = async (email) => {
    try {
        console.log(email);
        const candidate_token = jscookie.get('candidate_token');
        var result = await axios.post(candidateURL + '/candidateDeleteAccount?candidateToken='+candidate_token);
        console.log("candidateSlice : ", result);
        jscookie.remove("candidate_email");
        jscookie.remove("candidate_token");
        return result;
    } catch (err) {
        console.log("error in candidateSlice : ", err);
    }
};

export const candidateGetVacancyList = async () => {
    try {
        const candidate_token = jscookie.get('candidate_token');
        const result = await axios.get(candidateURL + '/getJobList?candidateToken='+candidate_token);
        console.log('candidateGetVacancyList result : ', result.data);
        return result;

    } catch (err) {
        console.log("error in candidate vacancyList : ", err);
    }
}

export const candidateApplyForVacancy = async (vacancyObj) => {
    try {
        // console.log('😀😀');
        const candidate_token = jscookie.get('candidate_token');
        var result = await axios.post(candidateURL + '/candidateApplyForVacancy?candidateToken='+candidate_token, vacancyObj);
        console.log("candidateSlice : ", result);
        return result;
    } catch (err) {
        console.log("error in candidateSlice : ", err);
    }
};

export const candidateGetAppliedVacancies = async () => {
    try {
        const candidate_token = jscookie.get('candidate_token');
        const result = await axios.get(candidateURL + '/candidateGetAppliedVacancies?candidateToken='+candidate_token);
        console.log("candidateSlice candidateGetAppliedVacancies: ", result.data);
        return result;
    } catch (err) {
        console.log("error in candidateSlice candidateGetAppliedVacancies : ", err);
    }
};

export const candidateWithdrawVacancyRequest = async (vacancy_id) => {
    try {
        const candidate_token = jscookie.get('candidate_token');
        const result = await axios.get(candidateURL + '/candidateWithdrawVacancyRequest?candidateToken='+candidate_token+'&_id='+vacancy_id);
        console.log("candidateSlice candidateWithdrawVacancyRequest: ", result.data);
        return result;
    } catch (err) {
        console.log("error in candidateSlice candidateGetAppliedVacancies : ", err);
    }
};



export const { setCandidateCredential } = candidateSlice.actions;
export default candidateSlice.reducer;