/**
 *  Allowed attributes for a column:
 *  type: the javascript type of the column (used for creating the form and parsing)
 *  default
 *  required: true or false
 *  foreignKey: the name of the table to which this table belongs. Should be a string and should match exactly a different table in the schema.
 * 
 */

todoListItem = {
    description: {
        type: "text",
        required: true,
    },
    tokensPerHour: {
        type: "number",
        required: true
    },
    notes: {
        type: "text", 
    },
}
work = {
    minutesSpent:{
        type:  "number",
        required: true,
    }, 
    todoId:{
        type:  "text",
        required: true,
        foreignKey: 'todoListItem'
    }, 
    tokensPerHour:{
        type:  "number",
        required: true,
    }, 
    moneyMade:{
        type:  "number",
        default: 0,
    }, 
    tokensPerMoney:{
        type:  "number",
        required: true,
    },
}


module.exports = {
    todoListItem,
    work,
}
