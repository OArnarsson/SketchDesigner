global.rootRequire = (name) => {
	return require('../../FrontEnd/node_modules' + '/' + name);
}

const mongoose = rootRequire('mongoose');
Schema = mongoose.Schema;

let workspaceSchema = new Schema({
	title: String,
	dateCreated: String,
	dateModified: String,
	canvasArr: []
});

module.exports = mongoose.model('Workspace', workspaceSchema)