const navLinks = [

    {
        path: "/product-category",
        name: "ویژگی نوع کالا",
        icon: "fa fa-sliders",
        type:"product",
        authority: "MENU_PRODUCT_ATTRIBUTE_CATEGORY"
    },
    {
        path: "/definition-product-category",
        name: "تعریف نوع کالا",
        icon: "fa fa-product-hunt",
        type:"product",
        authority: "MENU_DEFINE_PRODUCT_CATEGORY"
    },
    {
        path: "/add-product",
        name: "اضافه کردن کالا",
        icon: "fa fa-plus-square",
        type:"product",
        authority: "MENU_ADD_PRODUCT"
    },
    {
        path: "/product-management",
        name: "مدیریت کالا",
        icon: "fa fa-refresh",
        type:"management",
        authority: "MENU_PRODUCT_MANAGEMENT"

    },
    {
        path: "/menu-product-info-management",
        name: "مدیریت فروش کالا",
        icon: "fa fa-bar-chart",
        type:"management",
        authority: "MENU_PRODUCT_INFO_MANAGEMENT"
    },
    {
        path: "/simcard-management",
        name: "مدیریت سیمکارت",
        icon: "fa fa-book",
        type:"management",
        authority: "MENU_SIM_CARD_MANAGEMENT"
    }, {
        path: "/requirements-audit",
        name: "ممیزی نیازمندی ها",
        icon: "fa fa-edit",
        type: "other",
        authority: "REQUIREMENTS_AUDIT"
    },
    {
        path: "/Confirmation",
        name: "بررسی فروش",
        icon: "fa fa-shopping-cart",
        type:"other",
        authority: "MENU_SALE_PRODUCT_MANAGEMENT"
    },
    {
        path: "/deliveryInfo-management",
        name: "مدیریت ارسال",
        type:"management",
        icon: "fa fa-envelope-o",
        authority: "MENU_SEND_MANAGEMENT"
    },
    {
        path: "/merchant-management",
        name: "مدیریت پذیرنده",
        icon: "fa fa-user-md",
        type:"management",
        authority: "MENU_MERCHANT_MANAGEMENT"
    },
    {
        path: "/customer-management",
        name: "مدیریت مشتری",
        icon: "fa fa-user",
        authority: "MENU_CUSTOMER_MANAGEMENT",
        type:"management"
    },
    {
        path: "/report-of-charge",
        name: "گزارش شارژ",
        icon: "fa fa-align-left",
        authority: "MENU_CHARGE_REPORT",
        type:"report",
    },
    {
        path: "/report-of-bill",
        name: "گزارش قبض",
        icon: "fa fa-align-center",
        authority: "MENU_BILL_REPORT",
        type:"report"
    },
    {
        path: "/report-of-internet-pack",
        name: "گزارش بسته اینترنت",
        icon: "fa fa-align-right",
        type:"report",
        authority: "MENU_INTERNET_PACKAGE_REPORT"
    }, {
        path: "/festival-sale",
        name: "مدیریت تخفیفات",
        icon: "fa fa-briefcase",
        type:"management",
        authority: "FESTIVAL_SALE_MANAGEMENT"

    },
    {
        path: "/sharing-management",
        name: "مدیریت تسهیم",
        icon: "fa fa-balance-scale",
        type:"management",
        authority: "MULTIPLEXED_SALE_MANAGEMENT"

    }, {
        path: "/manage-limitation",
        name: "مدیریت محدودیت ها",
        icon: "fa fa-crop",
        type:"management",
        authority: "CONSTRAINTS_MANAGEMENT"

    },{
        path: "/product-reject",
        name: "گزارش تخلف سیم کارت",
        icon: "fa fa-calendar-times-o",
        type:"report",
        authority: "REPORT_SIM_CARD_VIOLATION"
    },{
        path: "/force-update",
        name: "مدیریت آپدیت",
        icon: "fa fa-upload",
        authority: "FORCE_UPDATE_APPLICATION",
        type:"management"
    },
    {
        path: "/hardwareInfo",
        name: " گزارش سخت افزار",
        icon: "fa fa-cogs",
        type:"report",
        authority: "MENU_HARDWARE_STATUS_REPORT"
    }
];

const getNavLinks = () => {
    return [...navLinks];
};

export default getNavLinks;

