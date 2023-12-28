const NOT_FOUND = '/404';
const AUTH = '/auth';
const HOME = '/';
const CATALOG = '/catalog';
const PRODUCT = `${CATALOG}/product`;
const GALLERY = '/gallery';
const ACCOUNT = '/account';
const CART = `${ACCOUNT}/cart`;
const FAVORITES = `${ACCOUNT}/favorites`;
const PROFILE = `${ACCOUNT}/profile`;
const ORDERS = `${ACCOUNT}/orders`;
const ADMIN = '/admin';
const ADMIN_USERS = `${ADMIN}/users`;
const ADMIN_PRODUCTS = `${ADMIN}/products`;
const ADMIN_ORDERS = `${ADMIN}/orders`;

const publicRoutes = {
  HOME,
  CATALOG,
  GALLERY,
  PRODUCT,
};

const authUserRoutes = {
  PROFILE,
  CART,
  FAVORITES,
  ACCOUNT,
  ORDERS,
};

const adminRoutes = {
  ADMIN,
  ADMIN_USERS,
  ADMIN_PRODUCTS,
  ADMIN_ORDERS,
};

export const routes = {
  publicRoutes,
  authUserRoutes,
  adminRoutes,
  AUTH,
  NOT_FOUND,
};
