class HttpService {
  async exchangeData(method, url, data = null) {
    const reqContent = {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
    if (data !== null) {
      reqContent.body = JSON.stringify(data);
    }
    return fetch(url, reqContent).then((res) => res.json());
  }
}

export const httpService = new HttpService();
