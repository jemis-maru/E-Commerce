import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Notify } from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  components: ["QChip"],
  plugins: [Notify],
  config: {
    notify:{
      position: 'top-right',
      timeout: 5000,
    }
  },
  framework:{
    plugins: [
      'Notify'
    ]
  }
}