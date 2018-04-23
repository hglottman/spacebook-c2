var posts = [];

var countId = 0;

var comment = " ";


function addPost(){
    var post = {
        text: $('#post-name').val(),
        id: countId,
        comment: []
    }
    posts.push(post);
    countId++;
    console.log(posts);
}

var addComment = function () {
    posts[i].comment.push(commentContent);
    console.log(post[i].comment);
}

var addPostClicked = function () {
   addPost();
    renderView()
};
function renderView(){
    $('.posts').find('p').remove();
    for (var i = 0; i < posts.length; i++) {
        var removeButton = "<button type='button' class='remove'>REMOVE</button>";
        $('.posts').append("<p  class='post' data-id='" + countId + "'>" + posts[i].text +
         removeButton + '<input type="text" class="comment-name" placeholder="Add a comment"><input type="text" class="user-name" placeholder="Add user name"><button type="button" class="comment">Add your comment</button></button></p>');
       
    }

        
}

function bindButtons(){
    
    $('.posts').on('click', ".comment", function () {
        var commentContent = $('.comment-name').val();
        
    });

    $('.posts').on('click', ".remove", function () {
        var id = $(this).closest("p").data().id;
        var removePost = function () {
            for (var i = 0; i < posts.length; i++)
                if (id === posts[i].id) {
                    posts.splice(i);
                }
        }
     //   $(this).closest("p").remove();
    });
}

bindButtons();



    $('.add-post').click(addPostClicked);