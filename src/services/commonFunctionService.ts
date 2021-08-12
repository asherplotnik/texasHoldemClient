export const errorAlert = (error:any) => {
    if (error.response){
        console.assert(error?.response?.data?.message);
        alert(error?.response?.data?.message);
    }else {
        alert("ERROR !!!");
    }
}
