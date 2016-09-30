Songs = new Mongo.Collection("songs");

SongsIndex = new EasySearch.Index({
  collection: Songs,
  fields: ['title', 'artist', 'genre', 'key'],
  defaultSearchOptions: {
    sortBy: 'title',
    limit: 25
  },
  engine: new EasySearch.MongoDB({
    sort: function (searchObject, options) {
      const sortBy = options.search.props.sortBy;

      // return a mongo sort specifier
      if ('title' === sortBy) {
        return {
          title: 1
        };
      } else if ('artist' === sortBy) {
        return {
          artist: 1
        };
      } else if ('genre' === sortBy) {
        return {
          genre: 1
        };
      } else if ('key' === sortBy) {
        return {
          key: 1
        };
      } else {
        return {
          title: 1
        }
      }
    }
  }),
});

Songs.friendlySlugs([
  {
    slugFrom: 'artist',
    slugField: 'slug',
    distinct: false,
    transliteration: [
      {from: 'æ', to: 'ae'},
      {from: 'ø', to: 'o'},
      {from: 'å', to: 'a'}
    ]
  },
  {
    slugFrom: 'title',
    slugField: 'slug2',
    transliteration: [
      {from: 'æ', to: 'ae'},
      {from: 'ø', to: 'o'},
      {from: 'å', to: 'a'}
    ]
  }
]);

Songs.attachSchema(new SimpleSchema({
  voters:{
    type: Array,
    optional: true
  },
  'voters.$':{
    type: String
  },
  likes:{
    type: Number,
    optional: true
  },
  file: {
    type: String,
    optional: true,
    label: "Last opp noter",
    autoform: {
      type: 'slingshotFileUpload',
      afFieldInput:{
        slingshotdirective: 'myFileUploads',
        class: "file"
      }
    }
  },
  track: {
    type: String,
    optional: true,
    label: "Playback URL",
    autoform: {
      class: "Venter på url..."
    }
  },
  title: {
    type: String,
    label: "Tittel *",
    max: 50
  },
  artist: {
    type: String,
    label: "Artist/komponist *",
    max: 50
  },
  spotify: {
    type: String,
    label: "Spotify-URI",
    optional: true,
    autoform: {
      placeholder: "spotify:track"
    }
  },
  genre: {
    type: String,
    label: "Sjanger *",
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "Julesang", value: 'Julesang'},
          {label: "Lovsang", value: 'Lovsang'},
          {label: "Pop/rock", value: 'Pop/rock'},
          {label: "Jazz", value: 'Jazz'},
          {label: "Andre", value: 'Andre'}
        ];
      }
    }
  },
  chords: {
    type: String,
    label: "Akkordskjema",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "textarea",
        placeholder: "Eks:\nEm           C                      G\nWhat would I do without your smart mouth\n           D                      Em\nDrawing me in, and you kicking me out",
        class: "chords",
        rows: 30
      }
    }
  },
  key: {
    type: String,
    label: "Toneart *",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Ab", value: "Ab"},
          {label: "A", value: "A"},
          {label: "A#", value: "A#"},
          {label: "Bb", value: "Bb"},
          {label: "H", value: "H"},
          {label: "C", value: "C"},
          {label: "C#", value: "C#"},
          {label: "Db", value: "Db"},
          {label: "D", value: "D"},
          {label: "D#", value: "D#"},
          {label: "Eb", value: "Eb"},
          {label: "E", value: "E"},
          {label: "F", value: "F"},
          {label: "F#", value: "F#"},
          {label: "Gb", value: "Gb"},
          {label: "G", value: "G"},
          {label: "G#", value: "G#"}
        ];
      }
    }
  },
  createdBy: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date();
    }
  },
  userName:{
    type: String,
    autoValue:function() {
      if (this.isInsert) {
        return Meteor.users.findOne({_id: this.userId}).profile.name;
      }
    }
  }
}));
