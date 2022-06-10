import {Service} from 'wrcom';

class RenderService extends Service{
    private pipes: any = {}
    constructor() {
        super();
    }
    on(event: string, cb: any){
        if(!this.pipes[event]) this.pipes[event] = [];
        this.pipes[event].push(cb);
        const index = this.pipes[event].length-1;
        return ()=>{
            this.pipes[event][index] = false;
        };
    }
    render(event: string, param=null){
        if(!this.pipes[event]) return;
        for(let i = 0; i < this.pipes[event].length; i++){
            if(typeof this.pipes[event][i] === 'function'){
                this.pipes[event][i](param);
            }
        }
    }
}

export default RenderService;