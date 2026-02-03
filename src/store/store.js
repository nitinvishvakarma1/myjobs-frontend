// import { configureStore } from '@reduxjs/toolkit';
// import navbarSlice from './navbarSlice.js';
// import userSlice from './userSlice.js';
// import recruiterSlice from './recruiterSlice.js';


// export default configureStore({
//     reducer: {
//         navbarSlice: navbarSlice,
//         userSlice: userSlice,
//         recruiterSlice: recruiterSlice
//     }
// });

//////////////////////////////////////////////////////
import {configureStore} from '@reduxjs/toolkit';
import navbarSlice from './navbarSlice.js';
import recruiterSlice from './recruiterSlice.js';
import candidateSlice from './candidateSlice.js';
import adminSlice from './adminSlice.js';
export default configureStore({
    reducer : {
        navbarSlice: navbarSlice,
        recruiterSlice : recruiterSlice,
        candidateSlice : candidateSlice,
        adminSlice : adminSlice
    }
});