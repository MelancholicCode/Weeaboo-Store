import { ADMIN_ROUTE, CART_ROUTE, CATALOG_ROUTE, FAVORITES_ROUTE, PRODUCT_ROUTE, PROFILE_ROUTE } from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    component: '{AdminComponent}'
  },
  {
    path: FAVORITES_ROUTE,
    component: '{FavoritesComponent}'
  },
  {
    path: CART_ROUTE,
    component: '{CartComponent}'
  },
  {
    path: PROFILE_ROUTE,
    component: '{ProfileComponent}'
  }
];
export const publicRoutes = [
  {
    path: CATALOG_ROUTE,
    component: '{CatalogComponent}'
  },
  {
    path: PRODUCT_ROUTE + ':id',
    component: '{ProductComponent}'
  }
];