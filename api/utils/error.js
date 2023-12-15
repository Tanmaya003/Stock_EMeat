export const errorHandeller=(statuscode, errormessage)=>{
    const error= new Error();
    error.statuscode=statuscode
    error.message= errormessage
    return error;
}