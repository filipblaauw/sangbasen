AccountsTemplates.configure({
  //overrideLoginErrors: true,
  showForgotPasswordLink: true,
  enablePasswordChange: true,
  sendVerificationEmail: false,
  confirmPassword: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: false
});

AccountsTemplates.addField({
  _id: 'name',
  type: 'text',
  displayName: "Brukernavn",
  required: true,
  placeholder: {
    signUp: "Vennligst oppgi brukernavn/kallenavn"
  }
});

Meteor.startup(function () {
  
  /*
  var emailCol = AdminTables.Users.options.columns[1];
  emailCol.render = function(value){
    return value && value[0] ? value[0].address : 'no email';
  }
  */
});

T9n.setLanguage("no_NB");
/*
AdminConfig = {
  name: 'Sangbasen',
  adminEmails: ['filipbl@gmail.com'],
  collections: {
    Songs: {
      tableColumns: [
        {label: 'Tittel', name: 'title'},
        {label: 'Artist', name: 'artist'},
        {label: 'Sjanger', name: 'genre'},
        {label: 'Toneart', name: 'key'},
        {label: 'Lagt til', name: 'createdAt'},
        {label: 'Av', name: 'userName'}
      ]
    }
  },
  autoForm: {
    omitFields: ['createdAt', 'updatedAt']
  }
};
*/
