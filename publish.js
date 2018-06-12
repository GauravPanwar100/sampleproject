import { Meteor } from 'meteor/meteor';

import { Tasks } from '../imports/api/tasks.js';
import { Arrays } from '../imports/api/tasks.js';



Meteor.publish("tasks", function () {
   return Tasks.find({});
});

Meteor.publish("users", function(){
	return Meteor.users.find();
	
});

Meteor.publish("arrays", function () {
    return Arrays.find({});
 });
 
