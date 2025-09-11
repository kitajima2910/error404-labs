class UserUpload {
    constructor(userId, imageName, imageUrl, imageThumbnailUrl, deleted) {
        this.userId = userId;
        this.imageName = imageName;
        this.imageUrl = imageUrl;
        this.imageThumbnailUrl = imageThumbnailUrl;
        this.deleted = deleted;
    }
}

module.exports = UserUpload;
