<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
   
    public function users(){ // many users will pass this module
        return $this->belongsToMany(User::class);
    }
    public function questions(){ // many questions will be in this module
        return $this->hasMany(Question::class);
    }
}
