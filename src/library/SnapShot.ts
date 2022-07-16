import Camera from "./Camera"
import Canvas from "./Canvas"
class SnapShot{
    public camera:Camera;
    public canvas:Canvas;
    constructor(){
    }
    init_create = (parent_camera:HTMLElement = document.body, parent_canvas:HTMLElement = document.body)=>{
        this.camera = new Camera()
        this.canvas = new Canvas()
        this.canvas.init_create(parent_canvas);
        this.camera.init_create(parent_camera);
    }
    public capture = ()=>{
        this.canvas.set_image(this.camera.video);
    }
}

export default SnapShot;