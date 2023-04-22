const { insertFunction, formattedColumns } = require('../utils/insertFunction');
const connection = require('./connection');

const findAll = async () => {
    const [missions] = await connection.execute('SELECT * FROM missions');
    return missions;
};

const findById = async (id) => {
    const [mission] = await connection.execute('SELECT * FROM missions WHERE id = ?', [id]);
    return mission;
};

const insert = async (mission) => {
   const { columns, placeholders } = insertFunction(mission); 

    const [{ insertId }] = await connection.execute(
`INSERT INTO missions
    (${columns}) VALUES(${placeholders})`,
    [...Object.values(mission)],
);
return findById(insertId);
};

const update = async (id, updateData) => {
   const columns = formattedColumns(updateData);    
     await connection.execute(
        `UPDATE missions SET ${columns} WHERE id=? `,
        [...Object.values(updateData), id],
        );
        return updateData;
    };

    const deleteMission = async (id) => {
        await connection.execute('DELETE FROM missions WHERE id=?;', [id]);        
        return `Missão ${id} deletada`;
    };

module.exports = {
    findAll,
    findById,
    insert,
    update,
    deleteMission,
};