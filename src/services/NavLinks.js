const navLinks = [

    {
        path: "/product-category",
        name: "ویژگی نوع کالا",
        icon: "fa fa-sliders",
        authority: "MENU_PRODUCT_ATTRIBUTE_CATEGORY"
    },

    {
        path: "/definition-product-category",
        name: "تعریف نوع کالا",
        icon: "fa fa-product-hunt",
        authority: "MENU_DEFINE_PRODUCT_CATEGORY"
    },

    {
        path: "/add-product",
        name: "اضافه کردن کالا",
        icon: "fa fa-plus-square",
        authority: "MENU_ADD_PRODUCT"
    },
    {
        path: "/product-management",
        name: "مدیریت کالا",
        icon: "fa fa-refresh",
        authority: "MENU_PRODUCT_MANAGEMENT"
    },
    {
        path: "/menu-product-info-management",
        name: "مدیریت فروش کالا",
        icon: "fa fa-bar-chart",
        authority: "MENU_PRODUCT_INFO_MANAGEMENT"
    },
    {
        path: "/simcard-management",
        name: "مدیریت سیمکارت",
        icon: "fa fa-book",
        authority: "MENU_SIM_CARD_MANAGEMENT"
    },
    {
        path: "/Confirmation",
        name: "بررسی فروش",
        icon: "fa fa-shopping-cart",
        authority: "MENU_SALE_PRODUCT_MANAGEMENT"
    },
    {
        path: "/deliveryInfo-management",
        name: "مدیریت ارسال",
        icon: "fa fa-envelope-o",
        authority: "MENU_SEND_MANAGEMENT"
    },
    // {
    //     path: "/internetInfos",
    //     name: "مدیریت بسته اینترنت",
    //     icon: "fa fa-internet-explorer",
    //     authority: "MENU_INTERNET_PACKAGE_MANAGEMENT"
    // },
    {
        path: "/merchant-management",
        name: "مدیریت پذیرنده",
        icon: "fa fa-user-md",
        authority: "MENU_MERCHANT_MANAGEMENT"
    },
    {
        path: "/customer-management",
        name: "مدیریت مشتری",
        icon: "fa fa-user",
        authority: "MENU_CUSTOMER_MANAGEMENT"
    },
    {
        path: "/report-of-charge",
        name: "گزارش شارژ",
        icon: "fa fa-align-left",
        authority: "MENU_CHARGE_REPORT"
    },
    {
        path: "/report-of-bill",
        name: "گزارش قبض",
        icon: "fa fa-align-center",
        authority: "MENU_BILL_REPORT"
    },
    {
        path: "/report-of-internet-pack",
        name: "گزارش بسته اینترنت",
        icon: "fa fa-align-right",
        authority: "MENU_INTERNET_PACKAGE_REPORT"
    }, {
        path: "/festival-sale",
        name: "مدیریت تخفیفات",
        icon: "fa fa-align-right",
        authority: "FESTIVAL_SALE_MANAGEMENT"

    },
    {
        path: "/product-reject",
        name: "گزارش تخلف سیم کارت",
        icon: "fa fa-align-right",
        authority: "FESTIVAL_SALE_MANAGEMENT"
    },
    {
        path: "/hardwareInfo",
        name: "وضعیت سخت افزار",
        icon: "fa fa-cogs",
        authority: "MENU_HARDWARE_STATUS_REPORT"
    }
];

const getNavLinks = () => {
    return [...navLinks];
};

export default getNavLinks;

