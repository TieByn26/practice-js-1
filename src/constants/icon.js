//icon of customer
import ic_cart from "@/assets/icons/customer/ic-cart.svg";
import ic_evenlope from "@/assets/icons/customer/ic-evenlope.svg";
import ic_lock from "@/assets/icons/customer/ic-lock.svg";
import ic_phone from "@/assets/icons/customer/ic-phone.svg";
import ic_avatar_cus from "@/assets/icons/customer/ic-avatar-cus.svg";
import ic_wallet from "@/assets/icons/customer/ic-wallet.svg";
import ic_cart_red from "@/assets/icons/customer/ic-cart-red.svg";

//icon of dashboard
import ic_action_cell from "@/assets/icons/dashboard/ic-action_cell.svg";
import ic_arrow_down from "@/assets/icons/dashboard/ic-arrow_down.svg";
import ic_arrow_up from "@/assets/icons/dashboard/ic-arrow_up.svg";
import ic_avatar_gray from "@/assets/icons/dashboard/ic-avatar_gray.svg";
import ic_balance from "@/assets/icons/dashboard/ic-balance.svg";
import ic_chevron from "@/assets/icons/dashboard/ic-chevron.svg";
import ic_dot_blue from "@/assets/icons/dashboard/ic-dot_blue.svg";
import ic_dot_orange from "@/assets/icons/dashboard/ic-dot_orange.svg";
import ic_dots_vertical from "@/assets/icons/dashboard/ic-dots_vertical.svg";
import ic_filter from "@/assets/icons/dashboard/ic-filter.svg";
import ic_product from "@/assets/icons/dashboard/ic-product_sku.svg";
import ic_total_revenue from "@/assets/icons/dashboard/ic-total_revenue.svg";
import ic_total_seller from "@/assets/icons/dashboard/ic-total_seller.svg";

//icon of menu 
import ic_analysis from "@/assets/icons/menu/ic-analysis.svg";
import ic_avatar from "@/assets/icons/menu/ic-avatar.svg";
import ic_calendar from "@/assets/icons/menu/ic-calendar.svg";
import ic_customer from "@/assets/icons/menu/ic-customer.svg";
import ic_dashboard from "@/assets/icons/menu/ic-dashboard.svg";
import ic_gray from "@/assets/icons/menu/ic-gray.svg";
import ic_logo from "@/assets/icons/menu/ic-logo.svg";
import ic_menu from "@/assets/icons/menu/ic-menu.svg";
import ic_notification from "@/assets/icons/menu/ic-notification.svg";
import ic_search from "@/assets/icons/menu/ic-search.svg";
import ic_seller from "@/assets/icons/menu/ic-seller.svg";
import ic_setting from "@/assets/icons/menu/ic-setting.svg";
import ic_support from "@/assets/icons/menu/ic-support.svg";
import ic_shoping from "@/assets/icons/menu/ic-shoping.svg";
import ic_cart_menu from "@/assets/icons/menu/ic-cart_menu.svg";
import ic_cart_white from "@/assets/icons/menu/ic-cart_white.svg";
import ic_product_blue from "@/assets/icons/menu/ic-product_blue.svg";
import ic_dashboard_gray from "@/assets/icons/menu/ic-dashboard_gray.svg";
import ic_customer_white from "@/assets/icons/menu/ic-customer_white.svg";
import ic_envelope_menu from "@/assets/icons/menu/ic-envelope.svg";
import ic_chevron_down from "@/assets/icons/menu/ic-chevron.svg";


//icon of order
import ic_address from "@/assets/icons/order/ic-address.svg";
import ic_calendar_c from "@/assets/icons/order/ic-calendar_c.svg";
import ic_customer_c from "@/assets/icons/order/ic-customer_c.svg";
import ic_invoice from "@/assets/icons/order/ic-invoice.svg";
import ic_order from "@/assets/icons/order/ic-order.svg";
import ic_packer from "@/assets/icons/order/ic-packer.svg";
import ic_payment from "@/assets/icons/order/ic-payment.svg";
import ic_phone_c from "@/assets/icons/order/ic-phone_c.svg";
import ic_processing from "@/assets/icons/order/ic-processing.svg";
import ic_reward from "@/assets/icons/order/ic-reward.svg";
import ic_shipping from "@/assets/icons/order/ic-shipping.svg";
import ic_success_gray from "@/assets/icons/order/ic-success_gray.svg";
import ic_receipt from "@/assets/icons/order/ic-receipt.svg";
import ic_receipt_c from "@/assets/icons/order/ic-receipt-c.svg";
import ic_cart_order from "@/assets/icons/order/ic-cart-order.svg";

