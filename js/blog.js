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
      post_data: [],
      client:'',
      // apiURL: 'https://content.thegovlab.com/thegovlab/items/blog?fields=*,authors.team_id.*,related_posts.incoming_blog_id.*,related_projects.projects_id.*,related_publications.pub_id.*,image.*'
    }
  },
  created: function created() {
    this.loadPost();
  },

  methods: {
    loadPost()
    {
      self = this;
      this.client = new DirectusSDK({
        url: "https://content.thegovlab.com",
        project: "/",
        storage: window.localStorage
      });
      this.client.getItems(
  'blog',
  {
    limit: '-1',
    fields: ['*.*','authors.team_id.*','image.*'],
    sort:["-publication_date"],
    filter: { 
      _and: [
        {
          status: {
            _eq:"published"
          }
        },
        {
          categories: {
            _contains: "ailocalism"
          }
        }
      ]

    },
  }
).then(data => {
  console.log(data);
  self.posts = data.data;

})
.catch(error => console.error(error));

    }
  }
});



