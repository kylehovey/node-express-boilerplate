import "babel-polyfill";
import "bootstrap";
import App from "./app.js";

$(() => {
  // Create the application
  window.app = new App();
});
