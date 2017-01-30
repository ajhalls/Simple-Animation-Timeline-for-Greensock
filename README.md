# Simple-Animation-Timeline
I was working on a GUI slider builder and wanted to add some animation options using Greensock but couldn't find any good simple libraries under 30,000 lines of code. I integrating with one of those seemed like I might spend more time working on integration than I would just starting from scratch and so this was born.

I didn't spend a lot of time on styling it to make it pretty, since that will vary from site to site, but it should be pretty easy to include into any bootstrap container. It depends on Jquery and Bootstrap, along with a horizontal scroll library (mCustomScrollbar) which is included.

You can see the demo here: https://ajhalls.github.io/Simple-Animation-Timeline-for-Greensock/

The best alternatives (if you don't like mine) are:

http://jeremyckahn.github.io/mantra/
http://jeremyckahn.github.io/rekapi-timeline/
https://github.com/vorg/timeline.js
https://github.com/legomushroom/mojs-timeline-editor

The downside was some were dependant on node / grunt / require.js and were difficult to tie into to 
add functions / events. The end product for me will end up with full Greensock TweenMax integration, 
but this should be a decent starting place if you want to do something different.

There is no installation required, just unzip and pull up the index.html.

Zoom by using mouse scroll wheel while over the timeline or using the slider.

Add animations to the timeline by clicking one of the "+" buttons, wherever your scrubber is set to is where it will be inserted to. Durations and start times can be easily modified by dragging and dropping / resizing them.

At this point I need to start connecting it to the database to populate all the effects / easing and tie it into my main application which means that at least for now this is finished to a point anyone else can use it.

I realize it isn't the best starting point for beginners, BUT it is less than 400 lines of javascript as opposed to over 30,000 (and could have been shorter if I removed the example animation data). I also added the start of a right click menu on the timeline, but again, it was time to connect it to the database which makes it time to commit and move on :) 
