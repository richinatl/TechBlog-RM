const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Blog.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'name', 'description', 'date_created'],
    order: [['date_created', 'DESC']],
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
  .then(blogData => {
    const blogs = blogData.map(blog => blog.get({ plain: true }));
    res.render('dashboard', { blogs, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/edit/:id', withAuth, (req, res) => {
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
        attributes: ['id', 'comment_description', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      }
    ]
  })
    .then(blogData => {
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with that id' });
        return;
      }
      const blog = blogData.get({ plain: true });
      res.render('editBlog', {
        blog,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
  res.render('newBlog');
});


module.exports = router;