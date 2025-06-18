const Snippet = require("../models/codeModel");


const createSnippet = async ({title, description, language, code, tags, owner}) => {
    try {

        const newSnippet = await Snippet.create({ 
            title, 
            description, 
            language, 
            code, 
            tags,
            owner
        });
        return{
            message:'Snippet created successfully',
            snippet:{
                id: newSnippet._id,
                title: newSnippet.title,
                description: newSnippet.description,
                language: newSnippet.language,
                code: newSnippet.code,
                tags: newSnippet.tags,
                owner: newSnippet.owner
            }
        };

    } catch (error) {
        throw error;
    }
};

const mySnippets = async (id) => {
    try {
        const snippets = await Snippet.find({ owner: id });

        return{
            message:'Snippets retrieved successfully',
            snippets
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createSnippet,
    mySnippets
};