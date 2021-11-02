import React from "react";
import componentLoader from "./utils/component-loader";

// const StockTransferCreate = React.lazy(() =>
//   componentLoader(
//     () =>
import StockTransferCreate from "./components/stock-transfer/stock-transfer-create/stock-transfer-create.component";

const maxAttempts = 10;

const Toaster = React.lazy(() =>
  componentLoader(
    () => import("./views/notifications/toaster/Toaster"),
    maxAttempts
  )
);
const Tables = React.lazy(() =>
  componentLoader(() => import("./views/base/tables/Tables"), maxAttempts)
);

const Breadcrumbs = React.lazy(() =>
  componentLoader(
    () => import("./views/base/breadcrumbs/Breadcrumbs"),
    maxAttempts
  )
);
const Cards = React.lazy(() =>
  componentLoader(() => import("./views/base/cards/Cards"), maxAttempts)
);
const Carousels = React.lazy(() =>
  componentLoader(() => import("./views/base/carousels/Carousels"), maxAttempts)
);
const Collapses = React.lazy(() =>
  componentLoader(() => import("./views/base/collapses/Collapses"), maxAttempts)
);
const BasicForms = React.lazy(() =>
  componentLoader(() => import("./views/base/forms/BasicForms"), maxAttempts)
);

const Jumbotrons = React.lazy(() =>
  componentLoader(
    () => import("./views/base/jumbotrons/Jumbotrons"),
    maxAttempts
  )
);
const ListGroups = React.lazy(() =>
  componentLoader(
    () => import("./views/base/list-groups/ListGroups"),
    maxAttempts
  )
);
const Navbars = React.lazy(() =>
  componentLoader(() => import("./views/base/navbars/Navbars"), maxAttempts)
);
const Navs = React.lazy(() =>
  componentLoader(() => import("./views/base/navs/Navs"), maxAttempts)
);
const Paginations = React.lazy(() =>
  componentLoader(
    () => import("./views/base/paginations/Pagnations"),
    maxAttempts
  )
);
const Popovers = React.lazy(() =>
  componentLoader(() => import("./views/base/popovers/Popovers"), maxAttempts)
);
const ProgressBar = React.lazy(() =>
  componentLoader(
    () => import("./views/base/progress-bar/ProgressBar"),
    maxAttempts
  )
);
const Switches = React.lazy(() =>
  componentLoader(() => import("./views/base/switches/Switches"), maxAttempts)
);

const Tabs = React.lazy(() =>
  componentLoader(() => import("./views/base/tabs/Tabs"), maxAttempts)
);
const Tooltips = React.lazy(() =>
  componentLoader(() => import("./views/base/tooltips/Tooltips"), maxAttempts)
);
const BrandButtons = React.lazy(() =>
  componentLoader(
    () => import("./views/buttons/brand-buttons/BrandButtons"),
    maxAttempts
  )
);
const ButtonDropdowns = React.lazy(() =>
  componentLoader(
    () => import("./views/buttons/button-dropdowns/ButtonDropdowns"),
    maxAttempts
  )
);
const ButtonGroups = React.lazy(() =>
  componentLoader(
    () => import("./views/buttons/button-groups/ButtonGroups"),
    maxAttempts
  )
);
const Buttons = React.lazy(() =>
  componentLoader(() => import("./views/buttons/buttons/Buttons"), maxAttempts)
);
const Charts = React.lazy(() =>
  componentLoader(() => import("./views/charts/Charts"), maxAttempts)
);
const Dashboard = React.lazy(() =>
  componentLoader(() => import("./views/dashboard/Dashboard"), maxAttempts)
);
const CoreUIIcons = React.lazy(() =>
  componentLoader(
    () => import("./views/icons/coreui-icons/CoreUIIcons"),
    maxAttempts
  )
);
const Flags = React.lazy(() =>
  componentLoader(() => import("./views/icons/flags/Flags"), maxAttempts)
);
const Brands = React.lazy(() =>
  componentLoader(() => import("./views/icons/brands/Brands"), maxAttempts)
);
const Alerts = React.lazy(() =>
  componentLoader(
    () => import("./views/notifications/alerts/Alerts"),
    maxAttempts
  )
);
const Badges = React.lazy(() =>
  componentLoader(
    () => import("./views/notifications/badges/Badges"),
    maxAttempts
  )
);
const Modals = React.lazy(() =>
  componentLoader(
    () => import("./views/notifications/modals/Modals"),
    maxAttempts
  )
);
const Colors = React.lazy(() =>
  componentLoader(() => import("./views/theme/colors/Colors"), maxAttempts)
);
const Typography = React.lazy(() =>
  componentLoader(
    () => import("./views/theme/typography/Typography"),
    maxAttempts
  )
);
const Widgets = React.lazy(() =>
  componentLoader(() => import("./views/widgets/Widgets"), maxAttempts)
);
const Users = React.lazy(() =>
  componentLoader(() => import("./views/users/Users"), maxAttempts)
);
const User = React.lazy(() =>
  componentLoader(() => import("./views/users/User"), maxAttempts)
);
const Login = React.lazy(() =>
  componentLoader(() => import("./views/pages/login/Login"), maxAttempts)
);

