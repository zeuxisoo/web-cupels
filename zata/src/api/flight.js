import Api from './base'

export default class Flight extends Api {

    authSign() {
        return this.promisePost('/auth/sign')
    }

    fetchAll(data) {
        return this.promisePost('/flight/all', data)
    }

}
