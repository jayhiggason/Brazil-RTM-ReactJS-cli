


export const convertSecondsToDate = (ms)=>{
    let date = new Date(ms);
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    return (mm + '-' + dd + '-' + yyyy);
};

export const formatDate = (ms)=>{
    let date = new Date(ms);
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    return (mm + '-' + dd + '-' + yyyy);
};
