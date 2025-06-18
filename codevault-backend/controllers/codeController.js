const codeService = require("../services/codeService");

const createSnippet = async ( req, res ) => {
    try {
        const {title, description, language, code, tags} = req.body;
        const owner = req.user.id;

        const newSnippet = await codeService.createSnippet({
            title, 
            description, 
            language, 
            code, 
            tags,
            owner
        });
        res.status(201).json(newSnippet);

    } catch (error) {
        console.error('Snippet creation error: ', error);
        res.status(500).json({message: error.message});
    }
};

const mySnippets = async ( req, res ) => {
    try {
        const id = req.user.id;
        const retrieveSnippets = await codeService.mySnippets(id);
        res.status(200).json(retrieveSnippets);

    } catch (error) {
        console.error('Snippet return error: ', error);
        res.status(500).json({message: error.message});
    }
};
module.exports = {
    createSnippet,
    mySnippets
};