<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pixel Positions</title>
    @vite(["resources/js/app.js","resources/css/app.css"])
   <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">

</head>
<body class="bg-black text-white font-hanken-grotesk pb-20">
    <div class="px-10">
    <nav class="flex justify-between items-center py-4 border-b border-white/10">
     <div class="bg-red">
        <a class="" href="">
            <img src="{{Vite::asset('resources/images/logo.svg')}}" alt="logo"/>
        </a>
     </div>
     <div class="space-x-6 font-bold">
        <a href="#">Jobs</a>
        <a href="#">Careers</a>
        <a href="#">Salaries</a>
        <a href="#">Companies</a>
     </div>
     @auth
         <div class="space-x-6 font-bold flex">
       <a href="/jobs/create">post a job</a>
       <form action="/logout" method="POST">
        @method("delete")
        @csrf
        <button type="submit">logout</button>
    </form>
     </div>  
     @endauth
     @guest
             <div class="space-x-6 font-bold">
        <a href="/register">Sign Up</a>
        <a href="/login">Login In</a>
       
     </div>
     @endguest
   
    </nav>
    <main class="mt-10 m-auto max-w-[968px]">
        {{$slot}}
    </main>
    </div>
</body>
</html>