import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import '../client/registration.html';

Template.registration.events({
    'submit form':function(event){
        event.preventDefault();
        var EmailId = event.target.email.value;
        var password=event.target.password.value;
        var conpass=event.target.psw-repeat.value;
        var Education= $('.sel').val();
        var dateob=event.target.dob.value;
        var Gender= $('input[name=gender]:checked').val();

        var currentId = FlowRouter.getParam('_id');
        if(FlowRouter.getParam('_id')!= "new")
        {
            Tasks.update(
                { _id:currentId},
                { $set: {Email: EmailId,
                    createdAt:new Date(),
                    Password: password,
                    Confirm_Password: conpass,
                    Education_details: Education,
                    Date_of_birth: dateob,
                    Gender: Gender}}
                
            )
            FlowRouter.go('/regData');
        }
        else{
        Tasks.insert({
        Email: EmailId,
        createdAt:new Date(),
        Password: password,
        Confirm_Password: conpass,
        Education_details: Education,
        Date_of_birth: dateob,
        Gender: Gender
        });
        FlowRouter.go('/regData');
    }
       
   
    },

});
// first it will compare if currentid is equal to id stored in db then if yes it will update 
// data and if not it will add new data in new page.
Template.registration.helpers({
    regData: function () {
        var currentId = FlowRouter.current().params._id;
        var regDataValue = [];
        var regDataValue = Tasks.find({_id:currentId}).fetch();
        if(regDataValue.length > 0){
            return regDataValue; 
        }else{
            regDataValue = [1]
            return regDataValue;
        }
        
    },
    updateData: function(){
        if(FlowRouter.current().params._id == 'new'){
            return false;
        }else{
            return true;
        }
    }
})
//Email-validation


   
      // Form validation code will come here.
      function validate()
      {
      
         
         
         if( document.myForm.email.value == "" )
         {
            alert( "Please provide your Email!" );
            document.myForm.email.focus() ;
            return false;
         }

         if( document.myForm.password.value == "" )
         {
            alert( "Please provide your name!" );
            document.myForm.password.focus() ;
            return false;
         }
         
        //  if( document.myForm.Zip.value == "" ||
        //  isNaN( document.myForm.Zip.value ) ||
        //  document.myForm.Zip.value.length != 5 )
        //  {
        //     alert( "Please provide a zip in the format #####." );
        //     document.myForm.Zip.focus() ;
        //     return false;
        //  }
         
         if( document.myForm.Education.value == "-1" )
         {
            alert( "Please provide your Education!" );
            return false;
         }
         return( true );
      }
   
      function validateEmail()
      {
         var emailID = document.myForm.email.value;
         atpos = emailID.indexOf("@");
         dotpos = emailID.lastIndexOf(".");
         
         if (atpos < 1 || ( dotpos - atpos < 2 )) 
         {
            alert("Please enter correct email ID");
            document.myForm.email.focus() ;
            return false;
         }
         return( true );
      }


      Template.dashboard.helpers({
        currentUser: function() {
          //return Meteor.userId();
          return (Meteor.users.findOne({ _id: Meteor.userId() }).emails[0].address);
        }
      })

      Template.dashboard.events({
          'click .userLogout':function(){
              Meteor.logout();
              FlowRouter.go('/login');
          }
      })


      