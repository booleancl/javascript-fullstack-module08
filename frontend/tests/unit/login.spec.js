import { renderComponent } from "../utils";
import { Auth } from "@/firebase";
import Login from "@/views/Login.vue";
import { fireEvent } from "@testing-library/vue";
import Vue from 'vue'

const userMock = require("@fixturesDir/user.json");

jest.mock("@/firebase", () => ({
  Auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
}));

describe("Login.vue", () => {
  it("renders a simple component", () => {
    const { container } = renderComponent(Login);
    expect(container).toBeDefined();
  });

  it("does not login with empty inputs", async () => {
    const { getByText } = renderComponent(Login);
    const btn = getByText("Ingresar");

    await fireEvent.click(btn);

    expect(Auth.signInWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it("calls the signInWithEmailAndPassword when the form is valid", async () => {
    const email = "xyz@boolean.cl";
    const password = "fakepass";
    const setUserMock = jest.fn();
    const routerMock = { push: jest.fn() };

    Auth.signInWithEmailAndPassword.mockResolvedValue(userMock);

    const { getByLabelText, getByText } = renderComponent(Login, {
      customStore: {
        actions: { setUser: setUserMock },
      },
      mocks: { $router: routerMock },
    });

    const passInput = getByLabelText("Contraseña");
    const emailInput = getByLabelText("Correo");
    const btn = getByText("Ingresar");

    fireEvent.update(emailInput, email);
    fireEvent.update(passInput, password);

    await fireEvent.click(btn);

    expect(Auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password
    );
    expect(setUserMock).toHaveBeenCalledWith(expect.any(Object), userMock.user);
    expect(routerMock.push).toHaveBeenCalledWith({ name: "Products" });
  });
  it("Sets an alert message when authentication fails", async () => {
    Auth.signInWithEmailAndPassword.mockRejectedValue(new Error());
    const { getByRole, getByLabelText, getByText } = renderComponent(Login);

    const email = getByLabelText("Correo");
    const password = getByLabelText("Contraseña");

    fireEvent.update(email, "coltrane@boolean.cl");
    fireEvent.update(password, "jazz&sax");
    await fireEvent.click(getByText("Ingresar"));
    await Vue.nextTick()

    expect(getByRole("alert").textContent).toEqual(
      "Usuario o contraseña inválidos. Ingresa los datos correctos."
    );
  });
});
