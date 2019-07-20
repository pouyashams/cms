import http from './httpService';

export function searchCustomerCharge(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-charge-order", parameters);
}
export function searchCustomerBill(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-bill-order", parameters);
}
export function searchCustomerInternet(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-internet-package-order", parameters);
}
export function fetchAllChildOfCurrentMerchant() {
    return http.post("http://shop.isuncharge.com/isunshop/user/fetch-all-child-of-current-merchant", {});
}