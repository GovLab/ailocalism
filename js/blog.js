////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////

const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}

function main() {
  if (isReloadedPage()) {
    window.location.reload();
  }
}
main();


////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////



Vue.use(VueMeta);

new Vue({

  el: '#blog',
  data () {
    return {
      posts: [],
      post_data: []
    }
  },
  created: function created() {
    this.fetchPosts();
  },

  methods: {

  fetchPosts()
  {
    const client = new DirectusSDK({
      url: "https://directus.thegovlab.com/",
      project: "thegovlab",
      storage: window.localStorage
    });
    self = this;

    client.getItems(
      'blog', {
        fields: ['*.*','authors.team_id.*','authors.team_id.picture.*','related_posts.incoming_blog_id.*','related_publications.pub_id.*','related_publications.pub_id.picture.*','related_projects.projects_id.*','related_projects.projects_id.main_picture.*'],
        sort:"-created_on",
        limit:30
      })
      .then(data => {


        self.posts = data.data;
        self.post_data = self.posts.filter(items => items.categories.includes('cat_39'));
        console.log(self.post_data);
       
      })
        .catch(error => console.error(error));
  }
  }
});
