Meteor.startup(function () {
    smtp = {
      username: 'g_panwar@ymail.com',   // eg: server@gentlenode.com
      password: '22sep.1994',   // eg: 3eeP1gtizk5eziohfervU
      server:   'smtp.ymail.com',  // eg: mail.gandi.net
      port: 587
    }
  
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
    Accounts.urls.resetPassword = function(token) {
      return Meteor.absoluteUrl('resetpassword/' + token);
    }
  });