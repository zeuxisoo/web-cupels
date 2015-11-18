<?php
namespace App\Api\Version1\Requests;

use Illuminate\Contracts\Validation\Validator;
use App\Api\Version1\Bases\ApiRequest;

class FlightRequest extends ApiRequest {

    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'price' => 'required|integer|min:100',
        ];
    }

    public function messages() {
        return [];
    }

}
