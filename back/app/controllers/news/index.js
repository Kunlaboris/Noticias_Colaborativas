const createNew = require('./create-new');
const createComment = require('./create-comment');
const getNewById = require('./get-new-by-id');
const getCommentById = require('./get-comment-by-id');
const getNews = require('./get-news');
//const getComment = require('./get-comment');
const removeNewById = require('./remove-new-by-id');
const removeCommentById = require('./remove-comment-by-id');
const updateNewById = require('./update-new-by-id');

module.exports = {
  createNew,
  createComment,
  getNewById,
  getCommentById,
  getNews,
  //getComment,
  removeNewById,
  removeCommentById,
  updateNewById,
};
