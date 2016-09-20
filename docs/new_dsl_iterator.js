/*
 * ==============================================================================
 *  
 * get: Retorna uma instancia do iterator que prove métodos,
 *      para manipular um obejeto obtido pela 'rota' passada como parametro
 *
 * ==============================================================================
 */
var heroes = resultset_instance.get('_setup/heroes');
var rounds = resultset_instance.get('rounds');

/*
 * ==============================================================================
 *  
 * last_value: Retorna o ultimo valor de um objeto ou array
 *
 * map: Retorna um array mapeado
 *
 * ==============================================================================
 */
var actions_array = rounds.last_value().map('summoned_id');


/*
 * ==============================================================================
 *  
 * first_key: Retorna a primeira chave de um objeto
 *
 * ==============================================================================
 */
if(rounds == null) {
  return self.build_action_json("active_turn", {
    hero_id: heroes.first_key()
  })
}

/*
 * ==============================================================================
 *  
 * intersect: Retorna a primeira chave de um objeto
 *
 * keys: Retorna um array com todas as chaves do objeto
 *
 * ==============================================================================
 */
var remaining_turns = actions_array.intersect(heroes.keys());

/*
 * ==============================================================================
 *  
 * occurences: Retorna o numero de ocorrencias do parametro no determinado array
 *
 * last: Retorna o ultimo objeto dentro de um objeto ou array
 *
 * last_key: Retorna a ultima chave de um objeto
 *
 * ==============================================================================
 */
if(actions_array.occurences(actions_array.last()) < config.get('General.maxActions')) {
  json_response = self.build_action_json("active_turn", {
    hero_id: actions_array.last(),
    round_id: rounds.last_key()
  });
} else {


/*
 * ==============================================================================
 *  
 * is_empty: Retorna booleano verificando o se o objeto tem ou não algum indice
 *
 * ==============================================================================
 */
  if(remaining_turns.is_empty()) {
    json_response = self.build_action_json("active_turn", {
      hero_id: heroes.first_key()
    });
  } else {

/*
 * ==============================================================================
 *  
 * first: Retorna o primeiro objeto filho dentro de um objeto pai ou array
 *
 * ==============================================================================
 */
    json_response = self.build_action_json("active_turn", {
      hero_id: remaining_turns.first(),
      round_id: rounds.last_key()
    });
  }
}

return json_response;
