export default class Api {

    constructor(vue) {
        this.vue = vue;
    }

    apiUrl(uri) {
        return '/api/v1' + uri;
    }

    sign() {
        return this.vue.$http.post(this.apiUrl('/auth/sign'))
    }

    flight(data) {
        return this.vue.$http.post(this.apiUrl('/flight/all'), data)
    }

}
