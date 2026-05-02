# Avatar Upload Feature - Deployment Guide

## Overview
This document provides step-by-step instructions for deploying the avatar upload feature to production.

## What's New

Members can now upload custom avatars that appear on their profile pages instead of the default avatar.

### Key Features
- Upload avatar from user info popover
- Avatar displays on public profile page
- Avatar persists across sessions
- File validation (images only, max 2MB)
- Automatic ImageKit integration

## Files Changed

### New Files
```
src/pages/api/user/upload-avatar.ts
migrations/002_add_avatar_url.sql
```

### Modified Files
```
src/pages/api/login.ts
src/pages/api/verify.ts
src/components/Nav.astro
src/pages/[username]/trang-ca-nhan.astro
```

## Deployment Steps

### 1. Database Migration

Run this SQL command on your Neon database:

```sql
ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

Or use the migration file:
```bash
# If using a migration tool, run:
psql $DATABASE_URL < migrations/002_add_avatar_url.sql
```

**Note**: The `login.ts` endpoint includes automatic migration, so this will be created automatically on first login if not already present.

### 2. Environment Variables

Verify these are set in your `.env` (they should already be configured):

```env
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
```

### 3. Deploy Code

```bash
# Build the project
npm run build

# Or with pnpm
pnpm build

# Deploy to Vercel (if using Vercel)
vercel deploy --prod
```

### 4. Verify Deployment

1. **Test avatar upload**:
   - Log in as a member
   - Click on your name in the navigation
   - Click "Đổi ảnh đại diện" button
   - Select an image file
   - Verify upload succeeds

2. **Test avatar display**:
   - Check avatar appears in popover
   - Visit your profile page
   - Verify avatar displays instead of default

3. **Test persistence**:
   - Log out
   - Log back in
   - Verify avatar is still there

4. **Test fallback**:
   - Create a new member account
   - Verify default avatar shows
   - Upload custom avatar
   - Verify custom avatar shows

## Rollback Plan

If issues occur, you can rollback:

### Option 1: Remove Column (Destructive)
```sql
ALTER TABLE error404labs.members DROP COLUMN avatar_url;
```

### Option 2: Keep Column, Disable Feature (Non-destructive)
1. Revert code changes
2. Keep the `avatar_url` column in database
3. No data loss

## Monitoring

### Check Logs

Monitor these endpoints for errors:
- `/api/login` - Login with avatar_url
- `/api/verify` - Session verification with avatar_url
- `/api/user/upload-avatar` - Avatar upload

### Common Issues

**Issue**: Avatar upload fails with 500 error
- Check ImageKit credentials in `.env`
- Verify ImageKit API is accessible
- Check server logs for details

**Issue**: Avatar not showing on profile
- Verify database column exists
- Check avatar_url is being saved to database
- Verify ImageKit URL is accessible

**Issue**: Avatar not persisting after logout
- Check localStorage is not being cleared
- Verify database query includes avatar_url
- Check browser console for errors

## Performance Impact

- **Database**: Minimal (one additional TEXT column)
- **API**: No additional queries (avatar_url included in existing queries)
- **Frontend**: Minimal (localStorage caching)
- **ImageKit**: Uses existing CDN infrastructure

## Security Considerations

✅ **Implemented**:
- JWT authentication required
- Role-based authorization (members only)
- File type validation
- File size limit (2MB)
- No sensitive data in URLs

## Backward Compatibility

✅ **Fully backward compatible**:
- Existing members without avatars see default avatar
- No breaking changes to existing APIs
- Optional column (NULL by default)
- Graceful fallback to default avatar

## Testing Checklist

Before deploying to production:

- [ ] Database migration runs successfully
- [ ] Avatar upload works in staging
- [ ] Avatar displays on profile in staging
- [ ] Avatar persists after logout in staging
- [ ] File validation works (rejects >2MB)
- [ ] File validation works (rejects non-images)
- [ ] Error messages are clear
- [ ] Toast notifications appear
- [ ] No console errors
- [ ] No console warnings
- [ ] Performance is acceptable
- [ ] ImageKit integration works

## Support

If you encounter issues:

1. Check the error message in the toast notification
2. Check browser console for JavaScript errors
3. Check server logs for API errors
4. Verify ImageKit credentials
5. Verify database connection
6. Review the troubleshooting section in `AVATAR_FEATURE_GUIDE.md`

## Documentation

For more information, see:
- `AVATAR_FEATURE_SUMMARY.md` - Implementation overview
- `AVATAR_FEATURE_GUIDE.md` - User and developer guide
- `IMPLEMENTATION_CHECKLIST.md` - Detailed checklist

## Questions?

Refer to the implementation files for detailed code documentation and comments.
