(function() {

  return {
    events: {
      'app.created':'onAppCreated',
      'click .segment':'trackClick' // example: this event says to track the click (with a named function below) when the user clicks an element with class "segment"
    },
    requests: {
      // segment requests
      identify: function(user) {
        return this.segment.identifyReq(user);
      },
      group: function(group) {
        return this.segment.groupReq(group);
      },
      track: function(event) {
        return this.segment.trackReq(event);
      },
      // end segment requests
    },
    onAppCreated: function() {
      // this includes and then instantiates the segment module so it can be accessed with this.segment and still gets the global context
      var Segment = require('segment/segment.js');
      this.segment = new Segment(this);

      // this.segment.identifyAndGroup() generates a unique ID for the current user (subdomain+zd_user_id), and associates the user with a group identified by subdomain
      // it also records some associated metadata defined in segment.js. 
      // Users: name, email, id, subdomain, locale
      // Groups: subdomain (as ID), Zendesk Plan Name (this groups your users by Zendesk subdomain)
      this.segment.identifyAndGroup();
    },
    trackClick: function(e) {
      e.preventDefault(); // optional: this prevents links & buttons from performing their default actions (don't use if you actually want a link to work normally)
      var elementId = e.currentTarget.id; // optional: this captures the ID of the clicked element to pass it into the event (next line).
      this.segment.track('Clicked tracked element', {'currentTarget':elementId, 'key2':'value2'}); // this.segment.track() takes two arguments: 1. a string for the name of the event 2. an object of "properties" that can store anything
    }
  };

}());