//icon of product
import ic_cross from "@/assets/icons/product/ic-cross.svg";
import ic_dollar from "@/assets/icons/product/ic-dollar.svg";
import ic_export from "@/assets/icons/product/ic-export.svg";
import ic_eye from "@/assets/icons/product/ic-eye.svg";
import ic_image from "@/assets/icons/product/ic-image.svg";
import ic_pen from "@/assets/icons/product/ic-pen.svg";
import ic_plus from "@/assets/icons/product/ic-plus.svg";
import ic_save from "@/assets/icons/product/ic-save.svg";
import ic_success_green from "@/assets/icons/product/ic-success.svg";
import ic_trash from "@/assets/icons/product/ic-trash.svg";
import ic_video from "@/assets/icons/product/ic-video.svg";

const loadIcon = async (pathIcon) => {
    try {
        const response = await fetch(pathIcon);
        return response.ok ? response.text() : null;
    } catch (error) {
        console.error(`Failed to load icon from ${pathIcon}:`, error);
        return null;
    }
};

const [] = await Promise.all([
    loadIcon(ic_cart),
    loadIcon(ic_avatar_cus),
    loadIcon(ic_cart_red),
    loadIcon(ic_wallet),
    loadIcon(ic_cart_order),
    loadIcon(ic_receipt_c),
    loadIcon(ic_evenlope),
    loadIcon(ic_lock),
    loadIcon(ic_phone),
    loadIcon(ic_action_cell),
    loadIcon(ic_arrow_down),
    loadIcon(ic_arrow_up),
    loadIcon(ic_avatar_gray),
    loadIcon(ic_balance),
    loadIcon(ic_chevron),
    loadIcon(ic_dot_blue),
    loadIcon(ic_dot_orange),
    loadIcon(ic_dots_vertical),
    loadIcon(ic_filter),
    loadIcon(ic_product),
    loadIcon(ic_total_revenue),
    loadIcon(ic_total_seller),
    loadIcon(ic_analysis),
    loadIcon(ic_avatar),
    loadIcon(ic_calendar),
    loadIcon(ic_customer),
    loadIcon(ic_dashboard),
    loadIcon(ic_gray),
    loadIcon(ic_logo),
    loadIcon(ic_menu),
    loadIcon(ic_notification),
    loadIcon(ic_search),
    loadIcon(ic_seller),
    loadIcon(ic_setting),
    loadIcon(ic_support),
    loadIcon(ic_address),
    loadIcon(ic_calendar_c),
    loadIcon(ic_customer_c),
    loadIcon(ic_invoice),
    loadIcon(ic_order),
    loadIcon(ic_packer),
    loadIcon(ic_payment),
    loadIcon(ic_phone_c),
    loadIcon(ic_processing),
    loadIcon(ic_reward),
    loadIcon(ic_shipping),
    loadIcon(ic_success_gray),
    loadIcon(ic_cross),
    loadIcon(ic_dollar),
    loadIcon(ic_export),
    loadIcon(ic_eye),
    loadIcon(ic_image),
    loadIcon(ic_pen),
    loadIcon(ic_plus),
    loadIcon(ic_save),  
    loadIcon(ic_success_green),
    loadIcon(ic_trash),
    loadIcon(ic_video),
    loadIcon(ic_shoping),
    loadIcon(ic_cart_menu),
    loadIcon(ic_cart_white),
    loadIcon(ic_customer_white),
    loadIcon(ic_product_blue),
    loadIcon(ic_dashboard_gray),
    loadIcon(ic_envelope_menu),
    loadIcon(ic_chevron_down),
    loadIcon(ic_receipt)
]);

export {ic_cart, ic_evenlope, ic_lock, ic_phone,
    ic_action_cell, ic_arrow_down, ic_arrow_up, ic_avatar_gray, ic_balance, ic_chevron,
    ic_dot_blue, ic_dot_orange, ic_dots_vertical, ic_filter, ic_product,
    ic_total_revenue, ic_total_seller,
    ic_analysis, ic_avatar, ic_calendar, ic_customer, ic_dashboard, ic_gray, ic_logo, ic_menu,
    ic_notification, ic_search, ic_seller, ic_setting, ic_support,
    ic_address, ic_calendar_c, ic_customer_c, ic_invoice, ic_order, ic_packer, ic_payment,
    ic_phone_c, ic_processing, ic_reward, ic_shipping, ic_success_gray,
    ic_cross,ic_dollar, ic_export, ic_eye, ic_image, ic_pen, ic_plus, ic_save, ic_success_green, ic_trash, ic_video,
    ic_shoping, ic_cart_menu, ic_cart_white,ic_customer_white,ic_dashboard_gray,ic_product_blue,ic_envelope_menu,
    ic_chevron_down, ic_receipt, ic_receipt_c, ic_cart_order, ic_avatar_cus, ic_cart_red, ic_wallet
};
