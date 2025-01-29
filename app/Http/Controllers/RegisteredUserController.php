<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view("auth.register");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $userAttr= $request->validate([
            "name"=>"required",
            "email"=>"required|email|unique:users,email",
            "password"=>["required","confirmed",Password::min(4)],
        ]);
        $emloyerAttr=$request->validate([
            "employer"=>"required",
            "logo"=>["required",File::types(["png","jpg","webp"])]
        ]);
      $logoPath=$request->logo->store("logos");
      dd($logoPath);
    $user=User::create($userAttr);
    $user->employer()->create([
        "name"=>$emloyerAttr["employer"],
        "logo"=>$logoPath

    ]);
    Auth::login($user);
return redirect('/');


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
