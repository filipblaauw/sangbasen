var uploader = new ReactiveVar();

Template.insertSongForm.helpers({
  progress: function () {
    var upload = uploader.get();
    if (upload)
      return Math.round(upload.progress() * 100);
  }
});

Template.insertSongForm.events({
  'click .hjelp': function(){
    $('.hjelpetekst').slideToggle(300, function() {
    // Animation complete.
    });
  },
  'change #file-file': function(event, template) {
    event.preventDefault();
    $('.progress').removeClass('hidden');
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
      $('.progress').addClass('hidden');
      $('.file-upload-clear').html('<i class="fa fa-times"></i> Slett');
    }
    });
    uploader.set(upload);
  },
  'change #file-track': function(event, template) {
    event.preventDefault();
    $('.progress').removeClass('hidden');
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
      $('.progress').addClass('hidden');
      $('.file-upload-clear').html('<i class="fa fa-times"></i> Slett');
    }
    });
    uploader.set(upload);
  }
});

Template.insertSongForm.onRendered(function() {
  $('.hjelpetekst').hide();
  $('label[for="file-file"]').html('Velg fil<input class="hidden" id="file-file" file-input="file" type="file" accept="*">');
  $('label[for="file-track"]').html('Velg fil<input class="hidden" id="file-track" file-input="file" type="file" accept="*">');
});

AutoForm.addHooks(['insertSongForm'], {
  onSuccess: function(operation, result, template) {
    Bert.alert('Sangen ble lagt til!', 'success', 'growl-bottom-right');
    Router.go('Home');
  }
});
