import { startAfter } from "@react-native-firebase/firestore";
import { GET_USER_SUCCESS, GET_USER_REQUEST, GET_USER_ERROR } from "./constant";
// import { OPEN_NOTES } from "./constant";

// const initialState = Item;

// const initialState = { user: null, isLoading: false, isError: false };

// export const reducer = (state = initialState, action: any) => {

//     switch (action.type) {
//         case GET_USER_REQUEST:
//             return {
//                 ...initialState, isLoading: true
//             }
//         case GET_USER_SUCCESS:
//             return {
//                 ...initialState, user: action.payload, isLoading: false
//             }
//         case GET_USER_ERROR:
//             return {
//                 ...initialState, isLoading: false, isError: true
//             }
//         default:
//             return state
//     }


// }


// import { SAVED_NOTE } from "./constant";
// import { savedNotes } from "./action";


// const initialState ={ savedNotes : false}

// const reducer = (state = initialState, action: any)=>{
//     switch(action.type){
//         case SAVED_NOTE:
//             return {
//                 savedNotes: true
//             }
//     }
// }
