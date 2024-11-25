// redirect.js
import Router from "next/router";

export const redirectToNotFound = () => {
  Router.push("/not-found");
};
