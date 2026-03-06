export class RecordStore{

    constructor(name){

        this.name = name

        const data = localStorage.getItem(name)

        this.records = data ? JSON.parse(data) : []

    }

    addRecord(data){

        this.records.push(data)

        this.save()

    }

    getRecord(id){

        return this.records[id]

    }

    save(){

        localStorage.setItem(
            this.name,
            JSON.stringify(this.records)
        )

    }

}