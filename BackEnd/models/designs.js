global.rootRequire = function(name) {
    return require('../../FrontEnd/node_modules' + '/' + name);
}

const mongoose = rootRequire('mongoose');
Schema = mongoose.Schema;

let DesignSchema = new Schema({
	title: String,
	dateCreated: String,
	dateModified: String,
	canvasArr: []
});

module.exports = mongoose.model('Design', DesignSchema)