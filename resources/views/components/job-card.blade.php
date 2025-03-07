  @props(['job'])
   
   <x-panel class="flex flex-col text-center">
        <div class="self-start text-sm">{{$job->employer->name}}</div>
        <div class="py-8">
            <h3 class="group-hover:text-blue-800 text-xl transition-colors duration-100">
                <a href="{{$job->url}}" target="_blank">
                {{$job->title}}

                </a>
            </h3>
            <p class="text-sm mt-4">{{$job->salary}}</p>
        </div>
        <div class="flex justify-between items-start mt-auto">
            <div>
                @foreach ($job->tags as $tag)
                <x-tag  size='small' :$tag/>
                    
                @endforeach
            </div>
            
            <x-employer-logo :employerLogo="$job->employer->logo" width={{42}}/>
        </div>

    </x-panel>