async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value;
  const post_text = document.querySelector('textarea[name="blog-text"]').value;

  const response = await fetch(`/api/blogs`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.newblog--form').addEventListener('submit', newFormHandler);
