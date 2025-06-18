import { createStore } from 'vuex'
import { taskModule } from './modules/task'

export default createStore({
  modules: {
    task: taskModule,
  },
})
