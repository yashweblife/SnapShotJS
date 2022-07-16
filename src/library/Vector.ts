/**
 * * The Vector library allows you to store data in a meaningful way.
 * Todo: Optimize the recalib process
 */
class Vector{
    public x:number;
    public y:number;
    public z:number;
    public w:number;
    public mag:number;
    public unit_x:number;
    public unit_y:number;
    public unit_z:number;
    public unit_w:number;
    
    /**
     * The Vector is a collection of components
     * @param  {number=0} x
     * @param  {number=0} y
     * @param  {number=0} z
     * @param  {number=0} w
     */
    constructor(x:number=0, y:number=0, z:number=0, w:number=0){
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=w;
        this.recalib();
    }
    /**
     * * Recaliberates the vector after changes have been made.
     * Required for non returning class of vectors
     */
    private recalib = ()=>{
        this.mag = Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z) + (this.w*this.w));
        this.unit_x = this.x/this.mag
        this.unit_y = this.y/this.mag
        this.unit_z = this.z/this.mag
        this.unit_w = this.w/this.mag
    }
    /**
     * @param  {Vector} vector Adds given vector to current vector
     */
    public add = (vector:Vector)=>{
        this.x+=vector.x;
        this.y+=vector.y;
        this.z+=vector.z;
        this.w+=vector.w;
        this.recalib();
    }
    /**
     * * Multiply a scalar to a vector
     * @param  {number} val
     */
    public scalar = (val:number)=>{
        this.x *= val;
        this.y *= val;
        this.z *= val;
        this.w *= val;
        this.recalib();
    }
    /**
     * Preserves the direction but sets the magnitude to 1
     */
    public normalize = ()=>{
        this.x = this.unit_x;
        this.y = this.unit_y;
        this.z = this.unit_z;
        this.w = this.unit_w;
        this.recalib();
    }
    /**
     * * Sets the magnitude of the vector while preserving the direction
     * @param  {number} val
     */
    public set_magnitude = (val:number)=>{
        this.normalize();
        this.scalar(val);
    }
    /**
     * * Set the vector to a value
     * @param  {number} val
     */
    public monochromatize = (val:number)=>{
        this.x=val;
        this.y=val;
        this.z=val;
        this.w=val;
        this.recalib();
    }
    
    /**
     * Sets X to a value and the rest of the components to 0
     * @param  {number} val
     */
    public set_x = (val:number)=>{
        this.x=val;
        this.y=0;
        this.z=0;
        this.w=0;
    }
    /**
     * Sets Y to a value and the rest of the components to 0
     * @param  {number} val
     */
    public set_y = (val:number)=>{
        this.x=0;
        this.y=val;
        this.z=0;
        this.w=0;
    }
    /**
     * Sets Z to a value and the rest of the components to 0
     * @param  {number} val
     */
    public set_z = (val:number)=>{
        this.x=0;
        this.y=0;
        this.z=val;
        this.w=0;
    }
    /**
     * Sets W to a value and the rest of the components to 0
     * @param  {number} val
     */
    public set_w = (val:number)=>{
        this.x=0;
        this.y=0;
        this.z=0;
        this.w=val;
    }
    /**
     * Checks for the highest value component and sets that to the providid value and the rest to 0
     * @param  {number} val
     */
    public maximize = (val:number)=>{
        if(this.x>this.y && this.x>this.z && this.x>this.w){
            this.set_x(val);
        }
        else if(this.y>this.x && this.y>this.z && this.y>this.w){
            this.set_y(val);
        }
        else if(this.z>this.x && this.z>this.y && this.z>this.w){
            this.set_z(val);
        }
        else if(this.w>this.x && this.w>this.y && this.w>this.z){
            this.set_w(val);
        }
    }
    /**
     * Checks for the lowest value component and sets that to the providid value and the rest to 0
     * @param  {number} val
     */
    public minimize = (val:number)=>{
        if(this.x<this.y && this.x<this.z && this.x<this.w){
            this.set_x(val);
        }
        else if(this.y<this.x && this.y<this.z && this.y<this.w){
            this.set_y(val);
        }
        else if(this.z<this.x && this.z<this.y && this.z<this.w){
            this.set_z(val);
        }
        else if(this.w<this.x && this.w<this.y && this.w<this.z){
            this.set_w(val);
        }
    }
    public limit = (min:number,max:number)=>{
        if(this.x>max) this.x=max;
        if(this.y>max) this.y=max;
        if(this.z>max) this.z=max;
        if(this.x<min) this.x=min;
        if(this.y<min) this.y=min;
        if(this.z<min) this.z=min;
        this.recalib();

    }

    public dist = (vec:Vector)=>{
        return(Math.sqrt((this.x-vec.x)**2 + (this.y-vec.y)**2 + (this.z-vec.z)**2 + (this.w-vec.w)**2))
    }
}

export default Vector;
