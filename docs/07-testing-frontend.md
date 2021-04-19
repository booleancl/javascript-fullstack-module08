# Refactorización utilizando pruebas de software en Frontend
Continuamos caracterizando la aplicación para refactorizar y dejar la aplicación más flexible y mantenible. 

Vuetify es una dependencia fuerte del Frontend y es mejor configurar las pruebas para que se incluya globalmente y no en cada prueba. Tenemos que hacer dos pasos para esto. El primero es modificar el archivo `jest.config.js` para que quede así:

```javascript
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: [
    './jest.setup.js'
  ]
}

```

A continuación hay que crear el archivo `jest.setup.js` en la raíz con el siguiente contenido

```javascript
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

Aprovecharemos de incluir la opción *coverage* en el `package.json`. La línea debe quedar así: `"test:unit": "vue-cli-service test:unit --coverage",`

Una vez configurado pasamos a las pruebas. En el caso del login solo tenemos implementado el caso exitoso y ciertamente tenemos trabajo pendiente para los otros casos que se pueden dar (usuario no registrado, contraseña incorrecta, etc), pero partiremos probando lo que ya existe. La primera prueba en el archivo `Login.spec.js` queda así:

```javascript
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import { Auth } from '@/firebase'
import Vue from 'vue'

jest.mock('@/firebase',()=> ({
  Auth: {
    signInWithEmailAndPassword: jest.fn()
  }
}))

Vue.use(Vuetify)

describe('Login.vue', () => {
  it('Successful login redirects to products page', async () => {
    const wrapper = mount(App,{
      localVue,
      vuetify: new Vuetify(),
      store,
      router
    })
    wrapper.vm.$router.push = jest.fn()
    wrapper.find('[data-cy=username]').setValue('testlogin@boolean.cl')
    wrapper.find('[data-cy=password]').setValue('somepass')
    // Esto no resuelve, sino que configura de que en caso de que se resuelva, lo haga exitosamente
    Auth.signInWithEmailAndPassword.mockResolvedValue()

    wrapper.find('[data-cy=login-btn]').trigger('click')
    // Esto genera que se apliquen los cambios y se resuelvan las promesas con los valores mockeados 
    await flushPromises()

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'Products' })
  })
})
```

Vemos que las pruebas requieren que se monte una instancia de Vue con todos los plugins necesarios (store, router, vuetify), además de dobles de prueba para la autenticación. Un detalle importante es el comportamiento asyncrono de la autenticación. Si bien podemos configurar que la promesa pase al `then` con ayuda de jest en la función `mockResolvedValue`, su resolución en concreto se realiza con ayuda de la librería [`flush-promises`](https://vue-test-utils.vuejs.org/guides/testing-async-components.html#asynchronous-behavior-outside-of-vue)

Pasaremos a hacer las pruebas para productos. Acá vamos a probar que el componente muestra un listado del mismo largo que los productos guardados en los `fixtures` en caso que el servidor responda y probaremos que el largo es 0 (cero) cuando el servidor por algúna razón no responde. El test queda de la siguiente forma:

```javascript
import Vue from 'vue'
import axios from 'axios'
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuetify from 'vuetify'
import App from '@/App.vue'
import store from '@/store'                  
import router from '@/router'
import products from '../../../fixtures/products.json'

const localVue = createLocalVue()

jest.mock('axios',() => ({
  get: jest.fn()
}))

jest.mock('@/firebase',() => ({
  Auth: {
    currentUser: { 
      name: 'dummyUser',
      getIdToken(){
        return 'fakeToken'
      }
     }
  }
}))

describe('Product.vue',() => {
  beforeEach(()=>{
    router.push('/')
    store.replaceState({
      products: []
    })
  })

  it('Shows a list of products when the server response successfully', async () => {
    const wrapper = mount(App,{
      localVue,
      vuetify: new Vuetify(),
      store,
      router
    })
    axios.get.mockResolvedValue({data: products})
    
    router.push( { name: 'Products' } )
    await flushPromises()

    expect(wrapper.findAll('[data-cy=product-item]')).toHaveLength(products.length)
  })

  it('Shows an empty list of products when the server response failed', async () => {
    const wrapper = mount(App,{
      localVue,
      vuetify: new Vuetify(),
      store,
      router
    })
    axios.get.mockRejectedValue()
    router.push( { name: 'Products' } )
    await flushPromises()

    expect(wrapper.findAll('[data-cy=product-item]')).toHaveLength(0)
  })
})

```

Nos damos cuenta que los test de front requieren configuración, dobles de prueba y hooks que permitan manipular el estado entre una prueba y otra para que estas sigan siendo independientes. 

Con esto ya tenemos una capa de cobertura o caracterización importante que nos permite implementar la refactorización. En el caso del framework Vue con Vuex es clásico que el `store` es la primera fuente de *smells* y tenemos una oportunidad de extraer la llamada al servidor en un servicio independiente. Para esto creamos el siguiente archivo dentro de la carpeta `services/ProductService.js` con el siguiente contenido:

```javascript
import axios from 'axios'
import { Auth } from '@/firebase'

const productsURL = 'api/products'

export default {
  async getProducts () {
    try {
      const token = await Auth.currentUser?.getIdToken(true)
      const response = await axios.get(productsURL, { headers: { Authorization: `Bearer ${token}` } })
      return response.data
    } catch (error) {
      throw new Error('Productos momentáneamente no disponibles')
    }
  }
}

```

Y en el `store` quedaría así:

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import ProductService from '@/services/ProductService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    alert: null
  },
  mutations: {
    SET_PRODUCTS (store, products) {
      store.products = products
    },
    SET_ALERT (store, alert) {
      store.alert = alert
    }
  },
  actions: {
    async getProducts (actionContext) {
      const { commit } = actionContext
      try {
        const products = await ProductService.getProducts()
        commit('SET_PRODUCTS', products)
      } catch (error) {
        commit('SET_ALERT', { message: error.message, type: 'error' })
      }
    },
    setAlert (actionContext, alert) {
      const { commit } = actionContext
      commit('SET_ALERT', alert)
    }
  }
})

```

Vemos que en caso que el servicio retorne un error caeremos al `catch` y llamamos a una mutación llamada `SET_ALERT`. Esta funcionalidad la implementaremos utilizando TDD.







