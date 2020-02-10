import http from './httpService';

export function loadAllProductAttributeCategory() {
    return http.post("http://shop.isuncharge.com/isunshop/fetch/product-attribute-category", {});
}export function loadSuperCategories() {
    return http.post("http://shop.isuncharge.com/isunshop/fetch/super-categories", {});
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
    return http.get("http://shop.isuncharge.com/isunshop/fetch/define-product-info");
}

export function searchProduct(data) {
    return http.post("http://shop.isuncharge.com/isunshop/fetch/search-product-item-with-details", data);
}

export function cancelProduct(data) {
    return http.post("http://shop.isuncharge.com/isunshop/update/reject-product", data);
}

export function acceptProduct(data) {
    return http.post("http://shop.isuncharge.com/isunshop/update/confirm-product", data);
}

export function sendProduct(data) {
    return http.post("http://shop.isuncharge.com/isunshop/register/product", data);
}

export function onUpdate(data) {
    return http.post("http://shop.isuncharge.com/isunshop/update/product-item", data);
}
export function reportProduct(data) {
    return http.post("http://shop.isuncharge.com/isunshop/update/reject-product-for-report", data);
}

export function loadAllProductReport() {
    return http.post("http://shop.isuncharge.com/isunshop/fetch/all-product-report", {});
}