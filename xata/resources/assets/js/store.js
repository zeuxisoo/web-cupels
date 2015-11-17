import util from 'util'

class Store {

    set(key, value) {
        if (util.isFunction(value) === true) {
            throw new TypeError('Cannot store function')
        }

        if (util.isObject(value) === true) {
            value = JSON.stringify(value);
        }

        sessionStorage[key] = value
    }

    get(key) {
        let value = sessionStorage[key]

        try{
            return JSON.parse(value);
        }catch(e) {
            return value;
        }
    }

    remove(key) {
        delete sessionStorage[key]
    }

    clear() {
        sessionStorage.clear()
    }

}

export default new Store
