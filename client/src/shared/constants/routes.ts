const NOT_FOUND = '/404';
const AUTH = '/auth';
const HOME = '/';
const CATALOG = '/catalog';
const CATEGORY = `${CATALOG}/category`;
const PRODUCT = `${CATALOG}/product`;
const GALLERY = '/gallery';
const ACCOUNT = '/account';
const CART = `${ACCOUNT}/cart`;
const FAVORITES = `${ACCOUNT}/favorites`;
const PROFILE = `${ACCOUNT}/profile`;
const ORDERS = `${ACCOUNT}/orders`;
const ADMIN = '/admin';
const ADMIN_USERS = `${ADMIN}/users`;
const ADMIN_CATEGORIES = `${ADMIN}/categories`;
const ADMIN_PRODUCTS = `${ADMIN}/products`;

const publicRoutes = {
  HOME,
  CATALOG,
  GALLERY,
  CATEGORY,
  PRODUCT,
};

const authUserRoutes = {
  ACCOUNT,
  PROFILE,
  CART,
  FAVORITES,
  ORDERS,
};

const adminRoutes = {
  ADMIN,
  ADMIN_USERS,
  ADMIN_CATEGORIES,
  ADMIN_PRODUCTS,
};

export const routes = {
  publicRoutes,
  authUserRoutes,
  adminRoutes,
  AUTH,
  NOT_FOUND,
};
