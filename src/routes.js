import StockTransferCreate from "./components/stock-transfer/stock-transfer-create/stock-transfer-create.component";
import Toaster from "./views/notifications/toaster/Toaster";
import Tables from "./views/base/tables/Tables";
import Breadcrumbs from "./views/base/breadcrumbs/Breadcrumbs";
import Cards from "./views/base/cards/Cards";
import Carousels from "./views/base/carousels/Carousels";
import Collapses from "./views/base/collapses/Collapses";
import BasicForms from "./views/base/forms/BasicForms";
import Jumbotrons from "./views/base/jumbotrons/Jumbotrons";
import ListGroups from "./views/base/list-groups/ListGroups";
import Navbars from "./views/base/navbars/Navbars";
import Navs from "./views/base/navs/Navs";
import Paginations from "./views/base/paginations/Pagnations";
import Popovers from "./views/base/popovers/Popovers";
import ProgressBar from "./views/base/progress-bar/ProgressBar";
import Switches from "./views/base/switches/Switches";
import Tabs from "./views/base/tabs/Tabs";
import Tooltips from "./views/base/tooltips/Tooltips";
import BrandButtons from "./views/buttons/brand-buttons/BrandButtons";
import ButtonDropdowns from "./views/buttons/button-dropdowns/ButtonDropdowns";
import ButtonGroups from "./views/buttons/button-groups/ButtonGroups";
import Buttons from "./views/buttons/buttons/Buttons";
import Charts from "./views/charts/Charts";
import Dashboard from "./views/dashboard/Dashboard";
import CoreUIIcons from "./views/icons/coreui-icons/CoreUIIcons";
import Flags from "./views/icons/flags/Flags";
import Brands from "./views/icons/brands/Brands";
import Alerts from "./views/notifications/alerts/Alerts";
import Badges from "./views/notifications/badges/Badges";
import Modals from "./views/notifications/modals/Modals";
import Colors from "./views/theme/colors/Colors";
import Typography from "./views/theme/typography/Typography";
import Widgets from "./views/widgets/Widgets";
import Users from "./views/users/Users";
import User from "./views/users/User";
import Login from "./views/pages/login/Login";
import WarehouseListComponent from "./components/warehouse/warehouse.component/warehouse-list.component";
import WarehouseCreate from "./components/warehouse/warehouse-create.component/warehouse-create.component";
import WarehouseEdit from "./components/warehouse/warehouse-edit.component/warehouse-edit.component";
import StoresListComponent from "./components/stores/stores-list.component/stores-list.component";
import StoresCreate from "./components/stores/stores-create.component/stores-create.component";
import StoresEdit from "./components/stores/stores-edit.component/stores-edit.component";
import CategoriesListComponent from "./components/catalogue/categories/categories-list/categories-list-component";
import CategoriesEdit from "./components/catalogue/categories/categories-edit/categories-edit.component";
import CategoriesCreate from "./components/catalogue/categories/categories-create/categories-create.component";
import BrandList from "./components/catalogue/Brands/Brands-list/brand-list.component";
import BrandsCreate from "./components/catalogue/Brands/Brand-create/brand-create.component";
import BrandsEdit from "./components/catalogue/Brands/Brand-edit/brand-edit.component";
import OptionsList from "./components/catalogue/options/option.component/option.component";
import OptionsCreate from "./components/catalogue/options/option-create.component/option-create.component";
import OptionsEdit from "./components/catalogue/options/options-edit.component/options-edit.component";
import ProductsList from "./components/catalogue/products/products-list.component/products-list.component";
import ProductsCreate from "./components/catalogue/products/products-create.component/products-create.component";
import ProductsEdit from "./components/catalogue/products/products-edit.component/product-edit.component";
import SuppliersListing from "./components/suppliers/suppliers-listing.component/suppliers-listing.component";
import SuppliersCreate from "./components/suppliers/suppliers-create.component/suppliers-create.component";
import SuppliersEdit from "./components/suppliers/suppliers-edit.component/suppliers-edit.component";
import CouriersList from "./components/courier/courier-list.component/courier-list.component";
import CourierCreate from "./components/courier/courier-create.component/courier-create.component";
import CouriersEdit from "./components/courier/courier-edit.component/courier-edit.component";
import CouponList from "./components/coupon/coupon-listing.component/coupon-listing.component";
import CouponCreate from "./components/coupon/coupon-create.component/coupon-create.component";
import CouponEdit from "./components/coupon/coupon-edit.component/coupon-edit.component";
import ManagePurchaseOrder from "./components/purchase-orders/manage-purchase-order/manage-purchase-order.component";
import ManagePOCreate from "./components/purchase-orders/manage-purchase-order/manage-purchase-order-create.compoent/manage-purchase-order-create.component";
import ManagePOEdit from "./components/purchase-orders/manage-purchase-order/manage-purchase-order-edit/manage-purchase-order-edit.component";
import StockTransferComponent from "./components/stock-transfer/stock-transfer-list/stock-transfer-list.component";
import StockTransferEdit from "./components/stock-transfer/stock-transfer-edit.component/stock-transfer-edit.component";
import CouponOptionsList from "./components/coupon-options/coupon-options-list.component";
import CouponOptionsCreate from "./components/coupon-options/coupon-options-create/coupon-options-create.component";

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/warehouse",
    name: "Warehouses",
    component: WarehouseListComponent,
    exact: true,
  },
  {
    path: "/warehouse/create",
    name: "WarehousesCreate",
    component: WarehouseCreate,
  },
  {
    path: "/warehouse/edit/:editId",
    name: "WarehousesEdit",
    component: WarehouseEdit,
  },
  {
    path: "/stores",
    name: "stores",
    component: StoresListComponent,
    exact: true,
  },
  {
    path: "/stores/create",
    name: "StoresCreate",
    component: StoresCreate,
  },
  {
    path: "/stores/edit/:editId",
    name: "StoresEdit",
    component: StoresEdit,
  },
  {
    path: "/catalogue/categories",
    name: "Categories",
    component: CategoriesListComponent,
    exact: true,
  },
  {
    path: "/catalogue/categories/edit/:editId",
    name: "CategoriesEdit",
    component: CategoriesEdit,
  },
  {
    path: "/catalogue/categories/create",
    name: "CategoriesCreate",
    component: CategoriesCreate,
  },

  {
    path: "/catalogue/brands",
    name: "Brands",
    component: BrandList,
    exact: true,
  },
  {
    path: "/catalogue/brands/create",
    name: "BrandsCreate",
    component: BrandsCreate,
  },
  {
    path: "/catalogue/brands/edit/:editId",
    name: "BrandsEdit",
    component: BrandsEdit,
  },
  {
    path: "/catalogue/options",
    name: "Options",
    component: OptionsList,
    exact: true,
  },
  {
    path: "/catalogue/options/create",
    name: "OptionsCreate",
    component: OptionsCreate,
  },
  {
    path: "/catalogue/options/edit/:editId",
    name: "OptionsEdit",
    component: OptionsEdit,
  },
  {
    path: "/catalogue/products",
    name: "Products",
    component: ProductsList,
    exact: true,
  },
  {
    path: "/catalogue/products/create",
    name: "ProductsCreate",
    component: ProductsCreate,
  },
  {
    path: "/catalogue/products/edit/:editID",
    name: "Products Edit",
    component: ProductsEdit,
  },
  {
    path: "/purchase-order/suppliers/",
    name: "Suppliers",
    component: SuppliersListing,
    exact: true,
  },
  {
    path: "/purchase-order/suppliers/create",
    name: "Suppliers Create",
    component: SuppliersCreate,
  },
  {
    path: "/purchase-order/suppliers/edit/:editID",
    name: "Suppliers Edit",
    component: SuppliersEdit,
  },
  {
    path: "/couriers",
    name: "Couriers",
    component: CouriersList,
    exact: true,
  },
  {
    path: "/couriers/create",
    name: "Courier Create",
    component: CourierCreate,
  },
  {
    path: "/couriers/edit/:editId",
    name: "Courier Edit",
    component: CouriersEdit,
  },
  {
    path: "/coupons",
    name: "Coupons",
    component: CouponList,
    exact: true,
  },
  {
    path: "/coupons/create",
    name: "Create Coupon",
    component: CouponCreate,
  },
  {
    path: "/coupons/edit/:editId",
    name: "Edit Coupon",
    component: CouponEdit,
  },
  {
    path: "/purchase-order/manage-purchase-order",
    name: "Manage Purchase Orders",
    component: ManagePurchaseOrder,
    exact: true,
  },
  {
    path: "/purchase-order/manage-purchase-order/create",
    name: "Manage Purchase Order Create",
    component: ManagePOCreate,
  },
  {
    path: "/manage-purchase-order/edit/:editId",
    name: "Edit",
    component: ManagePOEdit,
  },
  {
    path: "/stock-transfer",
    name: "Stock Transfer",
    component: StockTransferComponent,
    exact: true,
  },
  {
    path: "/stock-transfer/create",
    name: "Create Stock Transfer",
    component: StockTransferCreate,
  },
  {
    path: "/stock-transfer/edit/:editId",
    name: "Stock Transfer Edit",
    component: StockTransferEdit,
  },
  {
    path: "/coupon-options",
    name: "Coupon Options",
    component: CouponOptionsList,
    exact: true,
  },
  {
    path: "/coupon-options/create",
    name: "Coupon Options Create",
    component: CouponOptionsCreate,
  },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", name: "Base", component: Cards, exact: true },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/forms", name: "Forms", component: BasicForms },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/brands", name: "Brands", component: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/notifications/toaster", name: "Toaster", component: Toaster },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/login", exact: true, name: "LogIn", component: Login },
];

export default routes;
