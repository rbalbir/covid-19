import {createBasicRequest, sendRequest} from "./request";

export function getDefault() : Promise<any>{
    return new Promise((resolve, reject) => {
        sendRequest(createBasicRequest(""),"")
        .then((res) => { 
            console.log(res);
            resolve(res);
        })
        .catch(reject);
    });
}

export function getSummary() : Promise<any>{
    return new Promise((resolve, reject) => {
        sendRequest(createBasicRequest("summary"), "")
        .then((res) => {
            resolve(res);
        })
        .catch(reject);
    });
}

export interface ICountry{
    Country : string;
    Slug : string;
    ISO2 : string;
}

export function getCountries() : Promise<ICountry[]>{
    return new Promise((resolve, reject) => {
        sendRequest(createBasicRequest("countries"), "")
        .then((res) => {
            resolve(res as ICountry[]);
        })
        .catch(reject);
    });
}

export function getCurrentDate() : string {
    const date : Date = new Date();
    let ret : string = "";
    ret = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}Z`
    return ret;
}

function parseResponse(r: any) : string {
    return r.includes("Country") ?  r as string : "[]";
}

export function getByCountry(country : string, 
    from : string = '2019-12-01T00:00:00Z', 
    to : string  = getCurrentDate(), 
    status : string = "confirmed"
    ) : Promise<any>{
        return new Promise((resolve, reject) => {
        sendRequest(createBasicRequest(`country/${country}/status/${status}?from=${from}&to=${to}`), "")
        .then((res) => {
            const r = parseResponse(res);
            console.log(r);
            const parse = JSON.parse(r);
            console.log(parse);
            resolve(JSON.parse(r));
        })
        .catch(reject);
    });
}

export function getWorldWIP(from : string, to : string, status : string) : Promise<any>{
        return new Promise((resolve, reject) => {
        sendRequest(createBasicRequest(`world?from=${from}&to=${to}`), "")
        .then((res) => {
            resolve(res);
        })
        .catch(reject);
    });
}

export function getWorldTotal() : Promise<any>{
        return new Promise((resolve, reject) => {
        sendRequest(createBasicRequest("world/total"), "")
        .then((res) => {
            resolve(res);
        })
        .catch(reject);
    });
}

export function getWorldAllData() : Promise<any>{
        return new Promise((resolve, reject) => {
        sendRequest(createBasicRequest("all"), "")
        .then((res) => {
            resolve(res);
        })
        .catch(reject);
    });
}




