import http from './httpService';

export function searchCustomerCharge(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-charge-order", parameters);
}
export function searchCustomerBill(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-bill-order", parameters);
}
