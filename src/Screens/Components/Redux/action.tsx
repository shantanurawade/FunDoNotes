import { OPEN_NOTES } from "./constant";


export function openNotes (item: any){
    return{
        type : OPEN_NOTES,
        data : item
    }
}