export default (contents) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(contents, 'text/xml');
  const parseError = document.querySelector('parsererror > div');
  if (parseError) {
    console.log(parseError.textContent);
    throw new Error('validRSS');
  }
  const feed = {
    title: document.querySelector('channel > title').textContent,
    description: document.querySelector('channel > description').textContent,
  };
  const posts = [];
  const postsList = document.querySelectorAll('channel > item');
  postsList.forEach((item) => {
    posts.push({
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    });
  });
  return {
    feed,
    posts,
  };
};
