const errorMap = {
  INVALID_VALUE: 422,
  INVALIDE_ID_VALUE: 422,
  INVALID_DATA_VALUE: 422,
  MISSION_NOT_FOUND: 404,
  DUPLICATE_ID: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};