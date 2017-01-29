global.rootRequire = (name) => {
	return require('../../node_modules' + '/' + name);
}

const mongoose = rootRequire('mongoose');
Schema = mongoose.Schema;

let workspaceSchema = new Schema({
	canvases: [],
	title: String,
	dateModified: String,
	dateCreated: String
});

module.exports = mongoose.model('Workspace', workspaceSchema)