const WarehouseListComponent = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/warehouse/warehouse.component/warehouse-list.component"
      ),
    maxAttempts
  )
);
const WarehouseCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/warehouse/warehouse-create.component/warehouse-create.component"
      ),
    maxAttempts
  )
);
const WarehouseEdit = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/warehouse/warehouse-edit.component/warehouse-edit.component"
      ),
    maxAttempts
  )
);

const StoresListComponent = React.lazy(() =>
  componentLoader(
    () =>
      import("./components/stores/stores-list.component/stores-list.component"),
    maxAttempts
  )
);
const StoresCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/stores/stores-create.component/stores-create.component"
      ),
    maxAttempts
  )
);
const StoresEdit = React.lazy(() =>
  componentLoader(
    () =>
      import("./components/stores/stores-edit.component/stores-edit.component"),
    maxAttempts
  )
);

const CategoriesListComponent = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/categories/categories-list/categories-list-component"
      ),
    maxAttempts
  )
);
const CategoriesEdit = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/categories/categories-edit/categories-edit.component"
      ),
    maxAttempts
  )
);
const CategoriesCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/categories/categories-create/categories-create.component"
      ),
    maxAttempts
  )
);

const BrandList = React.lazy(() =>
  componentLoader(
    () =>
      import("./components/catalogue/Brands/Brands-list/brand-list.component"),
    maxAttempts
  )
);
const BrandsCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/Brands/Brand-create/brand-create.component"
      ),
    maxAttempts
  )
);
const BrandsEdit = React.lazy(() =>
  componentLoader(
    () =>
      import("./components/catalogue/Brands/Brand-edit/brand-edit.component"),
    maxAttempts
  )
);

const OptionsList = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/options/option.component/option.component"
      ),
    maxAttempts
  )
);
const OptionsCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/options/option-create.component/option-create.component"
      ),
    maxAttempts
  )
);
const OptionsEdit = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/options/options-edit.component/options-edit.component"
      ),
    maxAttempts
  )
);

const ProductsList = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/products/products-list.component/products-list.component"
      ),
    maxAttempts
  )
);
const ProductsCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/products/products-create.component/products-create.component"
      ),
    maxAttempts
  )
);
const ProductsEdit = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/catalogue/products/products-edit.component/product-edit.component"
      ),
    maxAttempts
  )
);

const SuppliersListing = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/suppliers/suppliers-listing.component/suppliers-listing.component"
      ),
    maxAttempts
  )
);
const SuppliersCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/suppliers/suppliers-create.component/suppliers-create.component"
      ),
    maxAttempts
  )
);
const SuppliersEdit = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/suppliers/suppliers-edit.component/suppliers-edit.component"
      ),
    maxAttempts
  )
);

const CouriersList = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/courier/courier-list.component/courier-list.component"
      ),
    maxAttempts
  )
);
const CourierCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/courier/courier-create.component/courier-create.component"
      ),
    maxAttempts
  )
);
const CouriersEdit = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/courier/courier-edit.component/courier-edit.component"
      ),
    maxAttempts
  )
);

const CouponList = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/coupon/coupon-listing.component/coupon-listing.component"
      ),
    maxAttempts
  )
);
const CouponCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/coupon/coupon-create.component/coupon-create.component"
      ),
    maxAttempts
  )
);
const CouponEdit = React.lazy(() =>
  componentLoader(
    () =>
      import("./components/coupon/coupon-edit.component/coupon-edit.component"),
    maxAttempts
  )
);
const ManagePurchaseOrder = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/purchase-orders/manage-purchase-order/manage-purchase-order.component"
      ),
    maxAttempts
  )
);
const ManagePOCreate = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/purchase-orders/manage-purchase-order/manage-purchase-order-create.compoent/manage-purchase-order-create.component"
      ),
    maxAttempts
  )
);
const ManagePOEdit = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/purchase-orders/manage-purchase-order/manage-purchase-order-edit/manage-purchase-order-edit.component"
      ),
    maxAttempts
  )
);
//       ),
//     maxAttempts
//   )
// );
const StockTransferComponent = React.lazy(() =>
  import(
    "./components/stock-transfer/stock-transfer-list/stock-transfer-list.component"
  )
);
const StockTransferEdit = React.lazy(() =>
  componentLoader(
    () =>
      import(
        "./components/stock-transfer/stock-transfer-edit.component/stock-transfer-edit.component"
      ),
    maxAttempts
  )
);

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
