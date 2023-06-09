const { HealthHistory } = require("../../app/models");
let io = null

// nao alterar pois dará o seguinte erro: TypeError: Cannot read properties of null (reading 'emit') at module.exports
setTimeout(() => {
   io = require('../../app');

},1000)

module.exports = async (req, res) => {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const healthHistory = await createHealthHistory(requestData);
    io.emit('createHealthHistory', {message: 'Historico Criado!'})
    return res.send(healthHistory)
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

function extractData(req) {
  const { event_date, description, fk_event_type, fk_animal } = req.body;
  const requestData = {
    event_date,
    description,
    fk_event_type,
    fk_animal
  };
  return requestData;
}

async function analyseData(request) {
  if(!request.event_date) throw new Error("event_date is required");
}

async function createHealthHistory(request) {
  try {
    console.log(HealthHistory)
    const healthHistory = await HealthHistory.create({
      event_date: request.event_date,
      description: request.description,
      fk_event_type: request.fk_event_type,
      fk_animal: request.fk_animal
    });
    return healthHistory;
    
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
}