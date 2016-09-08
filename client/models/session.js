window.Model = window.Model || {};
window.Collection = window.Collection || {};

/* - - - - - - - - - - - - - - - - -*/

Model.SessionSetupHero = Supermodel.Model.extend({})
Collection.SessionSetupHero = Backbone.Collection.extend({
  model: function(attrs, options) {
    return Model.SessionSetupHero.create(attrs, options);
  }
});

/* - - - - - - - - - - - - - - - - -*/


Model.SessionSetup = Supermodel.Model.extend({})
Model.SessionSetup.has().many('heroes', {
  collection: Model.SessionSetupHero,
  inverse: 'setup'
});

/* - - - - - - - - - - - - - - - - -*/

Model.SessionAccount = Supermodel.Model.extend({})
Collection.SessionAccount = Backbone.Collection.extend({
  model: function(attrs, options) {
    return Model.SessionAccount.create(attrs, options);
  }
});

/* - - - - - - - - - - - - - - - - -*/

Model.Session = Supermodel.Model.extend({});
Model.Session.has().one('_setup', {
  model: Model.SessionSetup,
  inverse: 'session'
});

/* - - - - - - - - - - - - - - - - -*/
