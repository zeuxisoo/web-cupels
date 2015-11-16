<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$api = app('Dingo\Api\Routing\Router');

Route::get('/', function () {
    return view('index');
});

$api->version('v1', function($api) {
    $api->group(['namespace' => 'App\Api\Version1\Controllers', 'prefix' => 'auth'], function($api) {
        $api->get('sign', ['as' => 'api.auth.sign', 'uses' => 'AuthController@sign']);
    });

    $api->group(['namespace' => 'App\Api\Version1\Controllers', 'prefix' => 'flight', 'middleware' => 'api.auth'], function ($api) {
        $api->get('all', ['as' => 'api.flight.all', 'uses' => 'FlightController@all']);
    });
});
