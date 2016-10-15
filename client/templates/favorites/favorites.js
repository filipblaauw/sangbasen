Template.favorites.helpers({
  artist: function() {
    var str = Router.current().params.slug;
    str = str.replace(/-/g, ' ');
    return str;
  },
  songs: function() {
    var user = Meteor.user()._id;
    return Songs.find({voters: user}, {sort: {createdAt: -1}});
    //return Songs.find({slug: Router.current().params.slug}, {sort: {title: 1}});
  },
  id: function() {
    return this._id;
  },
  likes: function() {
    return this.likes;
  },
  created: function() {
    return moment(this.createdAt).format("DD. MMM YYYY");
  },
  updated: function() {
    return moment(this.updatedAt).fromNow();
  }
});
