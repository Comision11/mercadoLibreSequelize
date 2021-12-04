module.exports = (sequelize, dataTypes) => {

    const alias = 'Section';
    
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


    const Section = sequelize.define(alias,cols,config);


      /* asociaciones */
      Section.associate = function (models){
        
        Section.hasMany(models.Product,{
            as : 'products',
            foreignKey : 'SectionId'
        })
    }

    return Section;

}