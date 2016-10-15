Template.searchBox.helpers({
  inputAttributes: function () {
    placeholder = function() {
      return "Sang, artist, tekst...";
    }
    return { 'class': '', 'placeholder': placeholder };
  },
  songsIndex: () => SongsIndex

});

Template.searchBox.events({
  'click #sortTitle': (e) => {
    SongsIndex
      .getComponentMethods()
      .addProps('sortBy', 'title')
    ;
    $('th').removeClass('descending');
    $('#sortTitle').addClass('descending');
  },
  'click #sortArtist': (e) => {
    SongsIndex
      .getComponentMethods()
      .addProps('sortBy', 'artist')
    ;
    $('th').removeClass('descending');
    $('#sortArtist').addClass('descending');
  },
  'click #sortGenre': (e) => {
    SongsIndex
      .getComponentMethods()
      .addProps('sortBy', 'genre')
    ;
    $('th').removeClass('descending');
    $('#sortGenre').addClass('descending');
  },
  'click #sortKey': (e) => {
    SongsIndex
      .getComponentMethods()
      .addProps('sortBy', 'key')
    ;
    $('th').removeClass('descending');
    $('#sortKey').addClass('descending');
  },
  'click .clickable-row': function(e){
    window.document.location = ('sang/'+this.slug+'/'+this.slug2);
   }
});

Template.songList.onRendered(function() {
  $('.popup').popup();
});
