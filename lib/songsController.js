songsController = RouteController.extend({
  waitOn: function() {
    //if (Meteor.userId())
      return Meteor.subscribe('songs', this.params.slug, this.params.slug2);
  },
  data: function() {
    return Songs.findOne({
      slug: this.params.slug,
      slug2: this.params.slug2
    });
  }
});
