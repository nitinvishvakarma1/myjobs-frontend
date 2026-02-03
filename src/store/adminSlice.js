import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { adminURL } from "./serverURL.js";
import jscookie from 'js-cookie';

const initialState = {
    candidateCredential: {},
    adminEmail: "",
    status: false
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setAdminCredential: (state, action) => {
            console.log('login time pe aya')
            state.adminCredential = action.payload.userData;
            state.candidateEmail = state.adminCredential.email;
            state.status = true;
            jscookie.set('admin_email', state.adminEmail, { expires: 1 });
            jscookie.set('admin_token', action.payload.token, { expires: 1 });
        }

    }
});

export const adminLogin = async (adminCredential) => {
    try {
        console.log(adminCredential);
        var result = await axios.post(adminURL + '/adminLogin', adminCredential);
        console.log("adminSlice : ", result);
        console.log("token : ", result.data.token);
        console.log("candidateSlice : ", result);
        return result;
    } catch (error) {
        console.log("error in adminSlice adminLogin: ", error);
    }
}

export const adminAuthentication = async () => {
    try {
        var admin_token = jscookie.get("admin_token");
        console.log('candidate token ', admin_token);
        const result = await axios.post(adminURL + '/adminAuthentication', { admin_token });
        return result;
    } catch (err) {
        console.log("error in candidateSlice : ", err);
    }
}

export const adminGetRecruiterList = async () => {
    try {
        const admin_token = jscookie.get('admin_token');
        const result = await axios.get(adminURL + '/adminRecruiterList?adminToken=' + admin_token);
        console.log("recruiterList : ", result);
        return result;
    } catch (err) {
        console.log("error in admin recruiterList : ", err);
    }
}

export const adminUpdateRecruiterStatus = async (recruiterEmail,action) => {
    try {
        const admin_token = jscookie.get('admin_token');
        const result = await axios.get(adminURL + '/adminUpdateRecruiterStatus?adminToken='+admin_token + '&recruiterEmail=' +recruiterEmail +'&action='+action);
        console.log("recruiter List : ", result);
        return result;
    } catch (err) {
        console.log("error in recruiter update status : ", err);
    }
}

export const adminCandidtaList = async () => {
    try {
        const admin_token = jscookie.get('admin_token');
        const result = await axios.get(adminURL + '/adminCandidateList?adminToken=' + admin_token);
        console.log("recruiterList : ", result);
        return result;
    } catch (err) {
        console.log("error in admin recruiterList : ", err);
    }
}

export const { setEmail, setAdminCredential } = adminSlice.actions;
export default adminSlice.reducer;