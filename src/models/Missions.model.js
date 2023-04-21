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
    const columns = Object.keys(mission).join(', ');
    const placeholders = Object.keys(mission)
    .map((_key) => '?')
    .join(', ');

    const [{ insertId }] = await connection.execute(
`INSERT INTO missions
    (${columns}) VALUES(${placeholders})`,
    [...Object.values(mission)],
);
return findById(insertId);
};

const update = async (id, updateData) => {
    const [result] = await connection.execute(
        'UPDATE missions SET name=? WHERE id=? ',
        [updateData.name, id],
        );
        return result;
    };

    const deleteMission = async (id) => {
        const [result] = await connection.execute('DELETE FROM missions WHERE id=?;', [id]);
        console.log('delete', result);
        return { id };
    };

module.exports = {
    findAll,
    findById,
    insert,
    update,
    deleteMission,
};