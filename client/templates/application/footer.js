Template.footer.helpers({
  number: function() {
    return Songs.find().count();
  },
  year: function() {
    return new Date().getFullYear();
  }
});
