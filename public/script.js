Vue.component('star-rating', VueStarRating.default);

var app = new Vue({
  el: '#app',
  data: {
    items: [],
    currentItem: null,
  },
  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async editItem(currentItem) {
      console.log("We got here" + currentItem)
      try {
        let response = await axios.put("/api/items/" + currentItem._id, {
          title: currentItem.title,
          numRating: currentItem.numRating,
          sumRating: currentItem.sumRating,
          avgRating: currentItem.avgRating
        });
        this.getItems();

        return true;
      } catch (error) {
        console.log(error);
      }
    },

    setRating(rating, item){
      // Handle the rating
     /*  if (!(this.item.numRating in this.ratings))
      Vue.set(this.ratings, this.number, {
        sum: 0,
        total: 0
      }); */

      // might not be editing the item directly
      this.currentItem = item;
      this.currentItem.sumRating += rating;
      this.currentItem.numRating += 1;
      this.currentItem.avgRating = this.currentItem.sumRating / this.currentItem.numRating;
      this.currentItem.avgRating = Math.round(this.currentItem.avgRating * 100)  / 100
      this.editItem(this.currentItem);
    }
  },
});