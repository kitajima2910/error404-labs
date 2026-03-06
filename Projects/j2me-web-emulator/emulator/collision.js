export function collide(a,b){

    return !(
        a.x+a.w < b.x ||
        a.x > b.x+b.w ||
        a.y+a.h < b.y ||
        a.y > b.y+b.h
    )

}