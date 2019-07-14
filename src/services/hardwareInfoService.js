import http from './httpService';

export function loadDataOfhardware() {
    return http.post("http://shop.isuncharge.com/isunshop/operation/system-info", {});
}

export function killAllJava() {
    return http.post("http://shop.isuncharge.com/isunshop/operation/kill-all-java", {});
}

export function restartTomcat() {
    return http.post("http://shop.isuncharge.com/isunshop/operation/restart-tomcat", {});
}
export function receiveTime() {
    return http.post("http://shop.isuncharge.com/isunshop/operation/fetch/scheduled-jobs", {});
}
export function sendDataTime(data) {
    return http.post("http://shop.isuncharge.com/isunshop/operation/change-scheduled-job", {data});
}

