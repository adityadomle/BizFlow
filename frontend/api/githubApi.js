export async function fetchContributors(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch contributors: ${response.status}`);
  }
  
  return await response.json();
}
