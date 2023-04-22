const validateMissionID = (req, res, next) => {
    const { id } = req.params;
    const idAsNumber = Number(id);
    if (Number.isNaN(idAsNumber)) {
      res.status(400).send({ message: 'ID inválido! Precisa ser um número' });
    } else {
      next();
    }
  };

const validateMissionData = (req, res, next) => {
    const requiredProperties = ['name', 'year', 'country', 'destination'];
    const missingProps = requiredProperties.filter((property) => !(property in req.body));
  
    if (missingProps.length === 0) {
      return next();
    } 
      const missingPropsString = missingProps.map((prop) => `'${prop}'`).join(', ');
      return res.status(400)
        .send({ message: `A missão não recebeu o(s) atributo(s) ${missingPropsString}` });
  };

  module.exports = {
    validateMissionID,
    validateMissionData,
  };