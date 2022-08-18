import {authContext} from "../adalConfig";
import Cookies from 'universal-cookie';
import history from "./history";

export function setCookie(cname, cvalue, extime) {
    const cookies = new Cookies();
    let d = new Date();
    d.setTime(d.getTime() + (extime*60*60*1000));
    cookies.set(cname,cvalue, {
        path:"/",
        expires:""
    });

}


export function getCookie(cname) {

    const cookies = new Cookies();
    return cookies.get(cname, {doNotParse: true});
}

export function deleteAllCookies() {
    const cookies = new Cookies();
    let allCookies = cookies.getAll();
    Object.keys(allCookies).forEach((item)=>{
        cookies.remove(item)
    });

}

export function logout() {
    deleteAllCookies();
    localStorage.clear();
    sessionStorage.clear();
    // history.push("/");
    authContext.logOut();
}

export const tokenExpired = ()=>{
    setCookie("tokenExpired",true,12);
    deleteAllCookies();
    history.push("/");
};
