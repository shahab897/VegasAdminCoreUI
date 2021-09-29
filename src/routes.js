import React from "react";

const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);
const Tables = React.lazy(() => import("./views/base/tables/Tables"));

const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const BasicForms = React.lazy(() => import("./views/base/forms/BasicForms"));

const Jumbotrons = React.lazy(() =>
  import("./views/base/jumbotrons/Jumbotrons")
);
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Pagnations")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const ProgressBar = React.lazy(() =>
  import("./views/base/progress-bar/ProgressBar")
);
const Switches = React.lazy(() => import("./views/base/switches/Switches"));

const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
const BrandButtons = React.lazy(() =>
  import("./views/buttons/brand-buttons/BrandButtons")
);
const ButtonDropdowns = React.lazy(() =>
  import("./views/buttons/button-dropdowns/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const Charts = React.lazy(() => import("./views/charts/Charts"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));
const Login = React.lazy(() => import("./views/pages/login/Login"));

const WarehouseListComponent = React.lazy(() =>
  import("./components/warehouse/warehouse.component/warehouse-list.component")
);
const WarehouseCreate = React.lazy(() =>
  import(
    "./components/warehouse/warehouse-create.component/warehouse-create.component"
  )
);
const WarehouseEdit = React.lazy(() =>
  import(
    "./components/warehouse/warehouse-edit.component/warehouse-edit.component"
  )
);

const StoresListComponent = React.lazy(() =>
  import("./components/stores/stores-list.component/stores-list.component")
);
const StoresCreate = React.lazy(() =>
  import("./components/stores/stores-create.component/stores-create.component")
);
const StoresEdit = React.lazy(() =>
  import("./components/stores/stores-edit.component/stores-edit.component")
);

const CategoriesListComponent = React.lazy(() =>
  import(
    "./components/catalogue/categories/categories-list/categories-list-component"
  )
);
const CategoriesEdit = React.lazy(() =>
  import(
    "./components/catalogue/categories/categories-edit/categories-edit.component"
  )
);
const CategoriesCreate = React.lazy(() =>
  import(
    "./components/catalogue/categories/categories-create/categories-create.component"
  )
);

const BrandList = React.lazy(() =>
  import("./components/catalogue/Brands/Brands-list/brand-list.component")
);
const BrandsCreate = React.lazy(() =>
  import("./components/catalogue/Brands/Brand-create/brand-create.component")
);
const BrandsEdit = React.lazy(() =>
  import("./components/catalogue/Brands/Brand-edit/brand-edit.component")
);

const OptionsList = React.lazy(() =>
  import("./components/catalogue/options/option.component/option.component")
);
const OptionsCreate = React.lazy(() =>
  import(
    "./components/catalogue/options/option-create.component/option-create.component"
  )
);
const OptionsEdit = React.lazy(() =>
  import(
    "./components/catalogue/options/options-edit.component/options-edit.component"
  )
);

const ProductsList = React.lazy(() =>
  import(
    "./components/catalogue/products/products-list.component/products-list.component"
  )
);
const ProductsCreate = React.lazy(() =>
  import(
    "./components/catalogue/products/products-create.component/products-create.component"
  )
);
const ProductsEdit = React.lazy(() =>
  import(
    "./components/catalogue/products/products-edit.component/product-edit.component"
  )
);

const SuppliersListing = React.lazy(() =>
  import(
    "./components/suppliers/suppliers-listing.component/suppliers-listing.component"
  )
);
const SuppliersCreate = React.lazy(() =>
  import(
    "./components/suppliers/suppliers-create.component/suppliers-create.component"
  )
);
const SuppliersEdit = React.lazy(() =>
  import(
    "./components/suppliers/suppliers-edit.component/suppliers-edit.component"
  )
);

const CouriersList = React.lazy(() =>
  import("./components/courier/courier-list.component/courier-list.component")
);
const CourierCreate = React.lazy(() =>
  import(
    "./components/courier/courier-create.component/courier-create.component"
  )
);
const CouriersEdit = React.lazy(() =>
  import("./components/courier/courier-edit.component/courier-edit.component")
);

const CouponList = React.lazy(() =>
  import(
    "./components/coupon/coupon-listing.component/coupon-listing.component"
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
