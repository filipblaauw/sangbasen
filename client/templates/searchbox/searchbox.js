Template.searchBox.helpers({
  inputAttributes: function () {
    placeholder = function() {
      return "Søk etter sang, artist, sjanger";
    }
    return { 'class': 'form-control input-lg', 'placeholder': placeholder };
  },
  songsIndex: () => SongsIndex

});

Template.searchBox.events({
  'click #sortTitle': (e) => {
    SongsIndex
      .getComponentMethods()
      .addProps('sortBy', 'title')
    ;
    $('th').removeClass('selected');
    $('#sortTitle').addClass('selected');
  },
  'click #sortArtist': (e) => {
    SongsIndex
      .getComponentMethods()
      .addProps('sortBy', 'artist')
    ;
    $('th').removeClass('selected');
    $('#sortArtist').addClass('selected');
  },
  'click #sortGenre': (e) => {
    SongsIndex
      .getComponentMethods()
      .addProps('sortBy', 'genre')
    ;
    $('th').removeClass('selected');
    $('#sortGenre').addClass('selected');
  },
  'click #sortKey': (e) => {
    SongsIndex
      .getComponentMethods()
      .addProps('sortBy', 'key')
    ;
    $('th').removeClass('selected');
    $('#sortKey').addClass('selected');
  },
  'click .clickable-row': function(e){
    window.document.location = ('sang/'+this.slug+'/'+this.slug2);
   }
});
