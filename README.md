# Segment.io in Zendesk Apps

This app demonstrates, and holds the source code for, a common.js module that can easily be included in your Zendesk app to give you advanced user tracking/analytics capabilities. It integrates [Segment.io](http://segment.io) through their HTTP API, which acts as a proxy for hundreds of different tracking services including [Google Analytics](http://www.google.com/analytics/), [mixpanel](http://mixpanel.com), [trak.io](http://trak.io), [Intercom](https://www.intercom.io/) and many many more.

Please submit bug reports [in GitHub](https://github.com/jstjoe/zdapps_segment/issues). Pull requests are welcome.

## Release History

*0.1* Initial release. Includes support for identify & group methods (in one call) and the track method. Still a little disorganized.

## The following information is displayed:

A mostly-empty ticket-sidebar app. Running the app and clicking the author's name performs the following requests to Segment.io:
1. Identify user (with data from Zendesk, nothing to provide)
2. Group user into Zendesk account (with data from Zendesk, nothing to provide)
3. Track the event including a name for the event and associated properties (provided in the app.js, some data automatically included)



## What's the big idea?
The Zendesk Apps framework (for the Agent interface) disallows access to the window object. Most tracking snippets require access to the window object so cannot be used within the guidelines of the Apps framework. 

The idea is to replicate key calls provided by the Segment.io tracking snippet without touching the window object, as well as provide additional data on the user, group, and events in a Zendesk context by leveraging the framework's APIs.

With this set up you can then use Segment.io's service to pass the collected data to hundreds of different services without needing to write custom code for each. You also don't need to configure your own way to identify and group your users: I did that for you using 'subdomain+user_id' as the user ID and 'subdomain' as the group ID (you can modify this in the segment.js source).

## How to install it
This module requires a bit of configuration. As the Zendesk Apps framework matures I plan to make it much simpler.

1. Edit [segment.js](https://github.com/jstjoe/zdapps_segment/blob/master/lib/segment/segment.js#L2) to add your Segment.io WriteKey (get this from [Segment.io](http://segment.io)).
2. Edit [segment.js](https://github.com/jstjoe/zdapps_segment/blob/master/lib/segment/segment.js#L4) to configure the name of your product/app (this is defined separately from the app's title to allow more specific titles in tracking data).
3. Create a 'lib' directory, and a 'segment' directory in that, and put segment.js in lib/segment/.
4. Add [these three HTTP requests](https://github.com/jstjoe/zdapps_segment/blob/master/app.js#L9-L19) to your app.js (just like the example).
5. In your app.js, once the [app.created event](https://github.com/jstjoe/zdapps_segment/blob/master/app.js#L5) has occurred, [require segment/segment.js and instantiate the object as 'this.segment'](https://github.com/jstjoe/zdapps_segment/blob/master/app.js#L22-L23).
6. Now, whenever you want (after app.created), run `this.segment.identify()` to track the user and group them by Zendesk account.
7. Then run `this.segment.track('name of event', {'property1key':'property1value','property2key':'property2value'})` to track unique events. Pass whatever data you want as the properties and it will flow through Segment.io to the services you've connected.