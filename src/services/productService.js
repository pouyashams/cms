import http from './httpService';

export function loadAllProductAttributeCategory() {
    return http.post("http://shop.isuncharge.com/isunshop//fetch/product-attribute-category", {});
}

export function sendListOfProduct(categoryInfo) {
    return http.post("http://shop.isuncharge.com/isunshop/register/product-attribute-category", categoryInfo);
}

export function loadData() {
    return http.get("http://shop.isuncharge.com/isunshop/fetch/define-product-category-info");
}
export function sendListOfDefinitionProduct(data) {
    return http.post("http://shop.isuncharge.com/isunshop/register/product-category", data);
}
export function loadDataOfProduct() {
    return http.get("http://shop.isuncharge.com/isunshop/fetch/define-product-info" );
}