import cors from 'cors';
import express, { Express } from 'express';
import { authController } from './controllers/auth/auth_controller';
import { createUserController } from './controllers/auth/create_user_controller';
import { loginController } from './controllers/auth/login_controller';
import { deletePromoController } from './controllers/promo/delete/delete_promo_controller';
import { getPromosController } from './controllers/promo/get/get_promos_controller';
import { postPromosController } from './controllers/promo/post/post_promos_controller';
import { putPromoController } from './controllers/promo/put/put_promo_controller';
export function configureRoutes(app: Express) {
  app.use(cors());
  app.use(express.json());
  // Every route should have this middleware
  app.use((req, res, next) => {
    console.log(`[server]: Request received: ${req.method} ${req.url}`);
    // log the request body and query params
    console.log(`[server]: Request body: ${JSON.stringify(req.body)}`);
    console.log(`[server]: Request query params: ${JSON.stringify(req.query)}`);
    next();
  });
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
  // Promo
  app.get('/promos', getPromosController);
  // Should have auth middleware
  app.post('/promos', authController,  postPromosController);
  // Promo by ID
  app.get('/promos/:id', getPromosController);
  app.put('/promos/:id',authController , putPromoController);
  app.delete('/promos/:id', authController, deletePromoController);
  // Auth
  app.post('/login', loginController);
  app.post('/create_user', createUserController);

}