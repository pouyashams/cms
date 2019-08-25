import http from './httpService';

export function searchDataOFConfirmation(data) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-product-order", data);
}
export function acceptConfirmation(data) {
    return http.post("http://shop.isuncharge.com/isunshop/update/accept-order", data);
}
export function cancelConfirmation(data) {
    return http.post("http://shop.isuncharge.com/isunshop/update/cancel-order", data);
}
export function productDetails(data) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-product-order-with-details", data);
}