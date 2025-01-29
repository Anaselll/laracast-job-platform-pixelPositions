<?php

use App\Models\Employer;
use App\Models\Job;

it('belongs to an employer', function () {
//AAA
//Arrange
$emp=Employer::factory()->create();
$job=Job::factory()->create([
    "employer_id"=>$emp->id
]);

//Act and assert
expect($job->employer->is($emp))->toBeTrue();



});
it("can have tags",function(){
    //AAA
    
    $job=Job::factory()->create();
    $job->tag("Frontend");
    expect($job->tags)->toHaveCount(1);
});
