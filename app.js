(function() {

  return {
    events: {
      'app.created':'onAppCreated',
      'click .segment':'trackClick'
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
      var Segment = require('segment/segment.js');
      this.segment = new Segment(this);
      this.segment.identifyAndGroup();
    },
    trackClick: function(e) {
      e.preventDefault();
      var elementId = e.currentTarget.id;
      this.segment.track('Clicked tracked element', {'currentTarget':elementId, 'key2':'value2'});
    }
  };

}());
