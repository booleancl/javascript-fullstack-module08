import Vue from "vue";
import Vuetify from "vuetify";
import { RouterLinkStub } from "@vue/test-utils";
import { render } from "@testing-library/vue";

import { store } from "@/store";
// Source:
//  https://github.com/testing-library/vue-testing-library/blob/master/src/__tests__/vuetify.js
//  https://github.com/testing-library/vue-testing-library/blob/master/src/__tests__/vuex.js
// We need to use a global Vue instance, otherwise Vuetify will complain about
// read-only attributes.
// This could also be done in a custom Jest-test-setup file to execute for all tests.
// More info: https://github.com/vuetifyjs/vuetify/issues/4068
//            https://vuetifyjs.com/en/getting-started/unit-testing
Vue.use(Vuetify);

// Custom container to integrate Vuetify with Vue Testing Library.
// Vuetify requires you to wrap your app with a v-app component that provides
// a <div data-app="true"> node.
export const renderComponent = (component, options, callback) => {
  const root = document.createElement("div");
  const customStore = options?.customStore || {};
  root.setAttribute("data-app", "true");

  return render(
    component,
    {
      container: document.body.appendChild(root),
      // for Vuetify components that use the $vuetify instance property
      vuetify: new Vuetify(),
      stubs: {
        RouterLink: RouterLinkStub,
      },
      store: { ...store, ...customStore },
      ...options,
    },
    callback
  );
};
