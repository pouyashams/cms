import http from './httpService';

export function searchDataOFConfirmation(data) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-product-order", data);
}
export function acceptReturnProduct() {
    return http.post("http://shop.isuncharge.com/isunshop/update/accept-return-order", {});
}
export function productDetails(data) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-product-order-with-details", data);
}
export function fetchAllChildOfCurrentMerchant() {
    return http.post("http://shop.isuncharge.com/isunshop/user/fetch-all-child-of-current-merchant",{});
}