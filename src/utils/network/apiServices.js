// Library Imports
import axios from 'axios';

// Local Imports
import { baseUrl } from './constants';

class apiService {
  //************************* Class Private Functions *******************************//

  getAuthorization = (token) => {
    if (token) {
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`,
      };
      axios.defaults.headers = headers;
      return axios;
    } else {
      return axios;
    }
  };

  #processResponse = (status, endPoint, response) => {
    if (status) {
      let data = {
        success: status,
        data: Array.isArray(response?.data)
          ? response?.data
          : Array.isArray(response?.data?.results)
          ? response?.data?.results
          : response?.data?.data
          ? response?.data?.data
          : response?.data,
      };
      console.log(
        `%c ${endPoint}`,
        'color: green; font-family:sans-serif; font-size: 20px; font-weight: 700',
        data
      );
      return data;
    } else {
      if (response?.message === 'Network Error') {
        let data = {
          success: status,
          data: response?.message,
        };
        console.log(
          `%c ${endPoint}`,
          'color: red; font-family:sans-serif; font-size: 20px; font-weight: 700',
          data
        );
        return data;
      } else {
        let data = {
          success: status,
          data: response?.response?.data?.message,
        };
        console.log(
          `%c ${endPoint}`,
          'color: red; font-family:sans-serif; font-size: 20px; font-weight: 700',
          data
        );
        return data;
      }
    }
  };

  //************************* Get Request Functions *******************************//

  sendGetWithAuth = (payload, endPoint, callback) => {
    const axiosWithAuth = this.getAuthorization();

    axiosWithAuth
      .get(`${baseUrl}/${endPoint}`, payload)
      .then((response) => {
        callback(this.#processResponse(true, endPoint, response));
      })
      .catch((response) => {
        callback(this.#processResponse(false, endPoint, response));
      });
  };

  sendGetWithoutAuth = (payload, endPoint, callback) => {
    axios
      .get(`${baseUrl}/${endPoint}`, payload)
      .then((response) => {
        callback(this.#processResponse(true, endPoint, response));
      })
      .catch((response) => {
        callback(this.#processResponse(false, endPoint, response));
      });
  };

  //************************* Post Request Functions *******************************//

  sendPostWithAuth = (payload, endPoint, callback) => {
    const axiosWithAuth = this.getAuthorization();

    axiosWithAuth
      .post(`${baseUrl}/${endPoint}`, payload)
      .then((response) => {
        callback(this.#processResponse(true, endPoint, response));
      })
      .catch((response) => {
        callback(this.#processResponse(false, endPoint, response));
      });
  };

  sendPostWithAuthFormData = (payload, endPoint, callback) => {
    const axiosWithAuth = this.getAuthorization();

    axiosWithAuth
      .post(`${baseUrl}/${endPoint}`, payload)
      .then((response) => {
        callback(this.#processResponse(true, endPoint, response));
      })
      .catch((response) => {
        callback(this.#processResponse(false, endPoint, response));
      });
  };

  sendPostWithoutAuth = (payload, endPoint, callback) => {
    axios
      .post(`${baseUrl}/${endPoint}`, payload)
      .then((response) => {
        callback(this.#processResponse(true, endPoint, response));
      })
      .catch((response) => {
        callback(this.#processResponse(false, endPoint, response));
      });
  };

  //************************* Delete Request Functions *******************************//

  sendDeleteWithAuth = (payload, endPoint, callback) => {
    const axiosWithAuth = this.getAuthorization();

    axiosWithAuth
      .delete(`${baseUrl}/${endPoint}/${payload}`)
      .then((response) => {
        callback(this.#processResponse(true, endPoint, response));
      })
      .catch((response) => {
        callback(this.#processResponse(false, endPoint, response));
      });
  };

  sendDeleteWithAuthAndPayloadInBody = (payload, endPoint, callback) => {
    const axiosWithAuth = this.getAuthorization();

    axiosWithAuth
      .delete(`${baseUrl}/${endPoint}/`, { data: payload })
      .then((response) => {
        callback(this.#processResponse(true, endPoint, response));
      })
      .catch((response) => {
        callback(this.#processResponse(false, endPoint, response));
      });
  };

  //************************* Update Request Functions *******************************//

  sendPutWithAuth = (payload, endPoint, callback) => {
    const axiosWithAuth = this.getAuthorization();

    axiosWithAuth
      .put(`${baseUrl}/${endPoint}/`, payload)
      .then((response) => {
        callback(this.#processResponse(true, endPoint, response));
      })
      .catch((response) => {
        callback(this.#processResponse(false, endPoint, response));
      });
  };

  sendPutWithAuthFormData = (payload, endPoint, callback) => {
    const axiosWithAuth = this.getAuthorization();

    axiosWithAuth
      .put(`${baseUrl}/${endPoint}`, payload)
      .then((response) => {
        callback(this.#processResponse(true, endPoint, response));
      })
      .catch((response) => {
        callback(this.#processResponse(false, endPoint, response));
      });
  };
}

const ApiServices = new apiService();
export default ApiServices;
