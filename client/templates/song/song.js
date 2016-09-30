Template.Song.events({
  'click .deleteSong': function(){
    $('.modal-backdrop').hide();
    Bert.alert('Sangen ble slettet!', 'info', 'growl-bottom-right');
    Router.go('Home');
  },
  'click #printChords': function () {
    window.print();
  },
  "click [data-action='addLikes']": function (event) {
    event.preventDefault();
    var song = Songs.findOne({_id: this._id});
    upvote(song);
  },
  "click [data-action='removeLikes']": function (event) {
    event.preventDefault();
    var song = Songs.findOne({_id: this._id});
    downvote(song);
  }
});

Template.Song.helpers({
  songs: function() {
    return Songs.find();
  },
  id: function() {
    return this._id;
  },
  favorites: function() {
    var user = Meteor.user()._id;
    return Songs.findOne({_id: this._id, voters: user});
  },
  file: function() {
    return this.file;
  },
  pdf: function() {
    var filePath = this.file;
    var ext =  filePath.split('.').pop();
    if (ext === 'pdf')
      return true;
  },
  jpg: function() {
    var filePath = this.file;
    var ext =  filePath.split('.').pop();
    if (ext === 'jpg')
      return true;
  },

  isOwner: function() {
    if (this.userName === Meteor.user().profile.name)
      return true;
    else
      return false;
  }
});

Template.Song.onRendered(function() {
  $(function() {
    $("pre").transpose();
  });
  $('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
  });
});
