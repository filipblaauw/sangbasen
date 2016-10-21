var uploader = new ReactiveVar();

Template.editSong.helpers({
  progress: function () {
    var upload = uploader.get();
    if (upload)
      return Math.round(upload.progress() * 100);
  },
  songs: function() {
    return Songs.find();
  },
  id: function() {
    return this._id;
  },

  isOwner: function() {
    if (this.userName === Meteor.user().profile.name)
      return true;
    else
      return false;
  }
});

Template.editSong.events({
  'change #file-file': function(event, template) {
    event.preventDefault();
    $('.dimmer').addClass('active');
    var upload = new Slingshot.Upload("myFileUploads");

    upload.send(document.getElementById('file-file').files[0], function (error, downloadUrl) {
    uploader.set();
    if (error) {
      console.error('Error uploading');
      alert (error);
    }
    else{
      console.log("Success!");
      console.log('uploaded file available here: '+downloadUrl);
      $('.dimmer').removeClass('active');
      $('.file-upload-clear').html('<i class="fa fa-times"></i> Slett');
    }
    });
    uploader.set(upload);
  },
  'change #file-track': function(event, template) {
    event.preventDefault();
    $('.dimmer').addClass('active');
    var upload = new Slingshot.Upload("myTrackUploads");

    upload.send(document.getElementById('file-track').files[0], function (error, downloadUrl) {
    uploader.set();
    if (error) {
      console.error('Error uploading');
      alert (error);
    }
    else{
      console.log("Success!");
      console.log('uploaded file available here: '+downloadUrl);
      $('input[name=track]').val(downloadUrl);
      $('.playbackUrl').removeClass('hidden');
      $('.dimmer').removeClass('active');
      $('.file-upload-clear').html('<i class="fa fa-times"></i> Slett');
    }
    });
    uploader.set(upload);
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

Template.editSong.onRendered(function () {
  $('.hjelp').popup({
    popup : $('.hjelpetekst.popup'),
    on    : 'click'
  });
  $('label[for="file-file"]').html('Velg fil<input class="hidden" id="file-file" file-input="file" type="file" accept="*">');
});

// If chords in song is H, convert to B in form
var postHooks = {
  docToForm: function(doc) {
    if (typeof doc.chords === "string") {
      doc.chords = doc.chords.replace(/\[H(.*?)\]/gi, '[B$1]');
    }
    return doc;
  },
  onSuccess: function(operation, result, template) {
    Bert.alert('Sangen ble oppdatert!', 'success', 'growl-bottom-right');
    var song = this.currentDoc;
    var newSong = Songs.findOne({_id: song._id});
    Router.go('Song', {slug: newSong.slug, slug2: newSong.slug2});
  }
}

AutoForm.addHooks('editSongForm', postHooks);
