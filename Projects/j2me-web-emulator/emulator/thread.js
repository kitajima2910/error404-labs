export class Thread{

    constructor(runnable){

        this.runnable = runnable

    }

    start(){

        setInterval(()=>{

            this.runnable.run()

        },16)

    }

}