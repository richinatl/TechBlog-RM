const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
  Blog.findAll({
    attributes: ['id', 'name', 'description', 'date_created'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_description', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      }
    ]
  })
  .then(blogData => res.json(blogData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'description', 'date_created'],
    include: [
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_description', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['name']
        }
      }
    ]
  })
    .then(blogData => {
      if (!blogData) {
        res.status(404).json({ message: 'No post with that id' });
        return;
      }
      res.json(blogData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, (req, res) => {
  Blog.update(
    {
      name: req.body.name,
      description: req.body.description
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(blogData => {
      if (!blogData) {
        res.status(404).json({ message: 'No post found with that id' });
        return;
      }
      res.json(blogData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
