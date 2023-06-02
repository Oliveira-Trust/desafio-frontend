import React, { useEffect, useState } from 'react';
import { list } from './apis/user'
import Header from "./components/Header";

import { library } from '@fortawesome/fontawesome-svg-core'


import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Main from './views/Main'


export default function App() {
  return (
    <Main />
  )
}
library.add(fas, far)