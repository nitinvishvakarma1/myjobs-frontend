import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { vacancyURL } from "./serverURL.js";
import jscookie from 'js-cookie';

const initialState = {
    vacancyList: [],
    message: ""
}

const vacancySlice = createSlice({
    name: 'vacancySlice',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.initialState = action.payload;
        },
        setVacanyList: (state, action) => {
            state.vacancyList = action.payload.jobList;
        }
    }
});

export const recruiterAddVacancy = async (formData) => {
    try {
        const recruiter_token = jscookie.get('recruiter_token');
        const result = await axios.post(vacancyURL + '/recruiterAddVacancy?recruiterToken='+recruiter_token, formData);
        console.log('recruiterAddVacancy result : ', result.data);
        return result;
    } catch (error) {
        console.log("error in candidate vacancyList : ", error);
    }
};

export const recruiterUpdateVacancy = async (vacancy_id, formData) => {
    try {
        console.log(formData);
        var abc = Array.from(formData.entries());
        const recruiter_token = jscookie.get('recruiter_token')
        console.log("Action.payload in recruiterUpdateVacancy Middleware abc : ", abc);
        // const result = await axios.post(recruiterURL + '/recruiterUpdateVacancy', formData);
        var result = await axios.put(vacancyURL + '/recruiterUpdateVacancy?recruiterToken=' + recruiter_token + '&_id=' + vacancy_id, formData);

        console.log('Result of data ---------', result);
        return result;
    } catch (error) {
        console.log("error in recruiterUpdateVacancy : ", error);
    }
};

export const recruiterDeleteVacancy = async (vacancy_id) => {
    try {
        const recruiter_token = jscookie.get('recruiter_token')
        const result = await axios.get(vacancyURL + '/recruiterDeleteVacancy?recruiterToken=' + recruiter_token + '&vacancy_id='+vacancy_id);
        console.log("vacancyList : ", result);
        return result;
    } catch (error) {
        console.log("error in delete vacancy : ", error);
    }
}

export const recruiterGetVacancyList = async () => {
    try {
        const recruiter_token = jscookie.get('recruiter_token');
        const result = await axios.get(vacancyURL + '/recruiterGetVacancyList?recruiterToken='+recruiter_token);
        console.log('recruiterGetVacancyListplicantList result : ', result.data);
        return result;

    } catch (error) {
        console.log("error in candidate vacancyList : ", error);
    }
}

export const recruiterGetApplicantList = async () => {
    try {
        const recruiter_token = jscookie.get('recruiter_token');
        var result = await axios.get(vacancyURL + '/recruiterGetApplicantList?recruiterToken='+recruiter_token);

        console.log('recruiterGetApplicantList result : ', result.data);
        return result;

    } catch (err) {
        console.log("error in candidate vacancyList : ", err);
    }
}

export const recruiterUpdateCandidateStatus = async (vacancyId,action) => {
    try {
        const recruiter_token = jscookie.get('recruiter_token');
        const result = await axios.get(vacancyURL + '/recruiterUpdateCandidateStatus?recruiterToken='+recruiter_token + '&_id=' + vacancyId+'&action='+action);
        console.log("List : ", result);
        return result;
    } catch (err) {
        console.log("error in recruiter update status : ", err);
    }
}



export const {setVacanyList} = vacancySlice.actions;
export default vacancySlice.reducer;