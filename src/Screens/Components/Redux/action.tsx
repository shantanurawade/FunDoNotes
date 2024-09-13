import { LOGGED_IN } from "./constant";


export function openNotes (item: any){
    return{
        type : LOGGED_IN,
        data : item
    }
}