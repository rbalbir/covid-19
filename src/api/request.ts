const HEAD_CONTENT = 'Content-Type';
const HEAD_ACCEPT = 'Accept';
const JSON_TYPE = 'application/json';
const DOMAIN = "https://api.covid19api.com/";

export function createBasicRequest(service : string){
    const http = new XMLHttpRequest();
    http.open("GET", `${DOMAIN}${service}`);
    http.setRequestHeader(HEAD_CONTENT, JSON_TYPE);
    http.setRequestHeader(HEAD_ACCEPT, JSON_TYPE);
    return http;
}

export function sendRequest(http : XMLHttpRequest, body : string){
    return new Promise((resolve, reject) => {
        http.onreadystatechange = function() {
            if (http.readyState === XMLHttpRequest.DONE) {
                if (http.status === 200) {
                    resolve(http.response);
                } else {
                    reject({ error: `API ERROR: ${this.status}` });
                }
            }
        };
        http.send(body);
    });
}


