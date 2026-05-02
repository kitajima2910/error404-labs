# Avatar Upload Feature - User Guide

## For Members

### How to Upload Your Avatar

1. **Log in** to your account
2. Click on your name in the top navigation bar to open the user info popover
3. You'll see your current avatar and a button labeled "Đổi ảnh đại diện" (Change Avatar)
4. Click the button to select an image from your computer
5. Choose an image file (JPG, PNG, WebP, etc.)
6. The image will be uploaded automatically
7. You'll see a success message when the upload is complete
8. Your new avatar will appear immediately in the popover and on your profile page

### Requirements

- **File type**: Image files only (JPG, PNG, WebP, GIF, etc.)
- **File size**: Maximum 2MB
- **Recommended size**: Square images work best (e.g., 500x500px)

### Where Your Avatar Appears

- In the user info popover (top navigation)
- On your public profile page (`/[username]/trang-ca-nhan`)
- Persists across sessions (stored in database)

## For Developers

### API Endpoint

**POST** `/api/user/upload-avatar`

#### Authentication
- Required: Bearer token in Authorization header
- Token obtained from login endpoint

#### Request
```javascript
const formData = new FormData()
formData.append('file', fileInput.files[0])

const response = await fetch('/api/user/upload-avatar', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${authToken}`
    },
    body: formData
})
```

#### Response (Success)
```json
{
    "success": true,
    "avatar_url": "https://ik.imagekit.io/pxh2910/avatars/avatar-123-1234567890.jpg"
}
```

#### Response (Error)
```json
{
    "error": "File size must be less than 2MB"
}
```

#### Error Codes
- `401`: Unauthorized (no token or invalid token)
- `403`: Forbidden (user is not a member)
- `400`: Bad request (no file or invalid file type)
- `500`: Server error (ImageKit upload failed)

### Database Schema

```sql
ALTER TABLE error404labs.members ADD COLUMN avatar_url TEXT;
```

**Column**: `avatar_url`
- Type: TEXT
- Nullable: Yes
- Default: NULL
- Stores: Full URL to avatar image on ImageKit

### Frontend Integration

The avatar upload is integrated into `src/components/Nav.astro`:

1. **Avatar display** in popover (member-only)
2. **File input** for selecting image
3. **Upload handler** that:
   - Validates file size and type
   - Sends to API endpoint
   - Updates localStorage
   - Updates UI immediately
   - Shows toast notifications

### localStorage Keys

- `user_avatar_url`: Stores the avatar URL for quick access
- Cleared on logout
- Updated on successful upload

### Events

**avatar-updated**: Dispatched after successful upload
```javascript
window.addEventListener('avatar-updated', () => {
    // Handle avatar update
})
```

## Troubleshooting

### Avatar not showing after upload
- Check browser console for errors
- Verify ImageKit credentials in `.env`
- Check database connection

### Upload fails with "File size must be less than 2MB"
- Compress your image before uploading
- Use online tools like TinyPNG or ImageOptim

### Upload fails with "Only image files are allowed"
- Ensure you're selecting an image file
- Supported formats: JPG, PNG, WebP, GIF, BMP, SVG, TIFF

### Avatar not persisting after logout
- Check that `avatar_url` is being saved to database
- Verify localStorage is not being cleared by browser settings

## Performance Notes

- Avatar URLs are cached in localStorage for instant display
- ImageKit handles image optimization and CDN delivery
- Profile page queries database directly for avatar URL
- No additional database queries needed for avatar display in popover

## Security Notes

- Only authenticated members can upload avatars
- File type and size validated on both client and server
- ImageKit handles secure file storage
- Avatar URLs are public (no sensitive data)
- No file access control needed (URLs are public CDN links)

## Future Enhancements

Possible improvements:
- Image cropping tool before upload
- Avatar preview before confirmation
- Batch avatar upload for admins
- Avatar history/rollback
- Image filters or effects
- Avatar size optimization recommendations
