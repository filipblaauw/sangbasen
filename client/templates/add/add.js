var uploader = new ReactiveVar();

Template.insertSongForm.helpers({
  progress: function () {
    var upload = uploader.get();
    if (upload)
      return Math.round(upload.progress() * 100);
    }
});

Template.insertSongForm.events({

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
      $('.playbackUrl').removeClass('hideMe');
      $('.dimmer').removeClass('active');
      $('.file-upload-clear').html('<i class="fa fa-times"></i> Slett');
    }
    });
    uploader.set(upload);
  }
});

Template.insertSongForm.onRendered(function() {
  $('.hjelp').popup({
    popup : $('.hjelpetekst.popup'),
    on    : 'click'
  });
  $('label[for="file-file"]').html('<div class="ui button">Velg fil</div><input class="hideMe" id="file-file" file-input="file" type="file" accept="*">');
  $('label[for="uploadFile"]').html('Velg fil<input class="hideMe" id="file-track" file-input="file" type="file" accept="*">');
});

AutoForm.addHooks(['insertSongForm'], {
  onSuccess: function(operation, result, template) {
    Bert.alert('Sangen ble lagt til!', 'success', 'growl-bottom-right');
    Router.go('Home');
  }
});
