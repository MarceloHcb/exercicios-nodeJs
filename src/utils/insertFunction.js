const insertFunction = (param) => {
    const columns = Object.keys(param).join(', ');
    const placeholders = Object.keys(param)
    .map((_key) => '?')
    .join(', ');
    return { columns, placeholders };
};
const formattedColumns = (param) => Object.keys(param)
.map((key) => `${key} = ?`)
.join(', ');

module.exports = {
    insertFunction,
    formattedColumns,
};