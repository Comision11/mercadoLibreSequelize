module.exports = (sequelize, dataTypes) => {

    const alias = 'User';
    
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement :true,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING(255),
            allowNull : false
        },
        email : {
            type : dataTypes.STRING(255),
            allowNull : false
        },
        password : {
            type : dataTypes.STRING(255),
            allowNull : false
        },
        avatar : {
            type : dataTypes.STRING(255),
            allowNull : true
        },
        rolId : {
            type : dataTypes.INTEGER,
            allowNull : true
        }
    }
    
    const config = {
        timestamps : true
    }

    const User = sequelize.define(alias,cols,config);

     /* asociaciones */
     User.associate = function (models){

        User.belongsTo(models.Rol,{
            as : 'rol',
            foreignKey : 'rolId'
        })

    }

    return User;

}