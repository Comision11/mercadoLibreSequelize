module.exports = (sequelize, dataTypes) => {

    const alias = 'Rol';
    
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
    }
    
    const config = {
        timestamps : true
    }


    const Rol = sequelize.define(alias,cols,config);

     /* asociaciones */
     Rol.associate = function (models){

        Rol.hasMany(models.User,{
            as : 'users',
            foreignKey : 'rolId'
        })

    }

    return Rol;

}