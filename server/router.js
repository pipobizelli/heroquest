"use stric";

const Session = require('./controllers/Session'),
      Turn = require('./controllers/Turn');

let Router = Object.assign({}, {
  start: app => {
    // Sesion Entitie
    app.post('/session', (req, res) => Session.create(req, res));
    app.get('/session/:session_id', (req, res) => Session.get(req, res));
    app.get('/session/:session_id/join', (req, res) => Session.join(req, res));
    
    // Turn Entitie
    app.get('/session/:session_id/turn', (req, res) => Turn.get(req, res));
    app.post('/session/:session_id/action/:action_type/:thing_id', (req, res) => Turn.set_action(req, res));
  }
});

module.exports = Router;