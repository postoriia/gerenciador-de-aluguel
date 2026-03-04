//import 'module-alias/register'
import App from '@/app'
import { errorHandler } from '@/core/errors/error-handler'
import { ExampleRoutes } from '@/modules/example/example.routes'
import { AuthRoutes } from '@/modules/auth/auth.routes'
import { PropertiesRoutes } from '@/modules/properties/properties.routes'
import { TenantsRoutes } from '@/modules/tenants/tenants.routes'
import { env } from '@/config/env'

export const app = new App({
  routes: [ExampleRoutes, AuthRoutes, PropertiesRoutes, TenantsRoutes]
})

errorHandler(app.getApp())

if (env.NODE_ENV !== 'test') {
  app.listen()
}
