const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init ({
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_description: {
        type: Datatypes.STRING,
        validate: {
            len: [2]
        }
    },
    user_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    post_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
            model: 'blog',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});

module.exports = Comment;