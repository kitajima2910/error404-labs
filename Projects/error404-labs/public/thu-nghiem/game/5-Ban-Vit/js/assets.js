/**
 * Asset Loading & Texture Management
 */
function loadTextures(assets, textureArray, loadedFlagKey) {
    let count = 0
    let failed = false
    assets.forEach((src, index) => {
        const tex = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 0, 0]),
        )
        textureArray[index] = tex
        const img = new Image()
        img.onload = () => {
            if (failed) return
            gl.bindTexture(gl.TEXTURE_2D, tex)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
            count++
            if (count === assets.length) STATE[loadedFlagKey] = true
        }
        img.onerror = () => {
            failed = true
            STATE[loadedFlagKey] = false
        }
        img.src = src
    })
}

const DUCK_ASSETS = [
    'con-vit/sprite-1-1.png',
    'con-vit/sprite-1-2.png',
    'con-vit/sprite-1-3.png',
    'con-vit/sprite-2-1.png',
    'con-vit/sprite-2-2.png',
    'con-vit/sprite-2-3.png',
    'con-vit/sprite-3-1.png',
    'con-vit/sprite-3-2.png',
    'con-vit/sprite-3-3.png',
]
const DECOY_ASSETS = [
    'con-vit-gia/sprite-1-1.png',
    'con-vit-gia/sprite-1-2.png',
    'con-vit-gia/sprite-1-3.png',
    'con-vit-gia/sprite-1-4.png',
    'con-vit-gia/sprite-2-1.png',
    'con-vit-gia/sprite-2-2.png',
    'con-vit-gia/sprite-2-3.png',
    'con-vit-gia/sprite-2-4.png',
]
const GRASS_ASSETS = [
    'cay-co/sprite-1-1.png',
    'cay-co/sprite-1-2.png',
    'cay-co/sprite-1-3.png',
    'cay-co/sprite-1-4.png',
    'cay-co/sprite-1-5.png',
    'cay-co/sprite-2-1.png',
    'cay-co/sprite-2-2.png',
    'cay-co/sprite-2-3.png',
    'cay-co/sprite-2-4.png',
    'cay-co/sprite-2-5.png',
    'cay-co/sprite-3-1.png',
    'cay-co/sprite-3-2.png',
    'cay-co/sprite-3-3.png',
    'cay-co/sprite-3-4.png',
    'cay-co/sprite-3-5.png',
]
const BLOOD_ASSETS = [
    'mau-vit/sprite1.png',
    'mau-vit/sprite2.png',
    'mau-vit/sprite3.png',
    'mau-vit/sprite4.png',
    'mau-vit/sprite5.png',
    'mau-vit/sprite6.png',
    'mau-vit/sprite7.png',
    'mau-vit/sprite8.png',
]
const DUCK_SHOT_ASSETS = [
    'con-vit-bi-ban/sprite-1-1.png',
    'con-vit-bi-ban/sprite-1-2.png',
    'con-vit-bi-ban/sprite-2-1.png',
    'con-vit-bi-ban/sprite-2-2.png',
    'con-vit-bi-ban/sprite-3-1.png',
]
const PLANE_ASSETS = [
    'may-bay/fly/sprite-1-1.png',
    'may-bay/fly/sprite-1-2.png',
    'may-bay/fly/sprite-1-3.png',
]
const PLANE_FALL_ASSETS = [
    'may-bay/fall/sprite-1-4.png',
    'may-bay/fall/sprite-2-1.png',
    'may-bay/fall/sprite-2-2.png',
    'may-bay/fall/sprite-2-3.png',
    'may-bay/fall/sprite-2-4.png',
]
const CLOUD_TYPE1_ASSETS = [
    'may-loai-1/sprite-1-1.png',
    'may-loai-1/sprite-1-2.png',
    'may-loai-1/sprite-1-3.png',
    'may-loai-1/sprite-1-4.png',
    'may-loai-1/sprite-2-1.png',
    'may-loai-1/sprite-2-2.png',
    'may-loai-1/sprite-2-3.png',
    'may-loai-1/sprite-2-4.png',
]

const CLOUD_TYPE2_ASSETS = [
    'may-loai-2/sprite-1-1.png',
    'may-loai-2/sprite-1-2.png',
    'may-loai-1/sprite-1-3.png',
    'may-loai-1/sprite-1-4.png',
    'may-loai-2/sprite-1-5.png',
    'may-loai-2/sprite-2-1.png',
    'may-loai-2/sprite-2-2.png',
    'may-loai-2/sprite-2-3.png',
    'may-loai-2/sprite-2-4.png',
    'may-loai-2/sprite-2-5.png',
]

const BALLOON_FLY_ASSETS = [
    'bong/fly/sprite-1-1.png',
    'bong/fly/sprite-1-2.png',
    'bong/fly/sprite-1-3.png',
    'bong/fly/sprite-1-4.png',
    'bong/fly/sprite-2-1.png',
    'bong/fly/sprite-2-2.png',
    'bong/fly/sprite-2-3.png',
    'bong/fly/sprite-2-4.png',
]

const BALLOON_FALL_ASSETS = [
    'bong/fall/sprite1.png',
    'bong/fall/sprite2.png',
    'bong/fall/sprite3.png',
    'bong/fall/sprite4.png',
    'bong/fall/sprite5.png',
    'bong/fall/sprite6.png',
    'bong/fall/sprite7.png',
    'bong/fall/sprite8.png',
]

function initAssets() {
    loadTextures(DUCK_ASSETS, STATE.duckTextures, 'duckAssetLoaded')
    loadTextures(DECOY_ASSETS, STATE.decoyTextures, 'decoyAssetLoaded')
    loadTextures(GRASS_ASSETS, STATE.grassTextures, 'grassAssetLoaded')
    loadTextures(BLOOD_ASSETS, STATE.bloodTextures, 'bloodAssetLoaded')
    loadTextures(DUCK_SHOT_ASSETS, STATE.duckShotTextures, 'duckShotAssetLoaded')
    loadTextures(PLANE_ASSETS, STATE.planeTextures, 'planeAssetLoaded')
    loadTextures(PLANE_FALL_ASSETS, STATE.planeFallTextures, 'planeFallAssetLoaded')
    loadTextures(CLOUD_TYPE1_ASSETS, STATE.cloudType1Textures, 'cloudType1AssetLoaded')
    loadTextures(CLOUD_TYPE2_ASSETS, STATE.cloudType2Textures, 'cloudType2AssetLoaded')
    loadTextures(BALLOON_FLY_ASSETS, STATE.balloonTextures, 'balloonAssetLoaded')
    loadTextures(BALLOON_FALL_ASSETS, STATE.balloonFallTextures, 'balloonFallAssetLoaded')
}
