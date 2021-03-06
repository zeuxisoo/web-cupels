<?php
namespace App\Api\Version1\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Flight;

class FlightTransformer extends TransformerAbstract {

    public function transform(Flight $flight) {
        return [
            'departure_port'             => $flight->departure_port,
            'arrival_port'               => $flight->arrival_port,
            'company_code'               => $flight->company_code,
            'cabin'                      => $flight->cabin,
            'ticket_price'               => number_format($flight->ticket_price, 2, '.', ','),
            'stay_day_min'               => $flight->stay_day_min,
            'stay_day_max'               => $flight->stay_day_max,
            'valid_date_from'            => $flight->valid_date_from->toDateString(),
            'valid_date_to'              => $flight->valid_date_to->toDateString(),
            'valid_buy_ticket_date_from' => $flight->valid_buy_ticket_date_from->toDateString(),
            'valid_buy_ticket_date_to'   => $flight->valid_buy_ticket_date_to->toDateString(),
        ];
    }

}
