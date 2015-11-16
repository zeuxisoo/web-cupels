<?php
namespace App\Api\Version1\Providers;

use Exception;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Route;
use Dingo\Api\Auth\Provider\Authorization;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class JWTWithoutUserProvider extends Authorization {

    public function authenticate(Request $request, Route $route) {
        $token = $this->getToken($request);
        $auth  = $request->session()->get('auth');

        if ($token !== $auth['token']) {
            throw new UnauthorizedHttpException('JWTAuth', 'Unable to authenticate with invalid token.');
        }

        return $auth;
    }

    protected function getToken(Request $request) {
        try {
            $this->validateAuthorizationHeader($request);
            $token = $this->parseAuthorizationHeader($request);
        }catch (Exception $exception){
            if ($token = $request->query('token', false) === false) {
                throw $exception;
            }
        }

        return $token;
    }

    protected function parseAuthorizationHeader(Request $request) {
        return trim(str_ireplace($this->getAuthorizationMethod(), '', $request->header('authorization')));
    }

    public function getAuthorizationMethod() {
        return 'bearer';
    }

}
