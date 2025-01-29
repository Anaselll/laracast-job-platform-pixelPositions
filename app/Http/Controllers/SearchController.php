<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $req)
    {
       $jobs= Job::query()
       ->with(["employer","tags"])->where("title","LIKE","%".request("q")."%")->get();
       return view("results",compact("jobs"));

    }
}
