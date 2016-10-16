Template.Song.events({
  'click .deleteSong': function(){
    $('.modal-backdrop').hide();
    Bert.alert('Sangen ble slettet!', 'info', 'growl-bottom-right');
    Router.go('Home');
  },
  'click #printChords': function () {
    window.print();
  },
  'click #chordproButton': function () {
    $('#chordpro').modal('show');
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

  // Generate .chordpro file for download
  function downloadInnerHtml(filename, elId, mimeType) {
    var data = Songs.findOne({slug: Router.current().params.slug, slug2: Router.current().params.slug2});
    var elHtml = '{title: '+data.title + '}\n' + '{artist: '+data.artist + '}\n' + '{key: '+data.key + '}\n' + '{bpm: '+data.bpm + '}\n' + '{time: '+data.time + '}\n\n' + data.chords;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
  }

  var fileName =  this.data.title + '.chordpro';

  $('#download-chordpro').click(function(){
      downloadInnerHtml(fileName, 'test','text/plain');
  });


  // Create a Dropbox button

  if (window.Dropbox) {
    
  } else {
    $.getScript("https://www.dropbox.com/static/api/2/dropins.js",function(){
      Dropbox.init({ appKey: 'p5b0bu8fra0q7vf' });
    });
  }

  $('.button').popup();

  // Only do chordpro parsing if song container has content
  if ($('#song-container').length){
    // Set active button based on original key
    $(".pagination").find("[data-key='" + this.data.key + "']").addClass("active");

    // Find chords and key from loaded song
    var data = this.data.chords;
    var key = this.data.key;

    // Initial parsing of chords
    var $song = $(chordpro.parse(data).render());
    $('#song-container').append($song);
    $song.find('td > span.song-text-segment').each(function (i) {
    	var textWidth = $(this).width();
    	var chordWidth = $(this).parent().width();
    	var nextSpan = $song.find('td > span.song-text-segment')[i + 1];
        // Check next text is on the same row
        if (nextSpan && $(nextSpan).parent().parent()[0] === $(this).parent().parent()[0]) {
            // The next text is on the same row
            var thisText = $(this).html();
            var nextText = $(nextSpan).html();
            var stretched = thisText.trim().length > 0 && textWidth < chordWidth;
            var splitWord = thisText.indexOf('&nbsp;') <= 0 && nextText.indexOf('&nbsp;') !== 0;
            // If this column has been stretched by the chord,
            // and the text does not end with a space
            // and next text does not start with a space
            // then insert a hyphen.
            if (stretched && splitWord) {
                $(this).append('&nbsp;-&nbsp;');
            }
        }
    });

    // Transposing from button click
    $(".transpose").click(function () {

      // Change active state on clicked button
      $(".transpose").removeClass("active");
      $(this).addClass('active');


      // Load data from current route
      var data = Songs.findOne({slug: Router.current().params.slug, slug2: Router.current().params.slug2});
      var chords = data.chords;
      var key = $(this).attr('data-key');
      var $song = $(chordpro.parse(chords).render(key));

      // Re-run the parsing
      $('#song-container').html($song);
      $song.find('td > span.song-text-segment').each(function (i) {
      	var textWidth = $(this).width();
      	var chordWidth = $(this).parent().width();
      	var nextSpan = $song.find('td > span.song-text-segment')[i + 1];
          // Check next text is on the same row
          if (nextSpan && $(nextSpan).parent().parent()[0] === $(this).parent().parent()[0]) {
              // The next text is on the same row
              var thisText = $(this).html();
              var nextText = $(nextSpan).html();
              var stretched = thisText.trim().length > 0 && textWidth < chordWidth;
              var splitWord = thisText.indexOf('&nbsp;') <= 0 && nextText.indexOf('&nbsp;') !== 0;
              // If this column has been stretched by the chord,
              // and the text does not end with a space
              // and next text does not start with a space
              // then insert a hyphen.
              if (stretched && splitWord) {
                  $(this).append('&nbsp;-&nbsp;');
              }
          }
      });
      $('#key').html(key);

    });
  }


});
