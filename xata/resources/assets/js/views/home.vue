<template>
    <div id="home">
        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-heading">Search</div>
                    <div class="panel-body">
                        <div class="form-inline">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">$</div>
                                    <input type="text" name="price" class="form-control" placeholder="1230">
                                    <div class="input-group-addon">.00</div>
                                </div>
                            </div>
                            <button class="btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <label class="label label-info">HKD</label>
                        <i class="glyphicon glyphicon-arrow-right"></i>
                        <label class="label label-primary">TPE</label>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-12 col-md-2 text-center">
                                <div class="row">成人票價</div>
                                <div class="row vertical-center">
                                    <strong>1,240</strong>
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-10">
                                <div class="row">
                                    <div class="col-xs-6 col-md-4">航空公司</div>
                                    <div class="col-xs-6 col-md-2 text-right">HX</div>
                                    <div class="col-xs-6 col-md-4">客艙類別</div>
                                    <div class="col-xs-6 col-md-2 text-right">3</div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-md-4">停留天數 最短</div>
                                    <div class="col-xs-6 col-md-2 text-right">1,240</div>
                                    <div class="col-xs-6 col-md-4">停留天數 最長</div>
                                    <div class="col-xs-6 col-md-2 text-right">HX</div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-md-4">行程有效期 由</div>
                                    <div class="col-xs-6 col-md-2 text-right">3</div>
                                    <div class="col-xs-6 col-md-4">行程有效期 至</div>
                                    <div class="col-xs-6 col-md-2 text-right">1,240</div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 col-md-4">出票期限 由</div>
                                    <div class="col-xs-6 col-md-2 text-right">HX</div>
                                    <div class="col-xs-6 col-md-4">出票期限 至</div>
                                    <div class="col-xs-6 col-md-2 text-right">3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <button class="btn btn-default pull-left">Previous</button>
                <button class="btn btn-default pull-right">Next</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.vertical-center {
    min-height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
