Template.users.onCreated( () => {
  Template.instance().subscribe( 'users' );
});

Template.users.events({
  'click .delete': function() {
    var self = this;
    swal({
      title: "Vil du slette denne brukeren?",
      text: "Du kan ikke angre etterpå...",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Ja, slett bruker",
      cancelButtonText: "Nei, avbryt",
      closeOnConfirm: true,
      closeOnCancel: false
    },
    function(isConfirm) {
      if (isConfirm) {
        Meteor.users.remove({ _id: self._id }, function (error, result) {
          if (error) {
            console.log("Error removing user: ", error);
          } else {
            console.log("Number of users removed: " + result);
          }
        })
        Bert.alert('Brukeren ble slettet!', 'info', 'growl-bottom-right');
      } else {
          swal("Avbrutt", "Ingenting ble slettet!", "error");
      }
    });
  }
});

Template.users.helpers({
  users: function() {
    var users = Meteor.users.find();

    if ( users ) {
      return users;
    }
  },
  createdAt: function() {
    return moment(this.createdAt).format("LLL");
  }
});
