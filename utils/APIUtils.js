import { expect } from "@playwright/test";

export class APIUtil {
  constructor(requestContext, baseURL) {
    this.requestContext = requestContext;
    this.baseURL = baseURL;
  }

  async login(payload) {
    const response = await this.requestContext.post(
      `${this.baseURL}/account/login`,
      {
        form: {
          name: payload.name,
          password: payload.password,
        },
      },
    );

    expect(
      response.ok(),
      `Login failed with status ${response.status()}`,
    ).toBeTruthy();

    const body = await response.json();
    expect(body.success).toBeTruthy();
  }

  async assertLoggedIn() {
    const statusResponse = await this.requestContext.get(
      `${this.baseURL}/check-login-status`,
    );
    expect(statusResponse.ok()).toBeTruthy();

    const statusBody = await statusResponse.json();
    expect(statusBody.logged_in).toBe(true);
  }

  async saveStorageState(path) {
    await this.requestContext.storageState({ path });
  }
}
