import http from './httpService';

export function loadAllSaleLimitation() {
    return http.post("http://shop.isuncharge.com/isunshop/limitation/load-all-sale-limitation", {});
}

export function loadOperatorLimitation() {
    return http.post("http://shop.isuncharge.com/isunshop/limitation/load-operator-limitation", {});
}

export function sendlimitation(data) {
    return http.post("http://shop.isuncharge.com/isunshop/limitation/persist-or-merge-sale-limitation", data);
}

export function sendOperatorslimitation(data) {
    return http.post("http://shop.isuncharge.com/isunshop/limitation/persist-or-merge-operator-limitation", data);
}

export function removeOperatorslimitation(data) {
    return http.post("http://shop.isuncharge.com/isunshop/limitation/remove-sale-limitation", data);
}