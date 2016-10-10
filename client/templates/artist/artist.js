Template.artist.helpers({
  artist: function() {
    var str = Router.current().params.slug;
    str = str.replace(/-/g, ' ');
    return str;
  },
  songs: function() {
    return Songs.find({slug: Router.current().params.slug}, {sort: {title: 1}});
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
