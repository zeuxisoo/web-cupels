<?php
namespace App\Api\Version1\Controllers;

use App\Api\Version1\Bases\ApiController;
use App\Api\Version1\Repositories\FlightRepository;
use App\Api\Version1\Transformers\FlightTransformer;

class FlightController extends ApiController {

    protected $flightRepository;

    public function __construct(FlightRepository $flightRepository) {
        $this->flightRepository = $flightRepository;
    }

    public function all() {
        $flights = $this->flightRepository->all();

        return $this->response->paginator($flights, new FlightTransformer);
    }

}
