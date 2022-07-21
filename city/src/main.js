import * as Cesium from 'cesium'
import '@/_assets/cesium/Widgets/widgets.css'

import '@/css/common.scss'

import '@/js/initCesium.js'
import initViewer from '@/js/initViewer.js'
import MousePosition from '@/js/MousePosition.js'


const viewer = initViewer()
new MousePosition(viewer)





