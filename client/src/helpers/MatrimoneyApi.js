import Local from "./Local";

class MatrimoneyApi {
  //login the user
  static async loginUser(username, password) {
    let body = { username, password };
    return await this._doFetch(`/login`, "POST", body);
  }

  //get all users
  static async getUsers() {
    return await this._doFetch("/users");
  }
  //get user by id
  static async getUserById(userId) {
    return await this._doFetch(`/users/${userId}`);
  }
  // cost_estimate methods
  static async getCostEstimate() {
    return await this._doFetch("/budget");
  }

  static async addCostEstimate(costEstObj) {
    return await this._doFetch(`/budget`, "POST", costEstObj);
  }

  static async deleteCostEstimate(id) {
    return await this._doFetch(`/budget/${id}`, "DELETE");
  }

  // cost_actual methods
  static async getCostActual() {
    return await this._doFetch(`/budget/costs`);
  }

  static async getOneCostActual(id) {
    return await this._doFetch(`/budget/costs/${id}`);
  }

  static async addCostActual(costActObj) {
    return await this._doFetch(`/budget/costs`, "POST", costActObj);
  }

  static async deleteCostActual(id) {
    return await this._doFetch(`/budget/costs/${id}`, "DELETE");
  }

  // income methods
  static async getIncome() {
    return await this._doFetch(`/income`);
  }

  static async addIncome(incomeObj) {
    return await this._doFetch(`/income`, "POST", incomeObj);
  }

  static async changeIncome(id, incomeObj) {
    return await this._doFetch(`/income/${id}`, "PATCH", incomeObj);
  }

  static async deleteIncome(id) {
    return await this._doFetch(`/income/${id}`, "DELETE");
  }

  static async _doFetch(url, method = "GET", body = null) {
    let options = {
      method,
      headers: {},
    };
    //ADD TOKEN AUTHERIZATION
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }
    if (body) {
      options.headers["Content-Type"] = "application/json"; //should i put this in if headers???
      options.body = JSON.stringify(body);
    }

    let uresponse = { ok: false, data: null, status: 0, error: "" };
    try {
      let response = await fetch(url, options);
      if (response.ok) {
        uresponse.ok = true;
        uresponse.data = await response.json();
        uresponse.status = response.status;
      } else {
        uresponse.status = response.status;
        uresponse.error = response.statusText;
      }
    } catch (err) {
      uresponse.error = err.message;
    }
    return uresponse;
  }
}

export default MatrimoneyApi;

/**
 * Jim's notes on this type of file:
 * This is a helper class that places all "knowledge" about doing a fetch() in one place.
 * Any component that needs to do a fetch() will import this class and call the corresponding method.
 *
 * All methods call the internal/private _doFetch() method, which does all the work. It returns
 * a "unified" uresponse obj that has four properties:
 *   ok: true if the server response is OK, false otherwise
 *   data: the response data if OK, null otherwise
 *   status: the response status code if the server was reached; 0 otherwise
 *   error: the error message if there was either a server or network error, '' otherwise
 **/
