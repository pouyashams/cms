const navLinks = [

    {
        path: "/product-category",
        name: "ویژگی نوع کالا",
        icon: "fa fa-sliders",
    },

    {
        path: "/definition-product-category",
        name: "تعریف نوع کالا",
        icon: "fa fa-product-hunt",
    },

    {
        path: "/add-product",
        name: "اضافه کردن کالا",
        icon: "fa fa-plus-square",
    },
    {
        path: "/editProduct",
        name: "به روز رسانی کالا",
        icon: "fa fa-refresh",
    },
    {
        path: "/Confirmation",
        name: "بررسی فروش",
        icon: "fa fa-shopping-cart",
    },
    {
        path: "/DeliveryInfos",
        name: "مدیریت ارسال",
        icon: "fa fa-envelope-o",
    },
    {
        path: "/internetInfos",
        name: "مدیریت بسته اینترنت",
        icon: "fa fa-internet-explorer",
    },
    {
        path: "/merchant-info",
        name: "مدیریت پذیرنده",
        icon: "fa fa-user-md",
    },
    {
        path: "/customer-management",
        name: "مدیریت مشتری",
        icon: "fa fa-user",
    },
    {
        path: "/report-of-charge",
        name: "گزارش شارژ",
        icon: "fa fa-align-left",
    },
    {
        path: "/report-of-bill",
        name: "گزارش قبض",
        icon: "fa fa-align-center",
    },
    {
        path: "/report-of-internet-pack",
        name: "گزارش بسته اینترنت",
        icon: "fa fa-align-right",
    },

    {
        path: "/hardwareInfo",
        name: "وضعیت سخت افزار",
        icon: "fa fa-cogs",
    },
];

const getNavLinks = () => {
    return [...navLinks];
};

export default getNavLinks;
