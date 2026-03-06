export class TileMap{

    constructor(image,tileW,tileH,map){

        this.image = image
        this.tileW = tileW
        this.tileH = tileH
        this.map = map

    }

    draw(g){

        for(let y=0;y<this.map.length;y++){

            for(let x=0;x<this.map[y].length;x++){

                const tile = this.map[y][x]

                const sx = tile * this.tileW

                g.ctx.drawImage(
                    this.image,
                    sx,0,
                    this.tileW,this.tileH,
                    x*this.tileW,
                    y*this.tileH,
                    this.tileW,this.tileH
                )

            }

        }

    }

}