<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    public function module(){ // question belongs to one module
        return $this->belongsTo(Module::class);
    }
}
