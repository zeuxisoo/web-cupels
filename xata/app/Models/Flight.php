<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Flight extends Model {

    protected $table = 'flight';

    protected $fillable = [
        'departure_port', 'arrival_port',
        'company_code', 'cabin', 'ticket_price', 'stay_day_min', 'stay_day_max',
        'valid_date_from', 'valid_date_to',
        'valid_buy_ticket_date_from', 'valid_buy_ticket_date_to',
        'flight_info_link', 'flight_info_link_cond_code'
    ];

}
