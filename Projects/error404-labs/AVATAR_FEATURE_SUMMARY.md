# Avatar Upload Feature - Implementation Summary

## Overview
Implemented user avatar upload and display functionality for members. Users can now upload custom avatars that appear on their profile pages instead of the default avatar.

## Changes Made

### 1. Database Schema
**File**: `migrations/002_add_avatar_url.sql`
- Added `avatar_url TEXT` column to `error404labs.members` table
- Created index on `avatar_url` for performance

### 2. API Endpoints

#### Updated: `src/pages/api/login.ts`
- Added `avatar_url` to migration (ALTER TABLE)
- Added `avatar_url` to SELECT query
- Returns `avatar_url` in login response

#### Updated: `src/pages/api/verify.ts`
- Added `avatar_url` to SELECT query
- Returns `avatar_url` in verify response

#### New: `src/pages/api/user/upload-avatar.ts`
- POST endpoint for avatar upload
- Authentication: Requires valid JWT token
- Authorization: Only members and admins can upload
- Validation:
  - File type: Images only
  - File size: Max 2MB
- Upload destination: ImageKit `/avatars` folder
- Updates database with new avatar URL
- Returns: `{ success: true, avatar_url: string }`

### 3. Frontend Components

#### Updated: `src/components/Nav.astro`
**Popover Changes**:
- Added avatar display section (member-only)
- Added "Đổi ảnh đại diện" (Change Avatar) button with file input
- Avatar section shows/hides based on user role

**Script Changes**:
- `checkSession()`: 
  - Reads `user_avatar_url` from localStorage
  - Shows/hides avatar section based on role
  - Updates avatar image when available
- Login handler: Saves `avatar_url` to localStorage
- Verify handler: Saves `avatar_url` to localStorage
- New avatar upload handler:
  - Validates file size (2MB max) and type
  - Uploads to `/api/user/upload-avatar`
  - Updates localStorage and UI on success
  - Shows toast notifications for feedback
  - Dispatches `avatar-updated` event

#### Updated: `src/pages/[username]/trang-ca-nhan.astro`
- Updated member query to include `avatar_url`
- Changed profile image from hardcoded `/avatar_v2.avif` to `member?.avatar_url || '/avatar_v2.avif'`
- Fallback to default avatar if user hasn't uploaded one

## User Flow

1. **Member logs in**
   - Avatar URL is fetched from database and stored in localStorage
   - Avatar section appears in user info popover

2. **Member uploads avatar**
   - Clicks "Đổi ảnh đại diện" button
   - Selects image file (max 2MB)
   - File is uploaded to ImageKit
   - Database is updated with new URL
   - UI updates immediately
   - Toast notification confirms success

3. **Avatar display**
   - Appears in user info popover
   - Appears on member's public profile page
   - Falls back to default avatar if not set

## Security Considerations

- ✅ JWT authentication required for upload
- ✅ Role-based authorization (members only)
- ✅ File type validation (images only)
- ✅ File size limit (2MB)
- ✅ ImageKit handles secure upload
- ✅ Database stores only URL, not file data

## ImageKit Configuration

Uses existing ImageKit setup:
- `IMAGEKIT_PRIVATE_KEY`: From `.env`
- `IMAGEKIT_URL_ENDPOINT`: From `.env`
- Upload folder: `/avatars`
- Unique filename generation enabled

## Testing Checklist

- [ ] Member can upload avatar from popover
- [ ] Avatar displays in popover after upload
- [ ] Avatar displays on profile page
- [ ] Avatar persists after logout/login
- [ ] File size validation works (>2MB rejected)
- [ ] File type validation works (non-images rejected)
- [ ] Admin cannot see avatar upload section (only members)
- [ ] Non-authenticated users cannot upload
- [ ] Default avatar shows if no custom avatar set
- [ ] Toast notifications appear for success/error

## Database Migration

Run the migration to add the column:
```sql
ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

This is automatically handled by the login.ts migration logic, but the SQL file is provided for reference.

## Notes

- Avatar upload is member-only feature
- Admins can also upload avatars (same role check)
- Avatar URL is stored in localStorage for quick access
- Profile page queries database directly for avatar URL
- ImageKit handles image optimization and CDN delivery
