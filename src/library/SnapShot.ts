import Camera from "./Camera"
import Canvas from "./Canvas"

/**
 * SnapShot is the controling feature of this project
 */
class SnapShot{
    public camera:Camera;
    public canvas:Canvas;
    constructor(){
    }
    /**
     * * Initialize the SnapShot with parent elemets for both the camera feed and the canvas
     * @param  {HTMLElement=document.body} parent_camera
     * @param  {HTMLElement=document.body} parent_canvas
     */
    public init_create = (parent_camera:HTMLElement = document.body, parent_canvas:HTMLElement = document.body)=>{
        this.camera = new Camera()
        this.canvas = new Canvas()
        this.canvas.init_create(parent_canvas);
        this.camera.init_create(parent_camera);
    }
    /**
     * * Capture the camera feed and set the canvas to it.
     */
    public capture = ()=>{
        this.canvas.set_image(this.camera.video);
    }
}

export default SnapShot;