import * as Cesium from 'cesium'

export default function initViewer() {
    const viewer = new Cesium.Viewer(document.body, {

    })

    return viewer
}
