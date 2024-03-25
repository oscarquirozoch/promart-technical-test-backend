/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";
const LogsController = () => import('#controllers/logs_controller')
const ClientsController = () => import('#controllers/clients_controller')


router.group(() => {
  router.get('/', [LogsController, 'show'])
}).prefix('logs');

router.group(() => {
  router.get('/:id', [ClientsController, 'show'])
  router.get('/', [ClientsController, 'list'])
  router.post('/', [ClientsController, 'create'])
  router.put('/:id', [ClientsController, 'update'])
  router.delete('/:id', [ClientsController, 'delete'])
}).prefix('clients');



// returns swagger in YAML
router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

router.get("/docs", async () => {
  return AutoSwagger.default.ui("/swagger", swagger);
});