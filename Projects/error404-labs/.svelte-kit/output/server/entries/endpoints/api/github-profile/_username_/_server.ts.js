const GET = async ({ params }) => {
  const username = params.username;
  const githubProfileUrl = `https://github.com/${username}`;
  return new Response(null, {
    status: 301,
    headers: {
      Location: githubProfileUrl,
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
};
export {
  GET
};
