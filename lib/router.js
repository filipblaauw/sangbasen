Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
	name: 'Home',
	template: 'songList',
	waitOn: function() {
    if (Meteor.userId())
      return Meteor.subscribe('songs');
  }
});

Router.route('/ny', {
	name: 'add',
	template: 'insertSongForm',
	waitOn: function() {
    if (Meteor.userId())
      return Meteor.subscribe('songs');
  }

});

Router.route('/sang/:slug/:slug2', {
  name: 'Song',
	template: 'Song',
	//controller: 'songsController',

	waitOn: function() {
    if (Meteor.userId())
      return Meteor.subscribe('songs');
  },
	data: function() {
    return Songs.findOne({
      slug: this.params.slug,
      slug2: this.params.slug2
    });
  },
	seo: {
    title: function(){
      var artist = Songs.findOne({slug: this.params.slug}).artist;
          title = Songs.findOne({slug: this.params.slug}).title;
      return artist + ' - ' + title;
    },
    og: {
      site_name: function(){
        var artist = Songs.findOne({slug: this.params.slug}).artist;
            title = Songs.findOne({slug: this.params.slug}).title;
        return artist + ' - ' + title;
      },
      image: function(){
        //var image = Songs.findOne({slug: this.params.slug}).file;
        return 'http://sangbasen.blaauw.me/sangbasen.png';
      },
      title: function(){
        var artist = Songs.findOne({slug: this.params.slug}).artist;
            title = Songs.findOne({slug: this.params.slug}).title;
        return artist + ' - ' + title;
      }
    }
  }
});

Router.route('/endre/:slug/:slug2', {
  name: 'editSong',
	template: 'editSong',
	controller: 'songsController',
	waitOn: function() {
    if (Meteor.userId())
      return Meteor.subscribe('songs');
  },
	data: function() {
    return Songs.findOne({
      slug: this.params.slug,
      slug2: this.params.slug2
    });
  },
	seo: {
    title: function(){
      var artist = Songs.findOne({slug: this.params.slug}).artist;
          title = Songs.findOne({slug: this.params.slug}).title;
      return 'Endre ' + artist + ' - ' + title;
    }
	}
});

Router.route('/artist/:slug', {
  name: 'artist',
	template: 'artist',
	//controller: 'songsController',
	waitOn: function() {
    if (Meteor.userId())
      return Meteor.subscribe('songs', this.params.slug);
  },
	data: function() {
    return Songs.find({
      slug: this.params.slug
    });
  }
});

Router.route('/favoritter', {
  name: 'favorites',
	template: 'favorites',
	//controller: 'songsController',
	waitOn: function() {
    if (Meteor.userId())
      return Meteor.subscribe('songs');
  },
	data: function() {
    return Songs.find({});
  }
});

Router.route('/hjelp', {
  name: 'Help',
	template: 'Help'
});

Router.route('/users', {
  name: 'users',
	template: 'users',
	waitOn: function () {
    return [ Meteor.subscribe("roles") ];
  },
  onBeforeAction: function () {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin']))
      Router.go('/');
    else
      this.next();
  }
});

Router.route('/sign-out', {
  name: 'signOut',
  onBeforeAction: function () {
    AccountsTemplates.logout();
    this.redirect('/');
  }
});

Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    this.render('Welcome');
  } else
  {
    this.next();
  }
}, {only: ['Song', 'editSong', 'add', 'artist']});

AccountsTemplates.configureRoute('signIn', {
  name: 'atSignIn',
  path: '/logg-inn',
  layoutTemplate: 'layout'
});
AccountsTemplates.configureRoute('signUp', {
  name: 'atSignUp',
  path: '/registrer',
  layoutTemplate: 'layout'
});
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'atForgotPwd',
  path: '/glemt-passord',
  layoutTemplate: 'layout'
});
AccountsTemplates.configureRoute('changePwd', {
  name: 'atChangePwd',
  path: '/endre-passord',
  layoutTemplate: 'layout'
});
