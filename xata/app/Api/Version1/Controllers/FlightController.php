<?php
namespace App\Api\Version1\Controllers;

use App\Api\Version1\Bases\ApiController;
use App\Api\Version1\Repositories\FlightRepository;
use App\Api\Version1\Transformers\FlightTransformer;
use App\Api\Version1\Requests\FlightRequest;

class FlightController extends ApiController {

    protected $flightRepository;

    public function __construct(FlightRepository $flightRepository) {
        $this->flightRepository = $flightRepository;
    }

    public function all(FlightRequest $request) {
        $input   = $request->all();
        $flights = $this->flightRepository->allFlightByPrice($input);

        return $this->response->paginator($flights, new FlightTransformer);
    }

}
