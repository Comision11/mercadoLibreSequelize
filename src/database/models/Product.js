module.exports = (sequelize, dataTypes) => {

    const alias = 'Product';
    
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
        price : {
            type : dataTypes.DECIMAL(10,2),
            allowNull : false
        },
        description : {
            type : dataTypes.STRING(500),
            allowNull : false
        },
        discount : {
            type : dataTypes.INTEGER,
            allowNull : true
        },
        categoryId : {
            type : dataTypes.INTEGER,
            allowNull : false
        }
    }
    
    const config = {
        timestamps : true
    }


    const Product = sequelize.define(alias,cols,config)

    /* asociaciones */
    Product.associate = function (models){
        
        Product.hasMany(models.Image,{
            as : 'images',
            foreignKey : 'productId'
        })
        
        Product.belongsTo(models.Category,{
            as : 'category',
            foreignKey : 'categoryId'
        })

        Product.belongsTo(models.Section,{
            as : 'section',
            foreignKey : 'sectionId'
        })

    }

    return Product;

}