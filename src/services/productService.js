import http from './httpService';

export function loadAllProductAttributeCategory() {
    return http.post("http://shop.isuncharge.com/isunshop//fetch/product-attribute-category", {});
}

