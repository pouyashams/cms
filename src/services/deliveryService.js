import http from './httpService';

export function loadDataOfCity() {
    return http.post("http://shop.isuncharge.com/isunshop/fetch/delivery-infos", {});
}
export function sendDataOfDelivery(data) {
    return http.post("http://shop.isuncharge.com/isunshop/register/delivery-infos", data);
}