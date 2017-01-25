# Simple-Animation-Timeline
No frills, just a simple zoomable timeline that can be added into a bootstrap template that you can tie other things into.

You can see the demo here: https://ajhalls.github.io/Simple-Animation-Timeline/index.html

I made this because the other libraries I could find were extremely complex (~35,000 lines) and 
were much more full featured than I could integrate. I wanted to tie it in with database functions and have
it be just a small part of my application rather than the whole application.

The best alternatives I could find were:

http://jeremyckahn.github.io/mantra/
http://jeremyckahn.github.io/rekapi-timeline/
https://github.com/vorg/timeline.js
https://github.com/legomushroom/mojs-timeline-editor

The downside was some were dependant on node / grunt / require.js and were difficult to tie into to 
add functions / events. The end product for me will end up with full Greensock TweenMax integration, 
but this should be a decent starting place if you want to do something different.

Zoom by using mouse scroll wheel while over the timeline.
