upvote = function(currentSong){
  var user = Meteor.user();
  if(!user){
    Bert.alert( alertNotLoggedIn(), 'info', 'fixed-top' );
    return false;
  }
  if (currentSong) {
    if (currentSong.voters.includes(Meteor.userId())) {
      Bert.alert( 'alertAlreadyLiked()', 'info', 'fixed-top' );
      return false;
    }
    Songs.update(currentSong._id, {$addToSet: {voters: Meteor.userId()}, $inc: {likes: 1}});
  }
};

downvote = function(currentSong){
  var user = Meteor.user();
  if(!user){
    Bert.alert( 'alertCannotRemoveFav()', 'info', 'fixed-top' );
    return false;
  }
  if (currentSong) {
    if (currentSong.voters.includes(Meteor.userId()))
    Songs.update(currentSong._id, {$pull: {voters: Meteor.userId()}, $inc: {likes: -1}});
  }
};
