import http from './httpService';

export function searchCustomer(parameters) {
    return http.post("http://shop.isuncharge.com/isunshop/user/load-customers-info", parameters);
}

export function updateCustomerInfo(customerInfo) {
    console.log(customerInfo);
    return http.post("http://shop.isuncharge.com/isunshop/user/update-customer", customerInfo);
}
