<?php
namespace App\Api\Version1\Repositories;

use Carbon\Carbon;
use App\Api\Version1\Bases\ApiRepository;
use App\Models\Flight;

class FlightRepository extends ApiRepository {

    public function __construct(Flight $flight) {
        $this->flight = $flight;
    }

    public function allFlightByPrice($input) {
        return $this->flight
                ->where('ticket_price', '>=', $input['price'])
                ->betweenValidBuyTicketDate(Carbon::now())
                ->groupBy('flight_info_link_cond_code')
                ->orderBy('ticket_price', 'asc')
                ->paginate();
    }

}
