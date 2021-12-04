module.exports = (sequelize, dataTypes) => {

    const alias = 'Category';
    
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


    const Category = sequelize.define(alias,cols,config);


      /* asociaciones */
      Category.associate = function (models){
        
        Category.hasMany(models.Product,{
            as : 'products',
            foreignKey : 'categoryId'
        })
    }

    return Category;

}