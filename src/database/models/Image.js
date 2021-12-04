module.exports = (sequelize, dataTypes) => {

    const alias = 'Image';
    
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement :true,
            allowNull : false
        },
        file : {
            type : dataTypes.STRING(255),
        },
        productId : {
            type : dataTypes.INTEGER,
        }
    }
    
    const config = {
        timestamps : true
    }


    const Image = sequelize.define(alias,cols,config);

      /* asociaciones */
      Image.associate = function (models){
        
        Image.belongsTo(models.Product,{
            as : 'product',
            foreignKey : 'productId'
        })

    }

    return Image;

}