Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  bucket: "songbase",
  region: "eu-west-1",
  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    fil = file.name;
    filnavn = fil.replace(/[^\w\s.]/gi, '').replace(/ /g, '_');
    year = moment(Date.now()).format('YYYY');
    month = moment(Date.now()).format('MM');
    day = moment(Date.now()).format('DD');
    return year + "/" + month + "/" + day + "/" + filnavn;
  }
});

Slingshot.createDirective("myTrackUploads", Slingshot.S3Storage, {
  bucket: "songbase",
  region: "eu-west-1",
  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    fil = file.name;
    filnavn = fil.replace(/[^\w\s.]/gi, '').replace(/ /g, '_');
    year = moment(Date.now()).format('YYYY');
    month = moment(Date.now()).format('MM');
    day = moment(Date.now()).format('DD');
    return year + "/" + month + "/" + day + "/" + filnavn;
  }
});
