import http from './httpService';

export function searchCustomer(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/user/load-customers-info", parameters);
}

export function searchMerchant(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/user/load-merchants-info", parameters);
}

export function persistMerchant(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/user/register-merchant", parameters);
}

export function updateMerchant(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/user/update-merchant", parameters);
}


export function fetchAllAuthorities() {
    return http.post("http://shop.isuncharge.com/isunshop/user/fetch-all-authorities", {});
}

export function fetchAllMerchants() {
    return http.post("http://shop.isuncharge.com/isunshop/user/fetch-all-merchants", {});
}

export function updateCustomerInfo(customerInfo) {
    return http.post("http://shop.isuncharge.com/isunshop/user/update-customer", customerInfo);
}
