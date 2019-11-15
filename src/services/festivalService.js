import http from './httpService';

export function loadFestivalSale() {
    return http.post("http://shop.isuncharge.com/isunshop/festival/all-festival-sale-info", {});
}
export function sendFestival(data) {
    return http.post("http://shop.isuncharge.com/isunshop/festival/persist-or-merge-festival-sale-info", data);
}