
const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();
const schema = require('./schema')
const {ValidationError} = require('./shared')

async function saveRecord({type, data}){
  sanitized = validateAndReshapeRecord({type, data, schema})
  // await datastore.save({
  //   key: datastore.key(type),
  //   data,
  // })
}

async function updateRecord({type, id, data}){
  sanitized = validateAndReshapeRecord({type, data, schema})

}




function validateAndReshapeRecord({schema, type, data}){
  errors = {}
  newRecord = {}
  for (column in schema[type]){
    columnInfo = schema[type][column]

    if (columnInfo['default']){
      if (data[column] == undefined){
        newRecord[column] = columnInfo['default']
      }
    }

    if (columnInfo['required']){
      if (!data[column] || data[column].trim().length == 0){
        errors[column] = "required"
        continue
      }
    }
    if (columnInfo['foreignKey']){
      // verify that the appropriate object exists already
      // chech-if-exists(
      //   datastore.key(columnInfo['foreignKey'], data[column])
      // )
    }
    switch(columnInfo['type']){
      case null:
        throw new Error("Schema must have a type for all fields")
      case "number":
        try{
          newRecord[column] = Number(data[column])
        } catch (e){
          errors[column] = e.message
        }
      case "text":
        newRecord[column] = data[column].trim()
        break
    }
  }
  if (Object.keys(errors).length > 0){
    throw new ValidationError(errors)
  }
  return newRecord
}

module.exports= {
  saveRecord,
  updateRecord,
}