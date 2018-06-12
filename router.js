//FlowRouter.route('/imports/clients/registration.html');

// FlowRouter.route('/login', {   
//      action: function(params) {      
//            Tracker.autorun(function() {          
//                 if(!Meteor.user() && !Meteor.loggingIn()) {       
//                    FlowRouter.go('login');   
//                          }else if(Meteor.user() || Meteor.loggingIn()){
//                              FlowRouter.go('/dashboard')
//                          }      
//                           }); 
//                              }});



    

     if(Meteor.isClient){
     var login = FlowRouter.group({
        // prefix: '/login',
        triggersEnter: [function () {
         if (FlowRouter._current.path.indexOf("login") <= -1 && FlowRouter._current.path.indexOf("registrationform") <= -1
             && FlowRouter._current.path.indexOf("forgetpassword") <= -1
            && FlowRouter._current.path.indexOf("resetpassword") <= -1) {
            if (Meteor.userId() == null) {
                Meteor.logout();
                FlowRouter.go('/login/');
             }
             else if (Meteor.user() != null) {
            // if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                Meteor.logout();
                FlowRouter.go('/login/');
                }
                 //}
                }
                }]
                });
                                
            }
                                
                                
                                
        //
         if(Meteor.isClient){	
            Accounts.onLogout (function () {
            FlowRouter.go("/login")
            });
            }
            login.route('/login', {
                action: function () {
                  BlazeLayout.render('mytemplate', {
            
                    main: 'login',
                  });
                },
                name: 'login'
              });
              
              login.route('/forgetpassword', {
                action: function () {
                  BlazeLayout.render('mytemplate', {
                    main: 'forgetpassword',
                  });
                },
                name: 'forgetpassword'
              });
            
              login.route('/resetpassword/:token', {
                action: function () {
                  BlazeLayout.render('mytemplate', {
                    main: 'resetpassword',
                  });
                },
                name: 'resetpassword'
              });
              login.route('/registrationform', {
                action: function () {
                  BlazeLayout.render('mytemplate', {
                    main: 'registrationform',
                  });
                },
                name: 'registrationform'
              }); 

             login.route('/dashboard',{
                action: function(){
                    BlazeLayout.render('mytemplate',{
                        main: 'dashboard'
                    });
                },
                name:'dashboard'
            });

FlowRouter.route('/dashboard',{
    action: function(){
        BlazeLayout.render('mainLayout',{
            main: 'dashboard'
        });
    },
    name:'dashboard'
});

FlowRouter.route('/registrationform',{
    action: function(params) {      
        Tracker.autorun(function() {          
             if(!Meteor.user() && !Meteor.loggingIn()) {       
                FlowRouter.go('registrationform');   
                      }else if(Meteor.user() || Meteor.loggingIn()){
                          FlowRouter.go('/dashboard')
                      }      
                       }); 
                          }
});


FlowRouter.route('/formData/:_id', {
    action : function() {
        BlazeLayout.render( 'mainLayout', {
        main: 'registration'
    });
    },
    name:'registration'
});

FlowRouter.route('/regData', {
    action : function() {
        BlazeLayout.render( 'mainLayout', {
        main: 'showRegData'
    });
    },
    name:'showRegData'
});

// loginRequired = function () {
//     if (!Meteor.user()) {
//         if (!Meteor.loggingIn()) {
//             this.render('login');
//         }
//     } else {
//         this.next();
//     }
// };

// FlowRouter.onBeforeAction(loginRequired, {except: 'login'});


// FlowRouter.middleware(function () {
//     Tracker.autorun(function () {
//       if (FlowRouter.subsReady()) {
//         var user = Meteor.user();
//         if(user==null)
//         {
//             FlowRouter.go("/login");
//         }
//         else{
//             FlowRouter.go("/dashboard");
//         }
//       }
//     })
//   });

FlowRouter.route('/insertAddress',{
    action:function(){
        BlazeLayout.render('mytemplate',{
            test:'registerAddress'
        });
    },
    name: 'registerAddress'
});