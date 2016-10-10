Template.songList.helpers({
  number: function() {
    return Songs.find().count();
  },
  favorites: function() {
    var user = Meteor.user()._id;
    return Songs.find({voters: user});
  },
  mostLiked: function() {
    return Songs.find({likes: { $gt: 0 }}, {limit: 10, sort: {likes: "desc"}});
  }
});

Template.songList.onRendered(function() {
/*
  $('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
  });
  */
});
