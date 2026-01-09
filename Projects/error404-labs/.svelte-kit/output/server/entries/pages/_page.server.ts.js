const load = async ({ fetch }) => {
  const response = await fetch("/api/bai-dang");
  const data = await response.json();
  return { posts: data.posts };
};
export {
  load
};
