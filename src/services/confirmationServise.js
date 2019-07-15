import http from './httpService';

export function searchDataOFConfirmation(data) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-product-order", {data});
}
export function acceptConfirmation() {
    return http.post("http://shop.isuncharge.com/isunshop/update/accept-order", {});
}
export function cancelConfirmation() {
    return http.post("http://shop.isuncharge.com/isunshop/update/cancel-order", {});
}