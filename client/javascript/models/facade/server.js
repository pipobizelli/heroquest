var Server = function(server_url, options) {

  this.join_game = function(session_id, data) {
    this.server_request('get', `${server_url}/session/${session_id}/join`, data)
  }

  this.update_session = function(session_id, data) {
    this.server_request('get', `${server_url}/session/${session_id}`, data);
  }

  this.set_turn = function(session_id, data) {
    this.server_request('get', `${server_url}/session/${session_id}/turn`, data)
  }

  this.action = function(session_id, type, hero_id, data) {
    this.server_request('post', `${server_url}/session/${session_id}/action/${type}/${hero_id}`, data)
  }

  this.server_request = function(method, url, data) {
    ajax[method](url, data).then(function(error, text, xhr) {
      options["success"](error, text);
    }).catch(function(error) {
      options["error"](error)
    });
  }

  return {
    server_request:this.server_request,
    join_game:this.join_game,
    update_session:this.update_session,
    set_turn:this.set_turn,
    action:this.action
  }
}
