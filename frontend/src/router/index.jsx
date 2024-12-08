import { useRoutes } from "react-router-dom";
import { useAuth } from "../redux/selector";
import ROUTES from "../constant/routes";
import HomePage from "../pages/home_page";
import RecipeDetailsPage from "../pages/recipe/details_page";
import SettingsPage from "../pages/user/settings_page";
// import CreateRecipePage from "../pages/recipe/create_page";
import SignInPage from "../pages/auth/sign_in";
import SignUpPage from "../pages/auth/sign_up";
import NotFoundPage from "../pages/not_found_page";
import Layout from "../layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import UserInfo from "../components/ProfileComponent/UserInfo";
import Account from "../components/ProfileComponent/Account";
import ProfilePage from "../pages/user/profile_page";
import React from "react";
import RouteElement from "./RouteElement";
import RecipePage from "../pages/recipe";
import RecipeTransactionContainer from "../Container/recipe/transactions";
import PointHistoryContainer from "../Container/point/history";
import PurchasedRecipeContainer from "../Container/recipe/purchased";
import CreatedRecipesContainer from "../Container/recipe/created";

const enhanceRoutesWithTitles = (routes, parentTitle, isChildrenRoute) => {
  if (!routes || !routes.length) return;

  return routes.map((route) => {
    const isReactElement = React.isValidElement(route.element);

    route.element = (
      <RouteElement
        title={route.title || "Food Recipe"}
        parentTitle={parentTitle}
        path={route.path}
        params={route.params}
      >
        {isReactElement ? route.element : React.createElement(route.element)}
      </RouteElement>
    );

    route.children
      ? (route.children = enhanceRoutesWithTitles(
          route.children,
          route.title,
          true
        ))
      : delete route["children"];

    return { ...route };
  });
};

const routes = [
  {
    isPrivate: false,
    path: ROUTES.ROOT,
    element: Layout,
    children: [
      {
        title: "Home",
        path: ROUTES.ROOT,
        element: HomePage,
      },
      {
        title: "Sign in",
        path: ROUTES.AUTH_SIGN_IN,
        element: SignInPage,
      },
      {
        title: "Sign up",
        path: ROUTES.AUTH_SIGN_UP,
        element: SignUpPage,
      },
      {
        title: "Create Recipe",
        path: ROUTES.RECIPE_CREATE,
        element: RecipePage,
      },
      {
        title: "Recipe",
        path: ROUTES.RECIPE_DETAILS,
        element: RecipeDetailsPage,
        params: ["id"],
      },
      {
        title: "Settings",
        path: ROUTES.SETTINGS,
        element: SettingsPage,
      },
    ],
  },
  {
    isPrivate: true,
    path: ROUTES.ROOT,
    element: Layout,
    roles: ["USER"],
    children: [
      {
        title: "Edit Recipe",
        path: ROUTES.RECIPE_EDIT,
        element: RecipePage,
        params: ["id"],
      },
      {
        title: "Profile",
        path: ROUTES.PROFILE,
        element: ProfilePage,
        children: [
          {
            title: "Account information",
            path: ROUTES.PROFILE_ACCOUNT_INFO,
            element: Account,
          },
          {
            title: "User information",
            path: ROUTES.PROFILE_USER_INFORMATION,
            element: UserInfo,
          },
          {
            title: "Created recipes",
            path: ROUTES.PROFILE_RECIPE_MANAGEMENT,
            element: CreatedRecipesContainer,
          },
          {
            title: "Purchased recipes",
            path: ROUTES.PROFILE_PURCHASED_RECIPES,
            element: PurchasedRecipeContainer,
          },
          {
            title: "Transactions history",
            path: ROUTES.PROFILE_RECIPE_TRANSACTION_HISTORY,
            element: RecipeTransactionContainer,
          },
          {
            title: "Point history",
            path: ROUTES.PROFILE_POINT_HISTORY,
            element: PointHistoryContainer,
          },
        ],
      },
    ],
  },
  {
    title: "Not found page",
    is404: true,
    path: "*",
    element: NotFoundPage,
  },
];

const AppRouter = () => {
  const auth = useAuth();
  const currentUser = auth.signIn.currentUser;
  const mappedRoutes = enhanceRoutesWithTitles(routes, null, false);

  return useRoutes(
    mappedRoutes
      .map((route) => {
        if (route.isPrivate) {
          return {
            ...route,
            element: <PrivateRoute>{route.element}</PrivateRoute>,
          };
        }

        return {
          ...route,
          element: <PublicRoute>{route.element}</PublicRoute>,
        };
      })
      .filter((route) => {
        if (route.is404) return true;
        if (!route.isPrivate) return true;
        return currentUser != null || currentUser !== undefined;
      })
  );
};

export default AppRouter;
