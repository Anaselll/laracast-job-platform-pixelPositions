  @props(['job'])
  <x-panel class="flex gap-x-6" >
    <div>
         <x-employer-logo :employerLogo="$job->employer->logo"/>
    </div >
        <div class='flex-1 flex flex-col ml-5'>
            <a  href="#" class="self-start text-sm text-gray-600">{{$job->employer->name}}</a>
            <h3 class="font-bold text-xl mt-3 group-hover:text-blue-800 transition-colors duration-100">
                <a href="{{$job->url}}" target="_blank">
                {{$job->title}}

                </a>
            </h3>
            <p class="tect-sm text-gray-400 mt-auto">{{$job->salary}}</p>
        </div>
            <div>
                @foreach ($job->tags as $tag)
                <x-tag  :$tag/>
                    
                @endforeach
             
            </div>

        </x-panel>