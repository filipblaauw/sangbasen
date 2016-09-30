Template.artist.helpers({
  artist: function() {
    var str = Router.current().params.slug;
    str = str.replace(/-/g, ' ');
    return str;
  },
  songs: function() {
    return Songs.find({slug: Router.current().params.slug});
  },
  id: function() {
    return this._id;
  }
});
