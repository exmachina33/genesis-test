import {GET, POST} from "./config";


export const createEntity = async(url: string, params?: object ) => POST(url, params);
export const getEntity = async(url: string, params?: object ) => GET(url, params);
