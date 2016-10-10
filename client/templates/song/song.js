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
    Bert.alert('Lagt til i favoritter', 'success', 'growl-bottom-right');
  },
  "click [data-action='removeLikes']": function (event) {
    event.preventDefault();
    var song = Songs.findOne({_id: this._id});
    downvote(song);
    Bert.alert('Fjernet fra favoritter', 'info', 'growl-bottom-right');
  },
  'click .deleteSong': function(){
    var self = this;
    swal({
      title: "Vil du slette sangen?",
      text: "Du kan ikke angre etterpå...",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Ja, slett den",
      cancelButtonText: "Nei, avbryt",
      closeOnConfirm: true,
      closeOnCancel: false
    },
    function(isConfirm) {
      if (isConfirm) {
        Router.go('Home');
        Songs.remove(self._id);
        Bert.alert('Sangen ble slettet!', 'info', 'growl-bottom-right');
      } else {
          swal("Avbrutt", "Ingenting ble slettet!", "error");
      }
    });
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
  },
  created: function() {
    return moment(this.createdAt).format("DD. MMM YYYY");
  },
  updated: function() {
    return moment(this.updatedAt).fromNow();
  }
});

Template.Song.onRendered(function() {
  $("pre").transpose();
  $('.button').popup();
});
