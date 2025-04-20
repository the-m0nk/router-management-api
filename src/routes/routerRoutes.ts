import { Router } from 'express';
import { RouterController } from '../controllers/RouterController';
import { RouterService } from '../services/RouterServices';

const router = Router();
const routerService = new RouterService();
const routerController = new RouterController(routerService);

router.get('/status', routerController.getRouterStatus.bind(routerController));
router.post('/settings/wifi/enable', routerController.enableWifi.bind(routerController));
router.post('/settings/wifi/disable', routerController.disableWifi.bind(routerController));
router.post('/settings/firewall/enable', routerController.enableFirewall.bind(routerController));
router.post('/settings/firewall/disable', routerController.disableFirewall.bind(routerController));
router.post('/settings/password/change', routerController.changePassword.bind(routerController));

export { router as routerRoutes };