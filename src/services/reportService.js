import http from './httpService';

export function searchCustomer(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/report/search-charge-order", parameters);
}
