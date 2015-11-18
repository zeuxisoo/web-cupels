<template>
    <div id="home">
        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-default" v-bind:class="{ 'shake': error, 'animated': error }">
                    <div class="panel-heading">Search</div>
                    <div class="panel-body">
                        <div class="form-inline">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">$</div>
                                    <input type="number" name="price" class="form-control" placeholder="1230" v-model="price">
                                    <div class="input-group-addon">.00</div>
                                </div>
                            </div>
                            <button class="btn btn-primary" v-on:click="search">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-default" v-if="hasFlights === false">
                    <div class="panel-heading">Result</div>
                    <div class="panel-body">
                        Please make search first :(
                    </div>
                </div>

                <div class="panel panel-default fadeInUp animated" v-for="flight in flights">
                    <div class="panel-heading">
                        <label class="label label-info">{{ flight.departure_port }}</label>
                        <i class="glyphicon glyphicon-arrow-right"></i>
                        <label class="label label-primary">{{ flight.arrival_port }}</label>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-12 col-md-2 text-center">
                                <div class="row">成人票價</div>
                                <div class="row vertical-center">
                                    <strong>{{ flight.ticket_price }}</strong>
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-10">
                                <div class="row">
                                    <div class="col-xs-6 col-md-4">航空公司</div>
                                    <div class="col-xs-6 col-md-2 text-right">{{ flight.company_code }}</div>
                                    <div class="col-xs-6 col-md-4">客艙類別</div>
                                    <div class="col-xs-6 col-md-2 text-right">{{ flight.cabin }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-md-4">停留天數 最短</div>
                                    <div class="col-xs-6 col-md-2 text-right">{{ flight.stay_day_min }}</div>
                                    <div class="col-xs-6 col-md-4">停留天數 最長</div>
                                    <div class="col-xs-6 col-md-2 text-right">{{ flight.stay_day_max }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-md-4">行程有效期 由</div>
                                    <div class="col-xs-6 col-md-2 text-right">{{ flight.valid_date_from }}</div>
                                    <div class="col-xs-6 col-md-4">行程有效期 至</div>
                                    <div class="col-xs-6 col-md-2 text-right">{{ flight.valid_date_to }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-md-4">出票期限 由</div>
                                    <div class="col-xs-6 col-md-2 text-right">{{ flight.valid_buy_ticket_date_from }}</div>
                                    <div class="col-xs-6 col-md-4">出票期限 至</div>
                                    <div class="col-xs-6 col-md-2 text-right">{{ flight.valid_buy_ticket_date_to }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" v-if="hasLoadMore">
            <div class="col-xs-12">
                <button class="btn btn-default full-width" v-on:click="loadMore">- Load more -</button>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert'
import Api from '../api'
import Store from '../store'

export default {
    data() {
        return {
            error     : false,
            price     : 0,
            flights   : [],
            pagination: {}
        }
    },

    ready() {
        this.$api.sign().success((response, status, request) => {
            Store.set('auth-token', response.token);

            this.setAuthorization(response.token);
        })
    },

    computed: {
        hasFlights() {
            return this.flights.length > 0;
        },

        hasLoadMore() {
            return this.pagination.current_page < this.pagination.total_pages;
        }
    },

    methods: {
        setAuthorization(token) {
            this.$http.headers.common["Authorization"] = "bearer " + token;
        },

        alertDanger(message) {
            swal("Ooops !!!", message, "warning");

            this.error = true;
            setTimeout(() => this.error = false, 1000);
        },

        errorHandler(response, status, request) {
            if (response.errors) {
                Object.keys(response.errors).forEach((key) => {
                    this.alertDanger(response.errors[key].shift());
                    return;
                });
            }
        },

        fetchFlights(data) {
            this.$api
                .flight(data)
                .success((response, status, request) => {
                    if (data.page === 1) {
                        this.flights = response.data;
                    }else{
                        this.flights = this.flights.concat(response.data);
                    }

                    this.pagination = response.meta.pagination;
                })
                .error(this.errorHandler);
        },

        search() {
            if (/^[0-9]+$/.test(this.price) === false) {
                this.alertDanger('Please enter number');
            }else if (this.price <= 0) {
                this.alertDanger('Please input positive integer');
            }else{
                this.fetchFlights({
                    page : 1,
                    price: this.price
                });
            }
        },

        loadMore() {
            if (/^[0-9]+$/.test(this.price) === false) {
                this.alertDanger('Please enter number');
            }else if (this.price <= 0) {
                this.alertDanger('Please input positive integer');
            }else{
                this.fetchFlights({
                    page : this.pagination.current_page + 1,
                    price: this.price
                });
            }
        }
    }
}
</script>

<style>
.vertical-center {
    min-height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.full-width {
    width: 100%;
}
</style>
