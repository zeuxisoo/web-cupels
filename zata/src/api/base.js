import { AsyncStorage } from 'react-native'

export default class Api {

    url(uri, params) {
        let endpoint = "http://xata.zeuik.com/api/v1" + uri;

        if (params) {
            endpoint = endpoint + "?" + JSON.stringify(params);
        }

        return endpoint;
    }

    async promisePost(uri, data) {
        let token = await AsyncStorage.getItem('auth-token');
        let url   = this.url(uri);

        if (Object.prototype.toString.call(data) === "[object Undefined]") {
            data = {};
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                headers: {
                    'Accept'       : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization': `bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                resolve(responseJSON);
            })
            .catch((error) => {
                resolve(null);
            });
        })
    }

}
