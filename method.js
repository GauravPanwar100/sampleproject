import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Tasks } from '../imports/api/tasks.js';
import { Arrays } from '../imports/api/tasks.js';

Meteor.methods({
addTasks:function(Email){
    Tasks.insert({
        Email: Email
    });
},
deleteTasks:function(_id){
    var task=Tasks.findOne(_id);
    Tasks.remove(_id);
},
setChecked:function(_id,setChecked)
{
    var task=Tasks.findOne(_id);
    Tasks.update(_id,{$set:{checked:setChecked}});
},

// 'changepass': function(userId, newpassword) {
//     var authCode = Meteor.users.find({ _id: userId}).fetch(); 

//     if (authCode.length > 0) {

//         Accounts.setPassword(userId, newpassword);
//         let a = Meteor.users.update({ _id: userId }, {$set:{"services.password": newpassword}} );
//         return true;
//     } 
// },



insertaddress:function(form){
var currentuserId=Meteor.userId();
var addressdata=_.extend(form,{created_Date:new Date(),created_By:currentuserId}); //_.extend copies the properties of each source to destination
var addressdetails=Arrays.insert(addressdata);

},



});

