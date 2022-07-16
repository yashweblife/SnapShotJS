import Vector from "./Vector"
import Camera from "./Camera"
/**
 * The Canvas class allows you to abstract away most of the tedious parts of using the canvas element.
 */

function map(x:number, in_min:number, in_max:number, out_min:number, out_max:number) {
    return Math.abs((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
}
class Canvas{
    private dom:HTMLCanvasElement;
    public context:CanvasRenderingContext2D;
    public xlim:number;
    public ylim:number;
    public res:number;
    /**
     * @param  {HTMLCanvasElement} dom Takes a canvas element from the dom
     * @param  {number} width Canvas Width
     * @param  {number} height Canvas Height
     */
    constructor(){
        this.res=20;
    }
    /**
     * * Initialize the canvas. Creates a canvas automatically
     * ! It will require a dom element to plug the canvas into
     * @param  {HTMLElement=document.body} dom
     */
    public init_create = (dom:HTMLElement = document.body)=>{
        const width=300;
        const height=300;
        this.dom = document.createElement("canvas") as HTMLCanvasElement;
        this.dom.width=width;
        this.dom.height=height;
        this.xlim=width;
        this.ylim=height;
        this.context = this.dom.getContext('2d') as CanvasRenderingContext2D;
        dom.append(this.dom);
    }
    /**
     * * Initilize the canvas. Pass it a canvas element.
     * @param  {HTMLCanvasElement} dom
     * @param  {number=300} width
     * @param  {number=300} height
     */
    public init = (dom:HTMLCanvasElement,width:number=300, height:number=300)=>{
        this.dom=dom;
        this.dom.width=width;
        this.dom.height=height;
        this.xlim = width;
        this.ylim = height;
        this.context = dom.getContext('2d') as CanvasRenderingContext2D;
    }

    /**
     * * Draw a circle onto the canvas
     * @param  {number} radius
     * @param  {Vector} position X Y positions of the vector
     * @param  {Vector} color X=red Y=Green Z=Blue
     * @param  {boolean=true} fill set to false for stroke
     */
    public draw_circle = (radius:number, position:Vector, color:Vector, fill:boolean=true)=>{
        this.context.beginPath();
        if(fill==true) this.context.fillStyle=`rgb(${color.x}, ${color.y}, ${color.z})`;
        else this.context.strokeStyle=`rgb(${color.x}, ${color.y}, ${color.z})`;
        this.context.arc(position.x, position.y, radius, 0, Math.PI*2, false);
        if(fill==true) this.context.fill();
        else this.context.stroke();
        this.context.closePath();
    }
    /**
     * * Draws a rectangle onto the canvas
     * @param  {Vector} position
     * @param  {Vector} size
     * @param  {Vector} color
     * @param  {boolean=true} fill
     */
    public draw_rect = (position:Vector, size:Vector, color:Vector, fill:boolean=true)=>{
        this.context.beginPath();
        if(fill==true) this.context.fillStyle=`rgb(${color.x}, ${color.y}, ${color.z})`;
        else this.context.strokeStyle=`rgb(${color.x}, ${color.y}, ${color.z})`;
        this.context.rect(position.x, position.y, size.x, size.y);
        if(fill==true) this.context.fill();
        else this.context.stroke();
        this.context.closePath();
    }
    /**
     * @param  {Vector} start starting point of the line
     * @param  {Vector} end ending point of the line
     * @param  {Vector} color Color of the line
     */
    public draw_line = (start:Vector, end:Vector, color:Vector)=>{
        this.context.beginPath();
        this.context.strokeStyle = `rgb(${color.x}, ${color.y}, ${color.z})`;
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
        this.context.closePath();
    }
    /**
     * * Clears the canvas completely
     * {@link Canvas}
     */
    public clear = ()=>{
        this.context.clearRect(0, 0, this.xlim, this.ylim)
    }
    /**
     * Provide a video feed to it and it will set the image to the canvas
     * @param  {HTMLVideoElement} vid
     */
    public set_image = (vid:HTMLVideoElement)=>{
        let minSize = Math.min(vid.videoWidth, vid.videoHeight);
        let sx = (vid.videoWidth-minSize)/2;
        let sy = (vid.videoHeight-minSize)/2;
        this.context.drawImage(vid,sx,sy,minSize,minSize,0,0,this.xlim,this.ylim)
    }
    /**
     * Breaks down the canvas into pixels and returns a 2D Vector array. {@link Vector}
     * @param  {HTMLVideoElement} vid
     */
    public get_pixel_data = (vid:HTMLVideoElement)=>{     
        const res = this.res;   
        const image = this.context.getImageData(0,0,this.xlim,this.ylim);
        const data = image.data;
        const pixels:Vector[] = [];
        for(var i = 0; i < image.data.length; i+=4){
            pixels.push(new Vector(data[i], data[i+1], data[i+2]));
        }
        const output:Vector[][] = []
        for(var i =0;i<image.height;i+=res){
            const line:Vector[] = [];
            for(var j =0;j<image.width;j+=res){
                line.push(pixels[((i*image.width)+j)])
            }
            output.push(line);
        }
        //console.log(output.length, output[0].length);
        return(output);
    }
    /**
     * Reduces the quantity of data by a provided number, returns a Vector[][]
     * @param  {Vector[][]} data
     * @param  {number=5} value
     */
    public reduce_resolution = (data:Vector[][], value:number=5)=>{
        let output:Vector[][]=[]
        for(var i = 0; i < data.length; i+=value){
            let line:Vector[] = [];
            for(var j = 0; j < data[i].length; j+=value){
                line.push(data[i][j]);
            }
            output.push(line);
        }
        return(output);
    }
    /**
     * Checks each datapoints closeness to white and draws a circle with respective radius
     * @param  {HTMLVideoElement} vid
     */
    public draw_contour = (vid:HTMLVideoElement)=>{
        const array:Vector[][] = this.get_pixel_data(vid);
        this.clear();
        const white = new Vector(255,255,255,255);
        const black = new Vector();
        const res=this.res;
        for(var i =0;i<array.length;i++){
            for(var j =0;j<array.length;j++){
                let radius = map(array[i][j].dist(white),0,510,1,res/2);
                //this.draw_rect(new Vector(j*res,i*res), new Vector(res,res), array[i][j], true)
                this.draw_circle(radius, new Vector(j*(res+radius),i*(res+radius)), array[i][j], true)
                //array[i][j].minimize(255);
            }
        }
    }
    
    /**
     * Converts the data to pure RBG values based on the highest component value
     * @param  {HTMLVideoElement} vid
     */
    public draw_rgb = (vid:HTMLVideoElement)=>{
        const array:Vector[][] = this.get_pixel_data(vid);
        this.clear();
        const white = new Vector(255,255,255,255);
        const black = new Vector();
        const res=this.res;
        for(var i =0;i<array.length;i++){
            for(var j =0;j<array.length;j++){
                array[i][j].maximize(255);
                this.draw_rect(new Vector(j*res,i*res), new Vector(res,res), array[i][j], true)
                //this.draw_circle(res/2, new Vector(j*(res),i*(res)), array[i][j], true)
            }
        }

    }
    
    public draw_edges = (vid:HTMLVideoElement)=>{
        const array:Vector[][] = this.get_pixel_data(vid);
        this.clear();
        const white = new Vector(255,255,255,255);
        const black = new Vector();
        const res=this.res;
        for(var i =0;i<array.length;i++){
            for(var j =0;j<array.length;j++){
                //array[i][j].maximize(255);
                //this.draw_rect(new Vector(j*res,i*res), new Vector(res,res), array[i][j], true)
                //this.draw_circle(res/2, new Vector(j*(res),i*(res)), array[i][j], true)
            }
        }
    }
    
}

export default Canvas