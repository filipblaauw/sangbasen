Template.header.events({
  'click .ui.dropdown': function() {
    $('.ui.dropdown').dropdown();
  }
});

Template.header.onRendered(function (){
  this.$('.ui.dropdown').dropdown();
});
