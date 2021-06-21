class HttpService {
  ajax(method, url, data, headers) {
    const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

    // if(valueStorage.getItem(tokenKey)){
    //   fetchHeaders.append("authorization", "Bearer "+ valueStorage.getItem(tokenKey))
    // }
    fetchHeaders.append('content-type', 'application/json');
    // console.log(headers);
    console.log(fetchHeaders);

    return fetch(url, {
      method: method,
      headers: fetchHeaders,
      body: JSON.stringify(data),
    }).then((x) => {
      return x.json();
    });
  }

  async getData(url) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return response;
  }

  async postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    return response;
  }

  async patchData(url, data) {
    const response = await fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    return response;
  }
}

export const httpService = new HttpService();
