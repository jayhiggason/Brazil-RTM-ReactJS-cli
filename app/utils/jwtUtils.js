import jwt from "jwt-simple";
import config from '../config.json';

const {jwtSecret} = config;

export function decodeResponse(data){
    let response = jwt.decode(data,jwtSecret)['content'];
    return response;
}

export function encodeRequestBody(payload){
    let encodedBody = jwt.encode(payload, jwtSecret);
    return encodedBody;
}