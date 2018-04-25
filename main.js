var SpacebookApp = function () {
  var posts = [];


  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }

    currentId += 1;
    posts.push(post);
  }

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' +
      '<input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button>' +
      '<div class="comments"></div>' + '</div>'

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove post</a> ' +
        '<a href="#" class="show-comments">comments</a>' +
        post.text + commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    //the post's div
    var $clickedPost = $(currentPost).closest('.post');
    //the post's id
    var id = $clickedPost.data().id;
    //find the post according to the id
    var post = _findPostById(id);
    //to remove the specific post
    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }



  var renderComments = function (commentButton) {
    //the post's class
    var $clickedPost = $(commentButton).closest('.post');
    //the post's id
    var id = $clickedPost.data().id;
    var $comments = $($clickedPost).find('.comments');
    $comments.empty();
    var post = _findPostById(id);
    for (var i = 0; i < post.comments.length; i++) {
      var text = post.comments[i].commentText;
      var commentIdCurrent = post.comments[i].commentId;
      // $comments.append('<div class="commentNew" data-id=' + commentIdCurrent + '>' + text
      //   + '<button class="btn btn-summary remove-comment">remove Comment</button></div>');

      var source = $('#comment-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template({commentIdCurrent:commentIdCurrent, text:text});
      // append our new html to the page
      $comments.append(newHTML);
    }


  }

  var commentId = 0;

  var createComment = function (commentButton) {
    //the post's class
    var $clickedPost = $(commentButton).closest('.post');
    //the post's id
    var id = $clickedPost.data().id;
    //the comment in the specific post
    var commentText = $($clickedPost).find('.comment-name').val();
    var comment = {
      commentText: commentText,
      commentId: commentId
    }
    //find the post according to the id
    var post = _findPostById(id);
    post.comments.push(comment);
    commentId++;
  }

  var removeComment = function (removeButton) {
    //the post's class
    var $clickedPost = $(removeButton).closest('.post');
    //the post's id
    var postId = $clickedPost.data().id;
    //find comment's id
    var commentId = $(removeButton).closest('.commentNew').data().id;
    //---------------------------------------------
    //begin work on array
    var post = _findPostById(postId)

    for (var j = 0; j < post.comments.length; j++) {
      var commentId = $(removeButton).closest('.commentNew').data().id;
      if (post.comments[j].commentId === commentId) {
        post.comments.splice(j, 1);
        console.log(post);

      }
    }
  }


  var toggleComments = function (currentPost) {
    //the post's div
    var $clickedPost = $(currentPost).closest('.post');
    //to show the comments area of the post
    $clickedPost.find('.comments-container').toggleClass('show');
  }


  return {
    //to make the functions work also for the outside 
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
    posts: posts,
    renderComments: renderComments,
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}


var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  app.createComment(this);
  app.renderComments(this);
});


$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);
  app.renderComments(this);
});






