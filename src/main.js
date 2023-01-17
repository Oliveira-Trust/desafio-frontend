/*  Renderização desacoplada de framework
*   Importe uma função bootstrap vue, react ou angular 
*   Isso permite mudar de framework sem alterar codigo no resto do projeto  
*/
import { bootstrapVue } from './presentation/bootstrap'

bootstrapVue('#app')