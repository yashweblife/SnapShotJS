interface Camera{
    video:HTMLVideoElement
    constraints:MediaStreamConstraints
    init_create:(dom?:HTMLElement)=>Promise<void>
    init:(vid:HTMLVideoElement)=>Promise<void>
    play:()=>void
    pause:()=>void
}

class Camera{
    public video:HTMLVideoElement;
    public constraints: MediaStreamConstraints;
    constructor(constraints:MediaStreamConstraints = {video:true,audio:false}){
        this.constraints=constraints;
    }
    /**
     * * Initialize the camera and create a video element for its stream
     * @param  {HTMLElement} dom The parent element for the video
     */
    public init_create = async (dom:HTMLElement = document.body)=>{
        this.video = document.createElement("video") as HTMLVideoElement;
        const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false}).then((stream:MediaStream)=>{
            this.video.srcObject=stream;
            this.video.play();
            dom.append(this.video) 
        })
    }
    /**
     * Initialize the video stream
     */
    public init = async (vid:HTMLVideoElement)=>{
        this.video = vid as HTMLVideoElement;
        const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false}).then((stream:MediaStream)=>{
            this.video.srcObject=stream;
            this.video.play();
        })
    }
    public pause = ()=>{
        this.video.pause();
    }
    public play = ()=>{
        this.video.play();
    }
}


export default Camera;