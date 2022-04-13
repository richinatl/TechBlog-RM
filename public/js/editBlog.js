async function editFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="blog-title"]').value;
    const description = document.querySelector('textarea[name="blog-text"]').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length-1
    ];
  
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.editBlog--form').addEventListener('submit', editFormHandler);