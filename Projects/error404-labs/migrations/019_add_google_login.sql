ALTER TABLE error404labs.members
    ADD COLUMN IF NOT EXISTS google_sub TEXT,
    ADD COLUMN IF NOT EXISTS email TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS members_google_sub_unique
    ON error404labs.members (google_sub)
    WHERE google_sub IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS members_email_unique
    ON error404labs.members (LOWER(email))
    WHERE email IS NOT NULL;
