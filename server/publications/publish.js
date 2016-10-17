Meteor.publish('songs', function () {
  return Songs.find();
});
Meteor.publish("roles", function (){
  return Meteor.roles.find({});
});
Meteor.publish( 'users', function() {
  let isAdmin = Roles.userIsInRole( this.userId, 'admin' );

  if ( isAdmin ) {
    return Meteor.users.find();
  } else {
    return null;
  }
});
