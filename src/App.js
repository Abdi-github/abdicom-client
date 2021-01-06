import react, { useEffect, lazy, Suspense } from "react";

// ------------------- WITH OUT REACT LAZY -------------------------

// import LoginPage from "./pages/auth/LoginPage";
// import RegisterPage from "./pages/auth/RegisterPage";
// import HomePage from "./pages/HomePage";
// import { Switch, Route } from "react-router-dom";
// import Header from "./components/nav/Header";
// import RegisterCompletePage from "./pages/auth/RegisterCompletePage";
// import { auth } from "./firebase";
// import { useDispatch } from "react-redux";
// import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
// import { currentUser } from "./functions/auth";
// import UserDashboardPage from "./pages/user/UserDashboardPage";
// import PasswordUpdatePage from "./pages/user/PasswordUpdatePage";
// import WishListPage from "./pages/user/WishListPage";
// import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import CategoryUpdatePage from "./pages/admin/category/CategoryUpdatePage";
// import AdminRoute from "./components/routes/AdminRoute";
// import UserPrivateRoute from "./components/routes/UserPrivateRoute";
// import SubCategoryCreatePage from "./pages/admin/subCategory/SubCategoryCreatePage";
// import SubCategoryUpdatePage from "./pages/admin/subCategory/SubCategoryUpdatePage";
// import ProductCreatePage from "./pages/admin/product/ProductCreatePage";
// import AllProductsPage from "./pages/admin/product/AllProductsPage";
// import ProductUpdatePage from "./pages/admin/product/ProductUpdatePage";
// import SingleProductDetail from "./pages/SingleProductDetail";
// import { ToastContainer } from "react-toastify";
// import CategoryHomePage from "./pages/category/CategoryHomePage";
// import SubCategoryHomePage from "./pages/subCategory/SubCategoryHomePage";
// import ShopPage from "./pages/ShopPage";
// import CartPage from "./pages/CartPage";
// import CheckoutPage from "./pages/CheckoutPage";
// import CouponCreatePage from "./pages/admin/coupon/CouponCreatePage";
// import PaymentPage from "./pages/PaymentPage";

// -------------- WITH LAZY -----------------------

import { Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import LoginPage from "./pages/auth/LoginPage";
import { currentUser } from "./functions/auth";
import { ToastContainer } from "react-toastify";
import { Loading } from "./components/Loading";

// const Loading = lazy(() => import("./components/Loading"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterCompletePage = lazy(() =>
  import("./pages/auth/RegisterCompletePage")
);
const ForgotPasswordPage = lazy(() =>
  import("./pages/auth/ForgotPasswordPage")
);
const UserDashboardPage = lazy(() => import("./pages/user/UserDashboardPage"));
const PasswordUpdatePage = lazy(() =>
  import("./pages/user/PasswordUpdatePage")
);
const WishListPage = lazy(() => import("./pages/user/WishListPage"));
const AdminDashboardPage = lazy(() =>
  import("./pages/admin/AdminDashboardPage")
);
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdatePage = lazy(() =>
  import("./pages/admin/category/CategoryUpdatePage")
);
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const UserPrivateRoute = lazy(() =>
  import("./components/routes/UserPrivateRoute")
);
const SubCategoryCreatePage = lazy(() =>
  import("./pages/admin/subCategory/SubCategoryCreatePage")
);
const SubCategoryUpdatePage = lazy(() =>
  import("./pages/admin/subCategory/SubCategoryUpdatePage")
);
const ProductCreatePage = lazy(() =>
  import("./pages/admin/product/ProductCreatePage")
);
const AllProductsPage = lazy(() =>
  import("./pages/admin/product/AllProductsPage")
);
const ProductUpdatePage = lazy(() =>
  import("./pages/admin/product/ProductUpdatePage")
);
const SingleProductDetail = lazy(() => import("./pages/SingleProductDetail"));
const CategoryHomePage = lazy(() =>
  import("./pages/category/CategoryHomePage")
);
const SubCategoryHomePage = lazy(() =>
  import("./pages/subCategory/SubCategoryHomePage")
);
const ShopPage = lazy(() => import("./pages/ShopPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CouponCreatePage = lazy(() =>
  import("./pages/admin/coupon/CouponCreatePage")
);
const PaymentPage = lazy(() => import("./pages/PaymentPage"));

// const Loading = lazy(() => import("./components/Loading"));

function App() {
  const dispatch = useDispatch();

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        console.log("user", user);
        currentUser(tokenResult.token)
          .then((res) => {
            console.log("ADD-UPDATE RESPONSE", res);

            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: tokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => console.log(error));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <ToastContainer />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register/complete" component={RegisterCompletePage} />
        <Route path="/forgot/password" component={ForgotPasswordPage} />
        <UserPrivateRoute
          path="/user/dashboard"
          component={UserDashboardPage}
        />
        <UserPrivateRoute
          path="/user/password-update"
          component={PasswordUpdatePage}
        />
        <UserPrivateRoute path="/user/wishlist" component={WishListPage} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboardPage} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdatePage}
        />
        <AdminRoute
          exact
          path="/admin/subCategory"
          component={SubCategoryCreatePage}
        />
        <AdminRoute
          exact
          path="/admin/subCategory/:slug"
          component={SubCategoryUpdatePage}
        />
        <AdminRoute exact path="/admin/product" component={ProductCreatePage} />
        <AdminRoute exact path="/admin/products" component={AllProductsPage} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdatePage}
        />

        <Route path="/product/:slug" component={SingleProductDetail} />
        <Route path="/category/:slug" component={CategoryHomePage} />
        <Route path="/subcategory/:slug" component={SubCategoryHomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <AdminRoute path="/admin/coupon" component={CouponCreatePage} />
        <UserPrivateRoute path="/payment" component={PaymentPage} />
      </Switch>
    </Suspense>
  );
}

export default App;
