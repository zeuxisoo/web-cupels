<?php
namespace App\Api\Version1\Controllers;

use JWTFactory;
use JWTAuth;
use Illuminate\Http\Request;
use App\Api\Version1\Bases\ApiController;
use App\Api\Version1\Transformers\AuthTokenTransformer;

class AuthController extends ApiController {

    public function sign(Request $request) {
        $uuid = uniqid();
        $ip   = $request->ip();

        $payload = JWTFactory::sub($uuid)->aud($ip)->make();
        $token   = JWTAuth::encode($payload)->get();

        $request->session()->put('auth', [
            'token' => $token,
            'uuid'  => $uuid,
            'ip'    => $ip
        ]);

        return $this->response->array(['token' => $token]);
    }

}
