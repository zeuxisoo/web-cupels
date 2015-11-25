import { AsyncStorage } from 'react-native'

export default class Api {

    url(uri, params) {
        let endpoint = "http://10.0.1.14:8000/api/v1" + uri;

        if (params) {
            endpoint = endpoint + "?" + JSON.stringify(params);
        }

        return endpoint;
    }

    async promisePost(uri, data) {
        let token = await AsyncStorage.getItem('auth-token');

        console.group("Api.promisePost");
        console.log(this.url(uri));
        console.log(token);
        console.log(data);
        console.groupEnd();

        if (Object.prototype.toString.call(data) === "[object Undefined]") {
            data = {};
        }

        return new Promise((resolve, reject) => {
            fetch(this.url(uri), {
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
                console.log(`promisePost error : ${error}`);

                resolve(null);
            });
        })
    }

}
