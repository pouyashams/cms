import http from './httpService';

export function loadAllForceUpdate() {
    return http.post("http://shop.isuncharge.com/isunshop/fetch/all-application-info", {});
}
export function editForceUpdate(data) {
    return http.post("http://shop.isuncharge.com/isunshop/update/persist-or-merge-application-version", data);
}