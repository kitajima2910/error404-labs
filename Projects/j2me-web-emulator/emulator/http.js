export class HttpConnection{

    static async open(url){

        const res = await fetch(url)

        return await res.text()

    }

}