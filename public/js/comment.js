const commentFormHandler = async function (event) {
	event.preventDefault();

	const post_id = document.querySelector('.comment--form').dataset.blogid;

	const comment_description = document.querySelector('#commentDescription').value.trim();

	if (comment_description) {
		await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				post_id,
				comment_description,
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		document.location.reload();
	}
};

document
	.querySelector('.comment--form')
	.addEventListener('submit', commentFormHandler);