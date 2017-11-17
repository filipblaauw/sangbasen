Template.songList.helpers({
  number: function() {
    return Songs.find().count();
  },
  favorites: function() {
    var user = Meteor.user()._id;
    return Songs.find({voters: user}, {limit: 10});
  },
  mostLiked: function() {
    return Songs.find({likes: { $gt: 0 }}, {limit: 10, sort: {likes: "desc"}});
  },
  latest: function() {
    return Songs.find({}, {sort: {createdAt: -1}, limit: 10});
  }
});

Template.songList.onRendered(function() {
/*
  $('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
  });
  */
});
