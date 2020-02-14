import http from './httpService';

export function loadAllSharing() {
    return http.post("http://shop.isuncharge.com/isunshop/fetch/main-services-infos", {});
}
export function addSharingInfo(data) {
    return http.post("http://shop.isuncharge.com/isunshop/main-service/persist-or-merge", data);
}