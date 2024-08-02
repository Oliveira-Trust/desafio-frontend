import { config } from '@vue/test-utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Adiciona todos os ícones ao library
library.add(fas);

// Configura o Vue Test Utils para usar o font-awesome-icon globalmente
config.global.components['font-awesome-icon'] = FontAwesomeIcon;