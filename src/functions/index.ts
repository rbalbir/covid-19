const CURRENT_COUNTRY : string = "CURRENT_COUNTRY";
const CURRENT_COUNTRY_INFO : string = "CURRENT_COUNTRY_INFO";

export function saveCurrentCountryInfo(country : any) : void {
    sessionStorage.setItem(CURRENT_COUNTRY_INFO, JSON.stringify(country));
}
export function getCurrentCountryInfo() : any {
    sessionStorage.getItem(CURRENT_COUNTRY_INFO);
}
export function saveCurrentCountry(countryName : string) : void {
    sessionStorage.setItem(CURRENT_COUNTRY, countryName);
}

export function getCurrentCountry() : string {
    return sessionStorage.getItem(CURRENT_COUNTRY) as string;
}

export function cleanSession() : void {
    sessionStorage.clear();
}