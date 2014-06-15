/**
 * NoteController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var responseService = require('../services/Response.js');
var CANREAD = false;

module.exports = {

	index : function (request, response){
		Note.find().where({isPrivate : false}).exec(function (error, notes){
			if(error){
				console.log(error);
				return responseService.error(response, error);
			}
			return responseService.success(response, notes);
		});
	},

	private : function (request, response){
		if(!CANREAD){
			return responseService.forbidden (response, "You don't have permission for that");
		}
		Note.find().where({isPrivate : true}).exec(function (error, notes){
			if(error){
				console.log(error);
				return responseService.error(response, error);
			}
			return responseService.success(response, notes);
		});
	},

	all : function (request, response){
		if(!CANREAD){
			return responseService.forbidden (response, "You don't have permission for that");
		}
		Note.find().exec(function (error, notes){
			if(error){
				console.log(error);
				return responseService.error(response, error);
			}
			return responseService.success(response, notes);
		});
	},

	post : function (request, response){
		Note.create({
		  	name      : request.param('name'),
		  	body      : request.param('body'),
		  	isPrivate : request.param('isPrivate'),
		  	major     : request.param('major')
		}).exec(function (error, note){
			if(error){
				return responseService.failed(response, error);
			}else{
				return responseService.success(response, note);
			}
		})
	},

	delete : function (request, response){
		if(!CANREAD){
			return responseService.forbidden (response, "You don't have permission for that");
		}
		Note.findOne(request.param('id')).done(function(error, note) {
			if (error || typeof note === "undefined"){
				return responseService.error(response, error);
			}
			note.destroy(function(error) {
				// record has been removed
				if (error) {
					return responseService.error(response, error);
				} else {
					return responseService.success(response, {deleted:true});
				}
			});
		});
	}
};

