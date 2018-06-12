import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';



//Meteor.subscribe("tasks");

//Meteor.call("Tasks",this._id);

if(Meteor.isClient){
    Meteor.subscribe('tasks');
    Meteor.subscribe('users');	
    
    Meteor.subscribe('arrays');
}